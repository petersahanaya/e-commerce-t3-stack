import { PrismaClient } from "@prisma/client";

declare interface global {
    prisma : PrismaClient
}