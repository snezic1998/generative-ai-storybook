import axios from "axios"
import { GoogleAuth } from "google-auth-library"
import { TextGenerationResponse } from "./api-interfaces"

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
