import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { color } = await request.json()

    if (!color) {
      return NextResponse.json({ error: "Color value is required" }, { status: 400 })
    }

    // Helper functions for color conversion
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : null
    }

    const rgbToHex = (r: number, g: number, b: number) => {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }

    const rgbToHsl = (r: number, g: number, b: number) => {
      r /= 255
      g /= 255
      b /= 255
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h = 0
      let s = 0
      const l = (max + min) / 2

      if (max === min) {
        h = s = 0 // achromatic
      } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
          case g:
            h = (b - r) / d + 2
            break
          case b:
            h = (r - g) / d + 4
            break
        }
        h /= 6
      }

      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
      }
    }

    let rgb: { r: number; g: number; b: number } | null = null

    // Parse different color formats
    if (color.startsWith("#")) {
      rgb = hexToRgb(color)
    } else if (color.startsWith("rgb")) {
      const match = color.match(/rgb$$(\d+),\s*(\d+),\s*(\d+)$$/)
      if (match) {
        rgb = {
          r: Number.parseInt(match[1]),
          g: Number.parseInt(match[2]),
          b: Number.parseInt(match[3]),
        }
      }
    } else if (color.startsWith("hsl")) {
      // Basic HSL parsing - you might want to implement full HSL to RGB conversion
      return NextResponse.json({ error: "HSL input not fully supported yet" }, { status: 400 })
    }

    if (!rgb) {
      return NextResponse.json({ error: "Invalid color format" }, { status: 400 })
    }

    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

    return NextResponse.json({
      input: color,
      hex: hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      values: {
        hex: hex,
        rgb: rgb,
        hsl: hsl,
      },
      complementary: rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b),
    })
  } catch (error) {
    console.error("Error in color picker API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
