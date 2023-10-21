import { TextGenerationResponse } from "./api-interfaces"
import { getSecret, getText } from "./google-api"

describe("getText from PaLm2 generation", () => {
  it("should return text from API", async () => {
    const prompt: string = "Hello, world!"
    const response: TextGenerationResponse | undefined = await getText(prompt)
    expect(response).toBeDefined()
    expect(response).not.toBeNull()
  })
})

describe("getSecret from Secret Manager", () => {
  it("should return decoded secret value", async () => {
    const secret: string = "TEST_SECRET"
    const response: string | undefined = await getSecret(secret)
    expect(response).toEqual("Test Secret")
    expect(response).toBeDefined()
    expect(response).not.toBeNull()
  })

  it("should return decoded secret value", async () => {
    const secret: string = "TEST_SECRET_UNDEFINED"
    const response: string | undefined = await getSecret(secret)
    expect(response).toBeUndefined()
  })
})
