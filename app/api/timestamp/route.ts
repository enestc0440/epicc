import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { timestamp } = await request.json()

    const currentTimestamp = Math.floor(Date.now() / 1000)
    const currentDate = new Date()

    if (!timestamp) {
      // Return current timestamp if none provided
      return NextResponse.json({
        currentTimestamp: currentTimestamp,
        currentDate: currentDate.toISOString(),
        currentDateLocal: currentDate.toLocaleString(),
        unixTimestamp: currentTimestamp,
        milliseconds: Date.now(),
      })
    }

    // Convert provided timestamp
    let date: Date
    const numTimestamp = Number(timestamp)

    if (timestamp.toString().length === 10) {
      // Unix timestamp (seconds)
      date = new Date(numTimestamp * 1000)
    } else if (timestamp.toString().length === 13) {
      // Milliseconds timestamp
      date = new Date(numTimestamp)
    } else {
      // Try to parse as date string
      date = new Date(timestamp)
    }

    if (isNaN(date.getTime())) {
      return NextResponse.json({ error: "Invalid timestamp format" }, { status: 400 })
    }

    return NextResponse.json({
      input: timestamp,
      date: date.toISOString(),
      dateLocal: date.toLocaleString(),
      unixTimestamp: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
      dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
      relative: getRelativeTime(date),
    })
  } catch (error) {
    console.error("Error in timestamp API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) return `${diffSecs} seconds ago`
  if (diffMins < 60) return `${diffMins} minutes ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays < 30) return `${diffDays} days ago`
  return date.toLocaleDateString()
}
