import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { ip } = await request.json()

    if (!ip) {
      return NextResponse.json({ error: "IP adresi gereklidir" }, { status: 400 })
    }

    // Use the actual ip-api.com service
    const response = await fetch(`http://ip-api.com/json/${ip}`)

    if (!response.ok) {
      throw new Error(`IP API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in IP API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
