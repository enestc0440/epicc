import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "Image data is required" }, { status: 400 })
    }

    // Simulate face recognition processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const confidence = Math.floor(Math.random() * 30) + 70 // 70-99%
    const age = Math.floor(Math.random() * 40) + 20 // 20-60 years
    const emotions = ["Happy", "Sad", "Angry", "Surprised", "Neutral", "Fear", "Disgust"]
    const emotion = emotions[Math.floor(Math.random() * emotions.length)]
    const gender = Math.random() > 0.5 ? "Male" : "Female"
    const genderConfidence = Math.floor(Math.random() * 30) + 70

    const facialFeatures = {
      eyeColor: ["Brown", "Blue", "Green", "Hazel", "Gray"][Math.floor(Math.random() * 5)],
      hairColor: ["Black", "Brown", "Blonde", "Red", "Gray", "White"][Math.floor(Math.random() * 6)],
      skinTone: ["Light", "Medium", "Dark"][Math.floor(Math.random() * 3)],
      facialHair: Math.random() > 0.7 ? "Present" : "None",
      glasses: Math.random() > 0.8 ? "Yes" : "No",
      hat: Math.random() > 0.9 ? "Yes" : "No",
    }

    const biometricData = {
      faceWidth: Math.floor(Math.random() * 50) + 120,
      faceHeight: Math.floor(Math.random() * 60) + 140,
      eyeDistance: Math.floor(Math.random() * 20) + 30,
      noseWidth: Math.floor(Math.random() * 15) + 25,
      mouthWidth: Math.floor(Math.random() * 25) + 35,
      jawWidth: Math.floor(Math.random() * 30) + 80,
    }

    const matches = []
    const numMatches = Math.floor(Math.random() * 5) + 1

    for (let i = 0; i < numMatches; i++) {
      matches.push({
        id: `MATCH_${Date.now()}_${i}`,
        similarity: Math.floor(Math.random() * 40) + 60,
        database: ["Criminal Records", "Missing Persons", "Social Media", "Government ID", "Corporate Database"][
          Math.floor(Math.random() * 5)
        ],
        lastSeen: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        location: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"][Math.floor(Math.random() * 5)],
      })
    }

    const response = `ΣPIC PΛПΣL Face Recognition Analysis
═══════════════════════════════════════════════════════════════
FACIAL DETECTION: SUCCESSFUL
Processing Time: ${(Math.random() * 2 + 1).toFixed(2)} seconds
Analysis Confidence: ${confidence}%

DEMOGRAPHIC ANALYSIS:
├── Age Estimate: ${age} ± 3 years
├── Gender: ${gender} (${genderConfidence}% confidence)
├── Emotion: ${emotion}
└── Facial Expression: ${Math.random() > 0.5 ? "Neutral" : "Expressive"}

PHYSICAL CHARACTERISTICS:
├── Eye Color: ${facialFeatures.eyeColor}
├── Hair Color: ${facialFeatures.hairColor}
├── Skin Tone: ${facialFeatures.skinTone}
├── Facial Hair: ${facialFeatures.facialHair}
├── Glasses: ${facialFeatures.glasses}
└── Head Covering: ${facialFeatures.hat}

BIOMETRIC MEASUREMENTS:
├── Face Width: ${biometricData.faceWidth}px
├── Face Height: ${biometricData.faceHeight}px
├── Eye Distance: ${biometricData.eyeDistance}px
├── Nose Width: ${biometricData.noseWidth}px
├── Mouth Width: ${biometricData.mouthWidth}px
└── Jaw Width: ${biometricData.jawWidth}px

DATABASE MATCHES FOUND: ${matches.length}
${matches
  .map(
    (match, index) => `
Match ${index + 1}:
├── Similarity: ${match.similarity}%
├── Database: ${match.database}
├── Last Seen: ${match.lastSeen}
└── Location: ${match.location}`,
  )
  .join("")}

FACIAL LANDMARKS DETECTED: 68 points
├── Eyes: 12 landmarks each
├── Nose: 9 landmarks
├── Mouth: 20 landmarks
├── Eyebrows: 10 landmarks each
└── Jaw: 17 landmarks

QUALITY ASSESSMENT:
├── Image Resolution: ${Math.floor(Math.random() * 500) + 500}x${Math.floor(Math.random() * 500) + 500}
├── Lighting Conditions: ${["Excellent", "Good", "Fair", "Poor"][Math.floor(Math.random() * 4)]}
├── Face Angle: ${Math.floor(Math.random() * 30)}° deviation
├── Blur Level: ${["None", "Minimal", "Moderate", "High"][Math.floor(Math.random() * 4)]}
└── Occlusion: ${Math.floor(Math.random() * 20)}%

SECURITY HASH: ${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}

ANALYSIS COMPLETE
═══════════════════════════════════════════════════════════════`

    return NextResponse.json({
      success: true,
      confidence,
      age,
      gender,
      emotion,
      facialFeatures,
      biometricData,
      matches,
      response,
      timestamp: new Date().toISOString(),
      processingTime: `${(Math.random() * 2 + 1).toFixed(2)}s`,
    })
  } catch (error) {
    console.error("Error in face recognition API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
