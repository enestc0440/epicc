import { NextResponse } from "next/server"

export async function POST(request: Request) {
  // This API will return empty data since browser info needs to be collected client-side
  return NextResponse.json({
    message:
      "Browser information must be collected on the client side. Use the client-side JavaScript to get this information.",
  })
}
