import authOptions from "@/lib/auth";
import { db } from "@/lib/db";
import { RevokeApiData } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { z } from "zod";
import withMethods from "@/lib/middlewares/with-methods";



const handler = async (req: NextApiRequest, res: NextApiResponse<RevokeApiData>) => {

    try {
        
        const session = await getServerSession(req, res, authOptions);

        const user = session?.user;

        if (!user) {
            return res.status(401).json({
                error: "Unauthorized to perform this action.",
                success: false
            })
        }

        const validApiKey = await db.apiKey.findFirst({
            where: {
                userId: user.id,
                enabled: true
            }
        })

        if (!validApiKey) {
            return res.status(500).json({
                error: "This API key couldn't be revoked.",
                success: false
            })
        }

        // invalidate api key
        await db.apiKey.update({
            where: {
                id: validApiKey.id
            },
            data: {
                enabled: false
            }
        })

        return res.status(200).json({
            error: null,
            success: true
        })

    } catch (error) {
     
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: error.issues,
                success: false
            })
        }

        return res.status(500).json({
            error: "Internal Server Error",
            success: false
        })

    }

}


export default withMethods(["GET"], handler)