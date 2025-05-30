import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const { text, type } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    if (!type) {
      return NextResponse.json({ error: "Hash type is required" }, { status: 400 })
    }

    let hash: string

    switch (type.toLowerCase()) {
      case "md5":
        hash = crypto.createHash("md5").update(text).digest("hex")
        break
      case "sha1":
        hash = crypto.createHash("sha1").update(text).digest("hex")
        break
      case "sha256":
        hash = crypto.createHash("sha256").update(text).digest("hex")
        break
      case "sha512":
        hash = crypto.createHash("sha512").update(text).digest("hex")
        break
      default:
        return NextResponse.json({ error: "Invalid hash type" }, { status: 400 })
    }

    return NextResponse.json({
      original: text,
      type: type.toUpperCase(),
      hash: hash,
    })
  } catch (error) {
    console.error("Error in hash API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
