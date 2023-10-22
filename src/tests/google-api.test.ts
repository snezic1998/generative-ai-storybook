import { TextGenerationResponse } from "../interfaces/api-interfaces"
import {
  getSecret,
  getGeneratedText,
  getCloudStorage,
} from "../apis/google-api"

describe("getText from PaLm2 generation", () => {
  it("should return text from API", async () => {
    const prompt: string = "Hello, world!"
    const response: TextGenerationResponse | undefined = await getGeneratedText(
      prompt
    )
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

  it("should return undefined", async () => {
    const secret: string = "TEST_SECRET_UNDEFINED"
    const response: string | undefined = await getSecret(secret)
    expect(response).toBeUndefined()
  })
})

describe("getCloudStorage from Cloud Storage", () => {
  it("should return json object", async () => {
    const obj: string = "Test.json"
    const response: string | undefined = await getCloudStorage(obj)

    console.log(response)
    expect(response).toBeDefined()
  })
})
