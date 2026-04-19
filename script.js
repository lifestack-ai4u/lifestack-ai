async function askAI() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  output.innerText = "Loading...";

  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: input })
    });

    const data = await response.json();

    if (data.answer) {
      output.innerText = data.answer;
    } else {
      output.innerText = "No response from AI";
    }

  } catch (error) {
    output.innerText = "Error occurred";
  }
}
