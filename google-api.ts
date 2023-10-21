import axios from "axios"
import { GoogleAuth } from "google-auth-library"
import { TextGenerationResponse } from "./api-interfaces"
import { SecretManagerServiceClient } from "@google-cloud/secret-manager"

export async function getText(
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
      maxOutputTokens: 100,
      topK: 5,
      topP: 0.5,
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

    console.log(
      JSON.stringify(
        response.data,
        null,
        2
      ) as unknown as TextGenerationResponse
    )

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

    // console.log(decryptedResponse)
    return decryptedResponse
  } catch (error) {
    console.log("Secret Not Found")
    return undefined
  }
}
