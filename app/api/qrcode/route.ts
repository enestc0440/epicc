import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { text_for_qr } = await request.json()

    if (!text_for_qr) {
      return NextResponse.json({ error: "Text for QR code is required" }, { status: 400 })
    }

    // Generate QR code URL using a public API
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text_for_qr)}`

    return NextResponse.json({
      text: text_for_qr,
      qrCodeUrl: qrCodeUrl,
    })
  } catch (error) {
    console.error("Error in QR code API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
