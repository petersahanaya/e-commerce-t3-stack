import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import NextAuth from "next-auth/next";
import prisma from "@/functions/Prisma/prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        session({ session, token }) {
            if (!session.user.id) {
                session.user.id = token.sub
                return session
            }

            return session
        },
        async signIn({ user, account }) {
            try {

                const duplicate = await prisma?.user.findFirst({ where: { id: account?.providerAccountId } })

                if (!duplicate) {
                    await prisma?.user.create({ data: { id: account?.providerAccountId, email: user.email!, profile: user.image!, username: user.name! } })

                    return true
                }

                return true
            } catch (e) {
                console.log(e)

                return true
            }
        },
    },
    pages: {
        signIn: "/signIn"
    },
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET!
}

export default NextAuth(authOptions)
