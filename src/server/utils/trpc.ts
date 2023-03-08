import { httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import transformer from "trpc-transformer"
import { AppRouter } from "../routers/root"

const BASEURL = "https://p3commerce.vercel.app/api/trpc"

export const trpc = createTRPCNext<AppRouter>({
    config({ ctx }) {
        return {
            transformer: transformer,
            links: [
                httpBatchLink({
                    url: BASEURL,
                })
            ]
        }
    }
})
