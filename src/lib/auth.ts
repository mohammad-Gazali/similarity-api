import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";



const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        })
    ],
    callbacks: {
        //? "session" method here is the method that determines what is the type of returned value of "useSession" hook or "getSession" function
        //? and if we want to make our specific session returned value we should use Module Augmentation
        //? Module Augmentation is a way of defining your types depending on original types that comes from original module or the original submodule ("next-auth" module and "next-auth/jwt" submodule in our case) where we extending theme to new types ONLY IN OUR PROJECT SCOPE
        session({ token, session }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }

            return session
        },

        //? "jwt" method is the method that is called when any JWT created (at sign in) or updated (when the session is accessed in the client side)
        //? also like "session" method, if we want to determine our specific returned value from "jwt" method we should use Module Augmentation
        async jwt({ token, user }) {
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email
                }
            })

            if (!dbUser) {
                token.id = user!.id
                return token
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image
            }
        },

        //? "redirect" is a method for redirecting the user after calling any one of the callback URLs like in "sign in" and in "sign out"
        redirect() {
            return "/dashboard"
        }
    },

    // JWT secret
    secret: process.env.JWT_SECRET
}


export default authOptions;