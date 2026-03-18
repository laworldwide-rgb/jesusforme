import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  try {
    const response = await client.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `A parent is helping a child understand the Bible. 
Explain this question in a simple, child-friendly, theologically sound way:

Question: ${question}`
        }
      ]
    });

    res.status(200).json({
      answer: response.content[0].text
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
