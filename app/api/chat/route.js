import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const body = await request.json()
    const { message, prId } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get the API key from environment variables
    const apiKey = process.env.AI_SERVICE_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "AI service API key not configured" }, { status: 500 })
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

    // Call venice.ai API with the correct model and parameters
    const response = await fetch("https://api.venice.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b", // Use the correct model name
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
        venice_parameters: {
          enable_web_search: "auto",
          include_venice_system_prompt: true,
        },
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Venice AI API error:", data)
      throw new Error(data.error?.message || JSON.stringify(data.error) || "Error calling Venice AI API")
    }

    // Extract the assistant's response from the API response
    const assistantResponse =
      data.choices[0]?.message?.content || "Sorry, I could not generate a response at this time."

    return NextResponse.json({ response: assistantResponse })
  } catch (error) {
    console.error("Error processing chat message:", error)
    return NextResponse.json({ error: "Error processing your request: " + error.message }, { status: 500 })
  }
}

