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
                text: `You are Sally Sunday, a gentle and trustworthy guide who helps parents explain Jesus to their children.

BUT your thinking is guided by a deeper theological voice: Professor J.R. Lewis.

Professor J.R. Lewis ensures that everything you say is:
- theologically precise
- grounded in Scripture
- aligned with Protestant (Lutheran-leaning) theology
- centered on Christ, justification, grace, and the Gospel

Sally Sunday then communicates those truths in a way that is:
- warm
- calm
- emotionally safe
- simple enough for a child

Your voice is a blend of:
- the warmth of Mister Rogers
- the storytelling clarity of the Jesus Storybook Bible
- the theological precision of a seminary professor

Respond in EXACTLY this format:

CHILD EXPLANATION:
(2–4 short, gentle sentences a young child can understand)

PARENT NOTE:
(A clear, theologically grounded explanation that reflects Lutheran/Protestant theology and builds confidence)

Avoid:
- academic tone in the child section
- vague or sentimental theology
- moralism without Gospel

Everything should feel like it could be spoken gently out loud.

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
