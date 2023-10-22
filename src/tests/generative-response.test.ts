import { TextGenerationResponse } from "../interfaces/api-interfaces"
import { getGeneratedText } from "../apis/google-api"
import inputs from "../../generative-tests/inputs-generative-responses.json"
import fs from "fs"

describe("test generative responses", () => {
  interface InputInterface {
    basePrompt: string
    modifications: {
      length: string
      ageGroup: string
      characters: string
      setting: string
      additionalParameters: string
    }[]
  }

  interface OutputInterface {
    input: string
    output: string
  }

  function retInputInterface(): InputInterface {
    return inputs as InputInterface
  }

  function getPrompt(basePrompt: string, modifications: Object): string {
    let prompt: string = basePrompt

    for (const [key, value] of Object.entries(modifications)) {
      prompt += `\n${value}`
    }
    return prompt
  }

  it("test results of 5 generative responses and output to JSON", async () => {
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
