import { inferAsyncReturnType } from "@trpc/server"
import { PrismaClient } from "@prisma/client"
import {CreateNextContextOptions} from "@trpc/server/adapters/next"
import { IncomingMessage, ServerResponse } from "http"
import { NextApiRequest, NextApiResponse } from "next"

export const prisma = new PrismaClient({log : ['query']})

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