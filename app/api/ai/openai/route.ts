import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { apiKey, message } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key is required" }, { status: 400 })
    }

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful AI assistant integrated into a cybersecurity platform called ΣPIC PΛПΣL. Provide helpful and accurate responses.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        {
          error: errorData.error?.message || "OpenAI API request failed",
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || "No response generated"

    return NextResponse.json({
      response: aiResponse,
      model: "gpt-4",
      provider: "openai",
    })
  } catch (error) {
    console.error("Error in OpenAI API:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
