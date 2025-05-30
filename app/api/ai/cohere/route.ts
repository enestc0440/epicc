import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { apiKey, message } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "Cohere API key is required" }, { status: 400 })
    }

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt: `Human: ${message}\n\nAssistant:`,
        max_tokens: 1000,
        temperature: 0.7,
        stop_sequences: ["Human:"],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        {
          error: errorData.message || "Cohere API request failed",
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    const aiResponse = data.generations[0]?.text?.trim() || "No response generated"

    return NextResponse.json({
      response: aiResponse,
      model: "command",
      provider: "cohere",
    })
  } catch (error) {
    console.error("Error in Cohere API:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
