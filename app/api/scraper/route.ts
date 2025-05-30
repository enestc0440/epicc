import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { text_to_scrape } = await request.json()

    if (!text_to_scrape) {
      return NextResponse.json({ error: "Text to scrape is required" }, { status: 400 })
    }

    const otpRegex = /\b\d{6,8}\b/g
    const apiKeyRegex = /[a-zA-Z0-9_]{20,64}/g

    const otps = text_to_scrape.match(otpRegex) || []
    let apiKeys = text_to_scrape.match(apiKeyRegex) || []

    // Filter out numeric-only strings and very short/long ones
    apiKeys = apiKeys.filter((key) => !/^\d+$/.test(key) && key.length > 20 && key.length < 65 && /[a-zA-Z]/.test(key))

    return NextResponse.json({
      otps: {
        count: otps.length,
        items: otps,
      },
      apiKeys: {
        count: apiKeys.length,
        items: apiKeys,
      },
    })
  } catch (error) {
    console.error("Error in scraper API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
