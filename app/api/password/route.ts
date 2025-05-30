import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const {
      length = 16,
      include_uppercase = true,
      include_numbers = true,
      include_symbols = true,
    } = await request.json()

    const passwordLength = Math.min(Math.max(Number.parseInt(length) || 16, 8), 128)

    let chars = "abcdefghijklmnopqrstuvwxyz"
    if (include_uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (include_numbers) chars += "0123456789"
    if (include_symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let password = ""
    const randomValues = new Uint32Array(passwordLength)
    crypto.getRandomValues(randomValues)

    for (let i = 0; i < passwordLength; i++) {
      password += chars.charAt(randomValues[i] % chars.length)
    }

    return NextResponse.json({
      password,
      length: password.length,
      strength: calculatePasswordStrength(password),
      entropy: calculateEntropy(password, chars.length),
    })
  } catch (error) {
    console.error("Error in password API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

function calculatePasswordStrength(password: string): string {
  const length = password.length
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSymbol = /[^a-zA-Z0-9]/.test(password)

  const varietyCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length

  if (length < 8) return "Very Weak"
  if (length < 10) return varietyCount < 3 ? "Weak" : "Moderate"
  if (length < 12) return varietyCount < 3 ? "Moderate" : "Strong"
  if (length < 16) return varietyCount < 3 ? "Strong" : "Very Strong"
  return "Extremely Strong"
}

function calculateEntropy(password: string, charsetSize: number): number {
  return Math.round(password.length * Math.log2(charsetSize))
}
