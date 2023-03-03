import { httpBatchLink } from "@trpc/client"
import { createTRPCNext  } from "@trpc/next"
import SuperJSON from "superjson"
import { AppRouter } from "../routers/root"

const BASEURL = "http://localhost:3000/api/trpc"

export const trpc = createTRPCNext<AppRouter>({
    config({ctx}){
        return {
            transformer : SuperJSON,
            links : [
                httpBatchLink({
                    url : BASEURL,
                })
            ]
        }
    }
})