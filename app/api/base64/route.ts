import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { text, mode } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    if (!mode || !["encode", "decode"].includes(mode)) {
      return NextResponse.json({ error: "Valid mode (encode or decode) is required" }, { status: 400 })
    }

    let result: string

    if (mode === "encode") {
      result = Buffer.from(text, "utf8").toString("base64")
    } else {
      try {
        result = Buffer.from(text, "base64").toString("utf8")
      } catch (e) {
        return NextResponse.json(
          { error: `Decode error: ${e instanceof Error ? e.message : "Invalid base64 string"}` },
          { status: 400 },
        )
      }
    }

    return NextResponse.json({
      original: text,
      result: result,
      mode: mode,
    })
  } catch (error) {
    console.error("Error in Base64 API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
