import { protectedProcedure,  router } from "../trpc"

export const appRouter = router({
    products : protectedProcedure
        .query(async ({ctx}) => {
            const results = await ctx.prisma.product.findMany({take : 10, select : {title : true, description : true, category : true, image : true, price : true,id : true}})
            return results
        })
})

export type AppRouter = typeof appRouter