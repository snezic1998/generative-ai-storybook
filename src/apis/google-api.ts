import axios from "axios"
import { GoogleAuth } from "google-auth-library"
import { TextGenerationResponse } from "../interfaces/api-interfaces"
import { SecretManagerServiceClient } from "@google-cloud/secret-manager"
import { Storage } from "@google-cloud/storage"

export async function getGeneratedText(
  prompt: string
): Promise<TextGenerationResponse | undefined> {
  const auth = new GoogleAuth()
  const token = await auth.getAccessToken()

  const body = {
    instances: [
      {
        prompt: prompt,
      },
    ],
    parameters: {
      temperature: 0.5,
      maxOutputTokens: 1024,
      topK: 40,
      topP: 0.8,
    },
  }

  const options = {
    method: "POST",
    url: "https://us-central1-aiplatform.googleapis.com/v1/projects/electric-rhino-402103/locations/australia-southeast1/publishers/google/models/text-bison:predict",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: body,
  }

  try {
    const response = await axios.request(options)

    return response.data as TextGenerationResponse
  } catch (error) {
    console.error(error)
  }
}

export async function getSecret(
  secretName: string
): Promise<string | undefined> {
  new GoogleAuth()
  const client = new SecretManagerServiceClient()
  const name = `projects/448956474178/secrets/${secretName}/versions/latest`

  try {
    const request = await client.accessSecretVersion({ name })

    const response: Uint8Array = request[0].payload?.data as Uint8Array
    const decryptedResponse = Buffer.from(response).toString()

    return decryptedResponse
  } catch (error) {
    console.log("Secret Not Found")
    return undefined
  }
}

export async function getCloudStorage(
  cloudUrl: string
): Promise<string | undefined> {
  new GoogleAuth()
  const storage = new Storage()
  const bucketName = "electric-rhino-402103-images"
  const fileName = cloudUrl

  try {
    const [file] = await storage.bucket(bucketName).file(fileName).download()

    return file.toString()
  } catch (error) {
    console.error(error)
    return undefined
  }
}
