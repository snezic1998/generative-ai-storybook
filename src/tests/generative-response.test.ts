import { TextGenerationResponse } from "../interfaces/api-interfaces"
import { getGeneratedText } from "../apis/google-api"
import fs from "fs"
import { OutputInterface, retInputInterface } from "../interfaces/ai-interfaces"
import { getPrompt } from "../generalUtils"

describe("test generative responses", () => {
  it("generate results of x generative responses and output to JSON", async () => {
    const prompts = retInputInterface()
    let responses: OutputInterface[] = []

    for (let i = 0; i < prompts.modifications.length; i++) {
      const prompt: string = getPrompt(
        prompts.basePrompt,
        prompts.modifications[i]
      )

      const response: TextGenerationResponse | undefined =
        await getGeneratedText(prompt)

      if (response) {
        responses.push({
          input: prompt,
          output: response.predictions[0].content,
        })
      }
    }

    const date = new Date().getTime()
    const fileName = `output-${date}.json`
    const filePath = `./generative-tests/outputs/${fileName}`
    fs.writeFileSync(filePath, JSON.stringify(responses, null, 2))
  }, 100000)
})
