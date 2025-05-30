import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { host, port } = await request.json()

    if (!host) {
      return NextResponse.json({ error: "Host gereklidir" }, { status: 400 })
    }

    // If port is provided, scan specific port, otherwise scan common ports
    let apiUrl = `https://api.ondex.uk/ondexapi/portscanner.php?host=${encodeURIComponent(host)}`
    if (port) {
      apiUrl += `&port=${port}`
    }

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in port scanner API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
