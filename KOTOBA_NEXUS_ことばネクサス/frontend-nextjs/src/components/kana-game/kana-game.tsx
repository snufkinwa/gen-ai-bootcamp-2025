"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Camera, Upload, Pencil, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import KanaCanvas from "./kana-canvas"
import WebcamCapture from "./webcam-capture"
import ImageUpload from "./image-upload"
import KanaFeedback from "./kana-feedback"
import { kanaList } from "@/lib/kana-data"
import { evaluateKana } from "@/lib/api"

type KanaMode = "hiragana" | "katakana"
type InputMode = "draw" | "webcam" | "upload"

export default function KanaGameComponent() {
  const [mode, setMode] = useState<KanaMode>("hiragana")
  const [inputMode, setInputMode] = useState<InputMode>("draw")
  const [currentKana, setCurrentKana] = useState({ character: "あ", romaji: "a" })
  const [image, setImage] = useState<string | null>(null)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [feedback, setFeedback] = useState<{
    correct: boolean
    score: number
    message: string
  } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Get a random kana
  const getRandomKana = () => {
    const kanas = kanaList[mode]
    const randomIndex = Math.floor(Math.random() * kanas.length)
    return kanas[randomIndex]
  }

  // Reset the game
  const resetGame = () => {
    setImage(null)
    setFeedback(null)
    setCurrentKana(getRandomKana())
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }
  }

  // Initialize the game
  useEffect(() => {
    resetGame()
  }, [mode])

  // Handle image submission
  const handleSubmitImage = async (imageData: string) => {
    setImage(imageData)
    setIsEvaluating(true)

    try {
      // Call the API to evaluate the kana
      const result = await evaluateKana({
        image: imageData,
        expectedKana: currentKana.character,
        mode: mode,
      })

      setFeedback(result)
    } catch (error) {
      console.error("Error evaluating kana:", error)
      setFeedback({
        correct: false,
        score: 0,
        message: "An error occurred while evaluating your kana. Please try again.",
      })
    } finally {
      setIsEvaluating(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Current Kana</h2>
                <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg">
                  <motion.div
                    key={currentKana.character}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-8xl font-bold mb-2"
                  >
                    {currentKana.character}
                  </motion.div>
                  <p className="text-xl text-muted-foreground">{currentKana.romaji}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Kana Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={mode === "hiragana" ? "default" : "outline"}
                      onClick={() => setMode("hiragana")}
                      className="w-full"
                    >
                      Hiragana
                    </Button>
                    <Button
                      variant={mode === "katakana" ? "default" : "outline"}
                      onClick={() => setMode("katakana")}
                      className="w-full"
                    >
                      Katakana
                    </Button>
                  </div>
                </div>

                <div>
                  <Button variant="outline" onClick={resetGame} className="w-full" disabled={isEvaluating}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    New Kana
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="draw" value={inputMode} onValueChange={(value) => setInputMode(value as InputMode)}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="draw" disabled={isEvaluating}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Draw
                  </TabsTrigger>
                  <TabsTrigger value="webcam" disabled={isEvaluating}>
                    <Camera className="mr-2 h-4 w-4" />
                    Webcam
                  </TabsTrigger>
                  <TabsTrigger value="upload" disabled={isEvaluating}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="draw" className="mt-0">
                  <KanaCanvas ref={canvasRef} onSubmit={handleSubmitImage} isSubmitting={isEvaluating} />
                </TabsContent>

                <TabsContent value="webcam" className="mt-0">
                  <WebcamCapture onCapture={handleSubmitImage} isCapturing={isEvaluating} />
                </TabsContent>

                <TabsContent value="upload" className="mt-0">
                  <ImageUpload onUpload={handleSubmitImage} isUploading={isEvaluating} />
                </TabsContent>
              </Tabs>

              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <KanaFeedback
                    correct={feedback.correct}
                    score={feedback.score}
                    message={feedback.message}
                    onNext={resetGame}
                  />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

