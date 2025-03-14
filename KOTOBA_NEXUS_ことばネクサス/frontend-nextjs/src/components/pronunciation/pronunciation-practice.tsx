"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Mic, Volume2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { evaluatePronunciation } from "@/lib/api"

type PracticeMode = "listen" | "speak" | "conversation"

export default function PronunciationPractice() {
  const [mode, setMode] = useState<PracticeMode>("listen")
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentPhrase, setCurrentPhrase] = useState({
    japanese: "おはようございます",
    romaji: "Ohayou gozaimasu",
    english: "Good morning",
    audioUrl: "/placeholder-audio.mp3",
  })
  const [feedback, setFeedback] = useState<{
    score: number
    message: string
    details: Array<{ character: string; score: number }>
  } | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<BlobPart[]>([])

  // Play/pause audio
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const audioUrl = URL.createObjectURL(audioBlob)

        // Convert to base64 for API submission
        const reader = new FileReader()
        reader.readAsDataURL(audioBlob)
        reader.onloadend = async () => {
          const base64Audio = reader.result as string

          // Submit to API for evaluation
          setIsLoading(true)
          try {
            const result = await evaluatePronunciation({
              audio: base64Audio,
              text: currentPhrase.japanese,
            })
            setFeedback(result)
          } catch (error) {
            console.error("Error evaluating pronunciation:", error)
          } finally {
            setIsLoading(false)
          }
        }

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error starting recording:", error)
      alert("Unable to access microphone. Please ensure you have granted permission.")
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  // Get a new phrase
  const getNewPhrase = async () => {
    setIsLoading(true)
    setFeedback(null)

    try {
      // In a real app, this would fetch from the API
      // For now, we'll simulate with a timeout
      setTimeout(() => {
        const phrases = [
          {
            japanese: "こんにちは",
            romaji: "Konnichiwa",
            english: "Hello",
            audioUrl: "/placeholder-audio.mp3",
          },
          {
            japanese: "ありがとうございます",
            romaji: "Arigatou gozaimasu",
            english: "Thank you very much",
            audioUrl: "/placeholder-audio.mp3",
          },
          {
            japanese: "すみません",
            romaji: "Sumimasen",
            english: "Excuse me / I'm sorry",
            audioUrl: "/placeholder-audio.mp3",
          },
        ]

        const randomIndex = Math.floor(Math.random() * phrases.length)
        setCurrentPhrase(phrases[randomIndex])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching new phrase:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="listen" value={mode} onValueChange={(value) => setMode(value as PracticeMode)}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="listen">
            <Volume2 className="mr-2 h-4 w-4" />
            Listening
          </TabsTrigger>
          <TabsTrigger value="speak">
            <Mic className="mr-2 h-4 w-4" />
            Speaking
          </TabsTrigger>
          <TabsTrigger value="conversation">
            <div className="flex items-center">
              <Volume2 className="mr-1 h-4 w-4" />
              <Mic className="mr-2 h-4 w-4" />
              Conversation
            </div>
          </TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="pt-6">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Current Phrase</h2>
                <Button variant="outline" size="sm" onClick={getNewPhrase} disabled={isLoading || isRecording}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  New Phrase
                </Button>
              </div>

              <motion.div
                key={currentPhrase.japanese}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-muted rounded-lg mb-4"
              >
                <div className="text-3xl font-bold mb-2">{currentPhrase.japanese}</div>
                <div className="text-lg text-muted-foreground mb-1">{currentPhrase.romaji}</div>
                <div className="text-sm text-muted-foreground">{currentPhrase.english}</div>
              </motion.div>

              <div className="flex items-center justify-between">
                <Button variant={isPlaying ? "secondary" : "default"} onClick={toggleAudio} disabled={isLoading}>
                  {isPlaying ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Play Audio
                    </>
                  )}
                </Button>
                <audio
                  ref={audioRef}
                  src={currentPhrase.audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  onTimeUpdate={() => {
                    if (audioRef.current) {
                      const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100
                      setProgress(percentage)
                    }
                  }}
                />
                {isPlaying && (
                  <div className="flex-1 ml-4">
                    <Progress value={progress} />
                  </div>
                )}
              </div>
            </div>

            <TabsContent value="listen" className="mt-0">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Listen carefully to the pronunciation and try to repeat it. Click the play button to hear the audio
                  again.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="speak" className="mt-0">
              <div className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  Try to pronounce the phrase above. Click the record button and speak clearly into your microphone.
                </p>

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    variant={isRecording ? "destructive" : "default"}
                    className="h-16 w-16 rounded-full"
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isLoading}
                  >
                    <Mic className="h-6 w-6" />
                  </Button>
                </div>

                {isRecording && (
                  <div className="text-center text-sm text-muted-foreground">
                    Recording... Click the button to stop.
                  </div>
                )}

                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 p-4 rounded-lg bg-muted"
                  >
                    <h3 className="text-lg font-semibold mb-2">Pronunciation Feedback</h3>

                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="h-2.5 rounded-full bg-primary" style={{ width: `${feedback.score}%` }}></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">{feedback.score}%</span>
                      </div>
                      <p className="text-sm">{feedback.message}</p>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {feedback.details.map((detail, index) => (
                        <div key={index} className="flex flex-col items-center p-2 rounded-md bg-background">
                          <span className="text-lg font-semibold mb-1">{detail.character}</span>
                          <div
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              detail.score > 80
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : detail.score > 50
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            }`}
                          >
                            {detail.score}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="conversation" className="mt-0">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Practice a conversation with our AI tutor. Listen to the phrase, then respond naturally in Japanese.
                </p>
                <div className="p-4 rounded-lg bg-muted text-center">
                  <p>Conversation practice will be available soon!</p>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}

