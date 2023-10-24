export function getPrompt(basePrompt: string, modifications: Object): string {
  let prompt: string = basePrompt

  for (const [key, value] of Object.entries(modifications)) {
    prompt += `\n${value}`
  }
  return prompt
}
