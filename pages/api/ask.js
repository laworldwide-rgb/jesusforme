console.log("NEW API VERSION RUNNING"); 
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { question } = req.body;
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are helping a parent explain Christianity to a young child.

Respond in EXACTLY this format:

CHILD EXPLANATION:
(2–4 short, simple sentences a child can understand)

PARENT NOTE:
(brief explanation to help the parent understand more deeply)

Keep it:
- warm
- simple
- theologically sound (Protestant/Lutheran leaning)
- not academic

Question: ${question}`,
              },
            ],
          },
        ],
      }),   // ← closes JSON.stringify(
    });     // ← closes fetch(

    const data = await response.json();
    if (!response.ok) {
      return res.status(500).json({
        error: data.error?.message || "API request failed",
      });
    }
    return res.status(200).json({
      answer: data.content?.[0]?.text || "No response",
    });
  } catch (error) {
    return res.status(500).json({
      error: "NEW VERSION ERROR",
    });
  }
}
