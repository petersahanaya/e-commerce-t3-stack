import NextAuth from "next-auth/next"
import {DefaultSession} from "next-auth"

declare module 'next-auth'{
    interface Session {
        user : {
            id : string | undefined | null
        } & DefaultSession['user']
    }
}