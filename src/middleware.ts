import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


//! WE MUST ADD THIS FILE INTO SRC FOLDER
//! THIS IS BECAUSE IT IS A MIDDLEWARE FILE
//! AND IF WE ARE NOT USING SRC FOLDER THEN THIS FILE SHOULD AT THE SAME LEVEL AS "pages" and "app" folders


const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_SECRET
})

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h")  //? (5, "1 h")  <==> 5 per hour
})

export default withAuth(
    async function middleware(req) {
        const pathname = req.nextUrl.pathname  // relative path

        // manage rate limiting
        if (pathname.startsWith('/api')) {
            const ip = req.ip ?? "127.0.0.1";

            try {
                const { success } = await ratelimit.limit(ip)

                if (!success) {
                    NextResponse.json({
                        error: "Too Many Requests."
                    })
                }

                return NextResponse.next()  //? continue if the ratelimit is fine
            } catch (error) {
                return NextResponse.json({
                    error: "Internal Server Error"
                })
            }
        }

        // Manage route protection
        const token = await getToken({ req });

        const isAuth = Boolean(token);

        const isAuthPage = pathname.startsWith("/login");

        const sensitiveRoutes = ['/dashboard'];

        if (isAuthPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            }

            return null
        }

        if (!isAuth && sensitiveRoutes.some(route => pathname.startsWith(route))) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
    },
    {
        callbacks: {
            async authorized() {
                return true
            },
        }
    }
)


export const config = {
    matcher: ["/", "/login", "/dashboard/:path*", "/api/:path*"]
}