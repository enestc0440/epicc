import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { ip } = await request.json()

    if (!ip) {
      return NextResponse.json({ error: "IP address is required" }, { status: 400 })
    }

    const response = await fetch(`http://ip-api.com/json/${ip}`)

    if (!response.ok) {
      return NextResponse.json(
        { error: `API request failed with status ${response.status}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in IP info API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
