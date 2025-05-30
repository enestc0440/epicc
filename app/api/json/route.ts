import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { json_data } = await request.json()

    if (!json_data) {
      return NextResponse.json({ error: "JSON data is required" }, { status: 400 })
    }

    try {
      const parsedJson = JSON.parse(json_data)
      return NextResponse.json(parsedJson)
    } catch (e) {
      return NextResponse.json(
        { error: `Invalid JSON: ${e instanceof Error ? e.message : "Unknown parsing error"}` },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Error in JSON API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
