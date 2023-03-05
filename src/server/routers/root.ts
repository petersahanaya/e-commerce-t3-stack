import { protectedProcedure, router } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"

export const appRouter = router({
    collections: protectedProcedure
        .query(async ({ ctx }) => {
            const results = await ctx.prisma.product.findMany({ skip: 10, take: 8, select: { title: true, description: true, category: true, image: true, id: true } })
            return results
        }),
    products: protectedProcedure
        .input((z.object({ skip: z.number(), take: z.number() }).optional().nullish()))
        .query(async ({ input, ctx }) => {
            if (input?.skip && input?.take) {
                const results = await ctx.prisma.product.findMany({
                    take: input.take, skip: input.skip ,
                    select: { title: true, description: true, category: true, image: true, id: true, price: true }
                })

                return results
            }
            const results = await ctx.prisma.product.findMany({
                select: { title: true, description: true, category: true, image: true, id: true, price: true }
            })

            return results
        }),
    product: protectedProcedure
        .input((z.object({ id: z.string() })))
        .query(async ({ input, ctx }) => {
            const result = await ctx.prisma.product.findUnique({
                where: { id: input.id },
                select: { title: true, description: true, category: true, image: true, id: true, price: true }
            })

            return result
        }),
    cart: protectedProcedure
        .query(async ({ ctx }) => {
            const results = await ctx.prisma.cart.findMany({ where: { userId: ctx.user.id }, select: { products: { select: { title: true, description: true, category: true, image: true, id: true, price: true } } } })

            let mapped: Product[] = []

            results.forEach((products) => products.products.forEach((s) => (mapped.push(s))))

            return mapped
        }),
    orderProduct: protectedProcedure
        .input((z.object({ id: z.string() })))
        .mutation(async ({ input, ctx }) => {
            const duplicate = await ctx.prisma.cart.findFirst({
                where: {
                    AND: [
                        { userId: ctx.user.id },
                        { products: { some: { id: input.id } } }
                    ]
                }
            })
            console.log("Duplicate : ", duplicate)

            if (duplicate) {
                throw new TRPCError({ code: "CONFLICT", message: "This product is already been added" })
            }

            const created = await ctx.prisma.cart.create({
                data: {
                    author: { connect: { id: ctx.user.id! } },
                    products: { connect: { id: input.id } }
                }
            })

            console.log("Created : ", created)

            return "Successfully added"
        }),
    removeProduct: protectedProcedure
        .input((z.object({ id: z.string() })))
        .mutation(async ({ input, ctx }) => {
            const whereId = await ctx.prisma.cart.findFirst({ where: { products: { some: { id: input.id } } } })

            const found = await ctx.prisma.cart.delete({
                where: {
                    id: whereId?.id
                }
            })

            if (!found) throw new TRPCError({ code: "CONFLICT", message: "Cannot Found The item.." })

            return "Item Deleted Successfully"
        }),
    getProductByName: protectedProcedure
        .input((z.object({ name: z.string() })))
        .query(async ({ ctx, input }) => {
            const result = await ctx.prisma.product.findFirst({ where: { title: input.name } })

            return result
        })
})

export type AppRouter = typeof appRouter
