export interface TextGenerationResponse {
  predictions: {
    safetyAttributes: {
      scores: number[]
      blocked: boolean
      categories: string[]
    }
    content: string
    citationMetadata: {
      citations: any[]
    }
  }[]
  metadata: {
    tokenMetadata: {
      outputTokenCount: {
        totalTokens: number
        totalBillableCharacters: number
      }
      inputTokenCount: {
        totalTokens: number
        totalBillableCharacters: number
      }
    }
  }
}
