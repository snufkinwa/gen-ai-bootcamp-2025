// API functions for interacting with the FastAPI backend

// Evaluate kana writing
export async function evaluateKana({
  image,
  expectedKana,
  mode,
}: {
  image: string
  expectedKana: string
  mode: "hiragana" | "katakana"
}): Promise<{
  correct: boolean
  score: number
  message: string
}> {
  // In a real app, this would call the FastAPI backend
  // For now, we'll simulate a response
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 101)
      const correct = randomScore > 70

      let message = ""
      if (randomScore > 90) {
        message = "Perfect! Your writing is excellent."
      } else if (randomScore > 70) {
        message = "Good job! Your writing is clear and legible."
      } else if (randomScore > 50) {
        message = "Not bad, but try to make your strokes more precise."
      } else {
        message = "Keep practicing! Focus on the stroke order and proportions."
      }

      resolve({
        correct,
        score: randomScore,
        message,
      })
    }, 1500)
  })
}

// Fetch transcription from YouTube
export async function fetchTranscription(videoId: string): Promise<{
  transcription: Array<{
    start: number
    end: number
    text: string
  }>
}> {
  // In a real app, this would call the FastAPI backend
  // For now, we'll simulate a response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        transcription: [
          {
            start: 0,
            end: 3.5,
            text: "こんにちは、皆さん。",
          },
          {
            start: 3.5,
            end: 7.2,
            text: "今日は日本語の勉強について話します。",
          },
          {
            start: 7.2,
            end: 12.0,
            text: "毎日の練習が大切です。",
          },
        ],
      })
    }, 1000)
  })
}

// Evaluate pronunciation
export async function evaluatePronunciation({
  audio,
  text,
}: {
  audio: string
  text: string
}): Promise<{
  score: number
  message: string
  details: Array<{
    character: string
    score: number
  }>
}> {
  // In a real app, this would call the FastAPI backend
  // For now, we'll simulate a response
  return new Promise((resolve) => {
    setTimeout(() => {
      const overallScore = Math.floor(Math.random() * 41) + 60 // 60-100

      let message = ""
      if (overallScore > 90) {
        message = "Excellent pronunciation! You sound like a native speaker."
      } else if (overallScore > 80) {
        message = "Very good pronunciation. Keep practicing!"
      } else if (overallScore > 70) {
        message = "Good pronunciation, but there's room for improvement."
      } else {
        message = "Your pronunciation needs more practice. Focus on the highlighted sounds."
      }

      // Generate details for each character
      const details = text.split("").map((char) => ({
        character: char,
        score: Math.floor(Math.random() * 41) + 60, // 60-100
      }))

      resolve({
        score: overallScore,
        message,
        details,
      })
    }, 1500)
  })
}

// Generate response for visual novel
export async function generateResponse(
  dialogue: Array<{ character: string; text: string }>,
  currentScene: string,
): Promise<{
  text: string
  translation: string
}> {
  // In a real app, this would call the FastAPI backend
  // For now, we'll simulate a response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        text: "はい、わかりました。何かほかに手伝えることはありますか？",
        translation: "Yes, I understand. Is there anything else I can help you with?",
      })
    }, 1000)
  })
}

