"use client";

import { FC, FormEvent, useState } from "react";
import { toast } from "@/ui/Toast";
import { createApiKey } from "@/utils/create-api-key";
import Icons from "@/components/Icons";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import CopyButton from "./CopyButton";
import { Input } from "@/ui/Input";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";



const RequestApiKey: FC = () => {

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const router = useRouter();

    const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsCreating(true);

        try {
            const generatedApiKey = await createApiKey();
            setApiKey(generatedApiKey);
            router.refresh();
            
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: "Error",
                    message: error.message,
                    type: "error"
                })

                return
            }

            toast({
                title: "Error",
                message: "Something Went Wrong!",
                type: "error"
            })
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <section className="container md:max-w-2xl">
            <div className="flex flex-col gap-6 items-center">
                <Icons.Key className="mx-auto h-12 w-12 text-gray-400" />
                <LargeHeading>
                    Request Your API Key
                </LargeHeading>
                <Paragraph>
                    You haven&apos;t an API key yet.
                </Paragraph>
            </div>
            <form
            onSubmit={createNewApiKey}
            className="mt-6 sm:flex items-center"
            >
                <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
                    {apiKey ? (
                        <>
                            <CopyButton valueToCopy={apiKey} type="button" className="absolute inset-y-0 right-0 animate-in fade-in duration-300" />
                        </>
                    )
                    :
                    null
                    }
                    <Input readOnly value={apiKey ?? ''} placeholder="Request an API key to display it here!" />
                </div>
                <div className="flex justify-center sm:mt-0 sm:ml-4 mt-3 sm:flex-shrink-0">
                    <Button disabled={Boolean(apiKey)} isLoading={isCreating}>
                        Request key
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default RequestApiKey