import { FC } from "react";
import type { Metadata } from "next";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { DocumentationTaps } from "@/components";



export const metadata: Metadata = {
    title: "Similarity API | Documentation",
    description: "Free & open-source text similarity api"
}


const page: FC = () => {
  return (
    <section className="container max-w-7xl mx-auto mt-12">
        <div className="flex flex-col items-center gap-6">
            <LargeHeading>
                Making a request
            </LargeHeading>
            <Paragraph>
                api/v1/similarity
            </Paragraph>
            <DocumentationTaps />
        </div>
    </section>
  )
}

export default page