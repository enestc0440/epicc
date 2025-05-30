import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { apiKey, message } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is required" }, { status: 400 })
    }

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        {
          error: errorData.error?.message || "Gemini API request failed",
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    const aiResponse = data.candidates[0]?.content?.parts[0]?.text || "No response generated"

    return NextResponse.json({
      response: aiResponse,
      model: "gemini-pro",
      provider: "gemini",
    })
  } catch (error) {
    console.error("Error in Gemini API:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
