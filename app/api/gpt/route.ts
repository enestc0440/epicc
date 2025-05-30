import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { apiKey, prompt } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "API anahtarı gereklidir" }, { status: 400 })
    }

    if (!prompt) {
      return NextResponse.json({ error: "Prompt gereklidir" }, { status: 400 })
    }

    // Simulate GPT response (in real implementation, you'd call OpenAI API)
    const simulatedResponse = {
      prompt: prompt,
      response: `Bu simüle edilmiş bir GPT yanıtıdır. Gerçek GPT entegrasyonu için OpenAI API anahtarınızı kullanarak aşağıdaki gibi bir istek yapabilirsiniz:

Prompt: "${prompt}"

Simüle Edilmiş Yanıt: Bu, "${prompt}" sorunuza verilen örnek bir yanıttır. Gerçek GPT API'si daha detaylı ve bağlama uygun yanıtlar verecektir.

Not: Bu özellik şu anda simülasyon modundadır. Gerçek GPT entegrasyonu için OpenAI API anahtarınızı kullanın.`,
      model: "gpt-3.5-turbo (simulated)",
      tokens: {
        prompt: prompt.length,
        completion: 150,
        total: prompt.length + 150,
      },
      timestamp: new Date().toISOString(),
      note: "Bu simüle edilmiş bir GPT yanıtıdır. Gerçek API entegrasyonu için OpenAI API anahtarı gereklidir.",
    }

    return NextResponse.json(simulatedResponse)
  } catch (error) {
    console.error("Error in GPT API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
