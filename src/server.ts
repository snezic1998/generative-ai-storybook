import express from "express"
import path from "path"
import { InputInterface, OutputInterface } from "./interfaces/ai-interfaces"
import { getPrompt } from "./generalUtils"
import { TextGenerationResponse } from "./interfaces/api-interfaces"
import { getGeneratedText } from "./apis/google-api"

const app = express()
const port = 3000
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/image", (req, res) => {
  res.sendFile("generative-tests/test-image.jpeg", {
    root: path.join(__dirname, "../"),
  })
})

app.post("/ai", async (req, res) => {
  const prompts = req.body as InputInterface

  let responses: OutputInterface[] = []

  for (let i = 0; i < prompts.modifications.length; i++) {
    const prompt: string = getPrompt(
      prompts.basePrompt,
      prompts.modifications[i]
    )

    const response: TextGenerationResponse | undefined = await getGeneratedText(
      prompt
    )

    if (response) {
      responses.push({
        input: prompt,
        output: response.predictions[0].content,
      })
    }
  }

  res.send(responses[0].output)
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
