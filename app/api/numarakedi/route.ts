import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { sayı } = await request.json()

    if (!sayı) {
      return NextResponse.json({ error: "Sayı gereklidir" }, { status: 400 })
    }

    const response = await fetch(`https://api.ondex.uk/ondexapi/numarakedi.php?sayı=${sayı}`, {
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
    console.error("Error in numara kedi API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
