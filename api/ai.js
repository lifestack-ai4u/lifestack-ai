export default async function handler(req, res) {
  try {
    const { question } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: question
      })
    });

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("DATA:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res.status(500).json({
        answer: "API ERROR: " + (data.error?.message || "unknown")
      });
    }

    const answer =
      data.output?.[0]?.content?.[0]?.text ||
      "No response from AI";

    return res.status(200).json({ answer });

  } catch (error) {
    return res.status(500).json({
      answer: "SERVER ERROR: " + error.message
    });
  }
}
