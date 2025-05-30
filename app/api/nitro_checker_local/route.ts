import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { codes } = await request.json()

    if (!codes) {
      return NextResponse.json({ error: "Kontrol edilecek kodlar gereklidir" }, { status: 400 })
    }

    const codeList = codes
      .split("\n")
      .map((c: string) => c.trim())
      .filter((c: string) => c.length > 10 && c.length < 25)

    if (codeList.length === 0) {
      return NextResponse.json({ error: "Geçerli Nitro kodları bulunamadı" }, { status: 400 })
    }

    const results = []
    const validCodes = []

    for (const code of codeList.slice(0, 20)) {
      // Max 20 codes at once
      // Simulate checking (in real implementation, you'd check against Discord API)
      const isValid = Math.random() > 0.95 // 5% chance of being valid (very low for simulation)
      const status = isValid ? "GEÇERLİ" : "GEÇERSİZ"
      const statusCode = isValid ? 200 : 404

      results.push({
        code: code,
        url: `https://discord.gift/${code}`,
        status: status,
        statusCode: statusCode,
        checked: new Date().toISOString(),
      })

      if (isValid) {
        validCodes.push(`https://discord.gift/${code}`)
      }
    }

    const response = {
      totalChecked: results.length,
      validCount: validCodes.length,
      invalidCount: results.length - validCodes.length,
      results: results,
      validCodes: validCodes,
      timestamp: new Date().toISOString(),
      warning: "Bu simüle edilmiş bir kontrol sonucudur. Gerçek Discord API kontrolü yapılmamıştır.",
      note: "Eğitim amaçlı simülasyon sonuçlarıdır.",
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in Nitro checker API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
