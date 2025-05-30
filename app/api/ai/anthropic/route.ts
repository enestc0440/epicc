import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { apiKey, message } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "Anthropic API key is required" }, { status: 400 })
    }

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        {
          error: errorData.error?.message || "Anthropic API request failed",
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    const aiResponse = data.content[0]?.text || "No response generated"

    return NextResponse.json({
      response: aiResponse,
      model: "claude-3-sonnet",
      provider: "anthropic",
    })
  } catch (error) {
    console.error("Error in Anthropic API:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
