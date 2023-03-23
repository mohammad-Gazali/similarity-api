import { db } from "@/lib/db";
import withMethods from "@/lib/middlewares/with-methods";
import openai from "@/lib/openai";
import cosineSimilarity from "@/utils/cosine-similarity";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";



const requestSchema = z.object({
    text1: z.string().max(1000),
    text2: z.string().max(1000)
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const body = req.body as unknown;

    const apiKey = req.headers.authorization;

    if (!apiKey) {
        res.status(403).json({
            error: "Unauthorized"
        })
    };

    try {

        const { text1, text2 } = requestSchema.parse(body);

        const validApiKey = await db.apiKey.findFirst({
            where: {
                key: apiKey,
                enabled: true
            }
        })

        if (!validApiKey) {
            return res.status(401).json({
                error: "Non Valid API Key"
            })
        }

        const start = new Date();

        //? ================================================================
        //? the logic for getting the similarity of two text by using openai

        const embeddings = await Promise.all([text1, text2].map(async (text) => {
            const res = await openai.createEmbedding({
                model: "text-embedding-ada-002",
                input: text
            })
            
            return res.data.data[0].embedding
        }))

        const similarity = cosineSimilarity(embeddings[0], embeddings[1])

        //? ================================================================

        const duration = new Date().getTime() - start.getTime()


        // create new ApiRequest instance
        await db.apiRequest.create({
            data: {
                duration,
                method: req.method!,
                path: req.url!,
                status: 200,
                apiKeyId: validApiKey.id,
                usedApiKey: validApiKey.key
            }
        })

        return res.status(200).json({
            success: true,
            text1,
            text2,
            similarity
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: error.issues
            })
        }

        return res.status(500).json({
            error: "Internal Server Error"
        })
    }

}


export default withMethods(["POST"], handler)