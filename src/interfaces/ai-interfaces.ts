import inputs from "../../generative-tests/inputs-generative-responses.json"

export interface InputInterface {
  basePrompt: string
  modifications: {
    length: string
    ageGroup: string
    characters: string
    setting: string
    language: string
    perspective: string
    additionalParameters: string
  }[]
}

export interface OutputInterface {
  input: string
  output: string
}

export function retInputInterface(): InputInterface {
  return inputs as InputInterface
}
