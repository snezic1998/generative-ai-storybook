import { TextGenerationResponse } from "./api-interfaces"
import { getText } from "./google-api"

describe("getText", () => {
  it("should return text from API", async () => {
    const prompt = "Hello, world!"
    const response: TextGenerationResponse | undefined = await getText(prompt)
    expect(response).toBeDefined()
    expect(response).not.toBeNull()
  })
})
