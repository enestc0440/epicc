import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { ad, soyad, il, ilce } = await request.json()

    if (!ad || !soyad) {
      return NextResponse.json({ error: "Ad ve soyad gereklidir" }, { status: 400 })
    }

    const params = new URLSearchParams({
      ad: ad,
      soyad: soyad,
    })

    if (il) params.append("il", il)
    if (ilce) params.append("ilce", ilce)

    const response = await fetch(`https://api.ondex.uk/ondexapi/adsoyadsorgu.php?${params.toString()}`, {
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
    console.error("Error in ad-soyad sorgu API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
