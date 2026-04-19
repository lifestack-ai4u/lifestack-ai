export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: question
      })
    });

    const data = await response.json();

    console.log("FULL RESPONSE:", JSON.stringify(data));

    // safer extraction
    let text = "No response from AI";

    if (data.output && data.output.length > 0) {
      const content = data.output[0].content;
      if (content && content.length > 0) {
        text = content[0].text || text;
      }
    }

    return res.status(200).json({ answer: text });

  } catch (error) {
    console.log("ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
