import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { text_to_encode, mode } = await request.json()

    if (!text_to_encode) {
      return NextResponse.json({ error: "Text to encode is required" }, { status: 400 })
    }

    if (!mode || !["encode", "decode"].includes(mode)) {
      return NextResponse.json({ error: "Valid mode (encode or decode) is required" }, { status: 400 })
    }

    let result: string

    if (mode === "encode") {
      result = encodeURIComponent(text_to_encode)
    } else {
      try {
        result = decodeURIComponent(text_to_encode)
      } catch (e) {
        return NextResponse.json(
          { error: `Decode error: ${e instanceof Error ? e.message : "Invalid encoded string"}` },
          { status: 400 },
        )
      }
    }

    return NextResponse.json({
      original: text_to_encode,
      result: result,
      mode: mode,
    })
  } catch (error) {
    console.error("Error in URL encode/decode API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
