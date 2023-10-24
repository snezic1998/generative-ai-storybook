import { TextGenerationResponse } from "../interfaces/api-interfaces"
import {
  getSecret,
  getGeneratedText,
  getCloudStorage,
} from "../apis/google-api"

describe("getText from PaLm2 generation", () => {
  it("sanitize prompt with non-english characters", async () => {
    const prompt: string =
      "Convert any non-english text characters to their english counterparts in the following prompt: In the bustling city park, where laughter echoed and swings danced in the breeze, a human girl named Sophie and her loyal dog, Max, found themselves on a sunny afternoon. The park, a vibrant oasis amidst towering buildings, was their favorite spot to play and explore. \n\nAs they strolled through the park, Sophie noticed a group of children playing a game of tag, their joyful shrieks filling the air. She wanted to join in, but hesitated, feeling shy. Meanwhile, Max, a playful and energetic Border Collie, spotted a squirrel scampering up a tree and dashed after it, barking excitedly.\n\nSeeing her beloved dog chase the squirrel, Sophie called out, \"Max, come back!\" But Max, caught up in the thrill of the chase, ignored her pleas. Sophie grew frustrated and called out again, this time with a stern tone. \"Max! Come back now!\" \n\nMax, sensing Sophie's frustration, stopped chasing the squirrel and turned to look at her. He could sense her disappointment and垂头丧气地朝她走去。\n\nSophie, seeing Max's crestfallen expression, realized she had been too harsh. She softened her tone and said, \"I'm sorry, Max. I didn't mean to yell at you. I just don't want you to get lost.\" \n\nMax wagged his tail and nuzzled Sophie's hand, forgiving her in an instant. The two of them then made up and continued their walk in the park, this time with a renewed sense of understanding and companionship."
    const response: TextGenerationResponse | undefined = await getGeneratedText(
      prompt
    )
    console.log(response?.predictions[0].content)
    expect(response).toBeDefined()
    expect(response).not.toBeNull()
  })

  it("sanitize prompt for curse words", async () => {
    const prompt: string =
      'Return the word true if the following story contains inappropriate language, or false if it does not: Sophie was walking her dog, Max, in the park when she saw a squirrel. She took off after it, calling for Max to follow. But Max was more interested in sniffing around the bushes.\n\n"Come on, Max!" Sophie called. "Squirrel!"\n\nBut Max just wagged his tail and kept sniffing.\n\n"Fine," Sophie said. "I\'ll just go without you."\n\nShe ran after the squirrel, but Max didn\'t budge. He just sat down in the middle of the path and watched her go.\n\n"What the hell, Max?" Sophie shouted. "Come on!"\n\nBut Max just yawned and closed his eyes.\n\nSophie was furious. She turned around and marched back to Max.\n\n"You\'re such a lazy piece of shit," she said. "I can\'t believe I even brought you with me."\n\nMax opened his eyes and looked at her. He wagged his tail again.\n\n"Oh, what\'s that?" Sophie said. "You\'re sorry? Well, it\'s too late for that now. You\'re grounded."\n\nShe turned and walked away, leaving Max sitting in the middle of the path. He watched her go, then he sighed and got up. He trotted after her, but he kept his distance.\n\nHe knew he was in trouble, and he didn\'t want to make it any worse.'
    const response: TextGenerationResponse | undefined = await getGeneratedText(
      prompt
    )
    console.log(response?.predictions[0].content)
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
