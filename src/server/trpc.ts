import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { initTRPC, TRPCError } from "@trpc/server";
import { getServerSession, Session } from "next-auth";
import { Context } from "./utils/context";
import SuperJSON from "superjson";

export const t = initTRPC.context<Context>().create({
    transformer: SuperJSON
})

const IsAuthenticated = t.middleware(async ({ ctx, next }) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions) as Session

    if (!session?.user) {
        throw new TRPCError({ code: "FORBIDDEN", message: "You're UnAuthenticated.." })
    }

    return next({ ctx: { user: session.user } })
})

export const router = t.router

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(IsAuthenticated)

