import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ApiDashboard, RequestApiKey } from "@/components";



export const metadata: Metadata = {
	title: "Similarity API | Dashboard",
	description: "Free & open-source text similarity api",
};

const page = async () => {
	const session = await getServerSession(authOptions);

    if (!session) return notFound()

    const apiKey = await db.apiKey.findFirst({
        where: {
            userId: session.user.id,
            enabled: true
        }
    })

	return (
        <section className="max-w-7xl mx-auto mt-16">
            {
                apiKey 
            ?
                // @ts-expect-error Server Components 
                <ApiDashboard />
            :
                <RequestApiKey />
            }
        </section>
    );
};

export default page;
