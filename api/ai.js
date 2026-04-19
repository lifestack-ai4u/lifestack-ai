export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const data = await response.json();

    console.log("DATA:", data);

    const answer =
      data.choices?.[0]?.message?.content ||
      "No response from AI";

    return res.status(200).json({ answer });

  } catch (error) {
    return res.status(500).json({
      answer: "Error: " + error.message
    });
  }
}
