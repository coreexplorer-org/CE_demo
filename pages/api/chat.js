export default async function handler(req, res) {
  // Check if this is a POST request
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // Get the API key from environment variables
  const apiKey = process.env.AI_SERVICE_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: "AI service API key not configured" })
  }

  try {
    const { message, prId } = req.body

    if (!message) {
      return res.status(400).json({ error: "Message is required" })
    }

    // Get PR context based on the PR ID
    let systemPrompt = "You are an AI assistant specialized in Bitcoin Core development. "

    if (prId === "pr123") {
      systemPrompt += "This PR fixes an issue with duplicate transactions in the listtransactions RPC call."
    } else if (prId === "pr124") {
      systemPrompt += "This PR improves peer connection handling with exponential backoff for reconnection attempts."
    } else if (prId === "pr125") {
      systemPrompt +=
        "This PR fixes a bug in the GUI where transaction fees were incorrectly calculated when using custom fee rates."
    } else if (prId === "pr126") {
      systemPrompt +=
        "This PR optimizes block validation by reducing redundant hash calculations during script verification."
    }

    // Call venice.ai API (OpenAI-compatible endpoint)
    const response = await fetch("https://api.venice.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "venice", // Use the appropriate model name for venice.ai
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Venice AI API error:", data)
      throw new Error(data.error?.message || "Error calling Venice AI API")
    }

    // Extract the assistant's response from the API response
    const assistantResponse =
      data.choices[0]?.message?.content || "Sorry, I could not generate a response at this time."

    res.status(200).json({ response: assistantResponse })
  } catch (error) {
    console.error("Error processing chat message:", error)
    res.status(500).json({ error: "Error processing your request: " + error.message })
  }
}

