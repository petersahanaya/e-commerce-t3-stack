import { inferAsyncReturnType } from "@trpc/server"
import { IncomingMessage, ServerResponse } from "http"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/functions/Prisma/prisma"

type NextContextOptions = {
    req : IncomingMessage & {
        cookies: Partial<{
            [key: string]: string;
        }>;
    } | NextApiRequest,
    res : NextApiResponse<any> | ServerResponse<IncomingMessage>
} 

export const CreateContext = ({req, res} : NextContextOptions) => {
    return {
        req, 
        res,
        prisma,
    }
}

export type Context = inferAsyncReturnType<typeof CreateContext>