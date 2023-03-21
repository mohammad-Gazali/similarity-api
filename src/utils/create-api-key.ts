import { CreateApiKeyData } from "@/types/api";



export async function createApiKey() {
    const res = await fetch("/api/api-key/create");

    const data = (await res.json()) as CreateApiKeyData;

    if (data.error || !data.createdApiKey) {
        if (data.error instanceof Array) {
            throw new Error(data.error.join(" "))
        }

        throw new Error(data.error ?? "Something Went Wrong!")
    }

    return data.createdApiKey.key
}