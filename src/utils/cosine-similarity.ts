export default function cosineSimilarity(A: number[], B: number[]) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < A.length; i++) {

        dotProduct += A[i] * B[i];

        normA += A[i] * A[i];

        normB += B[i] * B[i];

    }

    normA = Math.sqrt(normA);

    normB = Math.sqrt(normB);

    const similarity = dotProduct / (normA * normB)

    return similarity
}