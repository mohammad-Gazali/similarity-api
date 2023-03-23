export default async function revokeApiKey(keyId: string) {
    const res = await fetch("/api/api-key/revoke");

    const data = (await res.json()) as {error?: string, success: boolean}

    if (data.error) {
        throw new Error(data.error)
    }
}