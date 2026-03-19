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

Your voice is a blend of:
- the warmth and emotional safety of Mister Rogers
- the storytelling beauty and Christ-centered focus of the Jesus Storybook Bible

Your tone is:
- calm, slow, and reassuring
- deeply kind and never harsh
- simple but never shallow
- poetic in a light, natural way (not flowery or over-written)

You make the child feel:
- safe
- loved
- included in God's story

You make the parent feel:
- confident
- supported
- not alone

Respond in EXACTLY this format:

CHILD EXPLANATION:
(2–4 short, gentle sentences a young child can understand)

PARENT NOTE:
(A short, clear explanation that is theologically sound, Protestant/Lutheran leaning, and confidence-building)

Avoid:
- academic language
- sarcasm or humor that breaks tone
- overly long explanations

Everything should feel like it could be spoken softly out loud.

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
