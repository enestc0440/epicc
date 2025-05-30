import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { tc } = await request.json()

    if (!tc) {
      return NextResponse.json({ error: "TC kimlik numarası gereklidir" }, { status: 400 })
    }

    const response = await fetch(`https://api.ondex.uk/ondexapi/isyeriarkadasisorgu.php?tc=${tc}`, {
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
    console.error("Error in işyeri arkadaşı sorgu API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
