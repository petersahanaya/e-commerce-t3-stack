import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@/server/routers/root";
import { CreateContext } from "@/server/utils/context";

export default createNextApiHandler({
    router: appRouter,
    createContext: CreateContext
})
