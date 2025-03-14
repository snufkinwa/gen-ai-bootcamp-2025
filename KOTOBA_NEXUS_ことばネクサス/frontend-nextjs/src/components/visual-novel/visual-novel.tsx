"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Mic, Send, VolumeIcon as VolumeUp, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Character = {
  id: string
  name: string
  image: string
}

type DialogueEntry = {
  character: string
  text: string
  translation?: string
}

type Scene = {
  id: string
  background: string
  characters: Character[]
  dialogue: DialogueEntry[]
}

export default function VisualNovelComponent() {
  const [currentScene, setCurrentScene] = useState<Scene>({
    id: "cafe",
    background: "/placeholder.svg?height=600&width=1200",
    characters: [
      {
        id: "tanaka",
        name: "田中さん",
        image: "/placeholder.svg?height=500&width=300",
      },
    ],
    dialogue: [
      {
        character: "田中さん",
        text: "こんにちは！カフェへようこそ。何を飲みたいですか？",
        translation: "Hello! Welcome to the cafe. What would you like to drink?",
      },
    ],
  })

  const [userInput, setUserInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)
  const [inputMode, setInputMode] = useState<"text" | "voice">("text")

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<BlobPart[]>([])
  const dialogueEndRef = useRef<HTMLDivElement>(null)

  // Start voice recording
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

        // Convert to base64 for API submission
        const reader = new FileReader()
        reader.readAsDataURL(audioBlob)
        reader.onloadend = async () => {
          const base64Audio = reader.result as string

          // Process speech to text and send to API
          setIsLoading(true)
          try {
            // This would be a real API call in production
            setTimeout(() => {
              setUserInput("おちゃをください")
              setIsLoading(false)
            }, 1500)
          } catch (error) {
            console.error("Error processing speech:", error)
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

  // Stop voice recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim() || isLoading) return

    // Add user's message to dialogue
    const updatedDialogue = [
      ...currentScene.dialogue,
      {
        character: "あなた",
        text: userInput,
      },
    ]

    setCurrentScene({
      ...currentScene,
      dialogue: updatedDialogue,
    })

    setUserInput("")
    setIsLoading(true)

    try {
      // In a real app, this would call the API
      // For now, we'll simulate with a timeout
      setTimeout(() => {
        const response = {
          character: "田中さん",
          text: "はい、お茶ですね。少々お待ちください。",
          translation: "Yes, tea. Please wait a moment.",
        }

        setCurrentScene({
          ...currentScene,
          dialogue: [...updatedDialogue, response],
        })
        setIsLoading(false)

        // Scroll to bottom of dialogue
        setTimeout(() => {
          dialogueEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }, 1500)
    } catch (error) {
      console.error("Error generating response:", error)
      setIsLoading(false)
    }
  }

  // Play text-to-speech audio
  const playAudio = (text: string) => {
    // In a real app, this would call a text-to-speech API
    console.log("Playing audio for:", text)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        {/* Visual Novel Scene */}
        <div className="relative rounded-lg overflow-hidden aspect-video bg-black">
          <img
            src={currentScene.background || "/placeholder.svg"}
            alt="Scene background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Characters */}
          <div className="absolute inset-0 flex items-end justify-center">
            {currentScene.characters.map((character) => (
              <motion.div
                key={character.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-4/5 relative"
              >
                <img
                  src={character.image || "/placeholder.svg"}
                  alt={character.name}
                  className="h-full w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>

          {/* Dialogue Box */}
          <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4 rounded-t-lg">
            <div className="flex items-start mb-2">
              <div className="font-bold text-lg mr-2">
                {currentScene.dialogue[currentScene.dialogue.length - 1]?.character}:
              </div>
              <div className="flex-1">
                <div className="text-lg">{currentScene.dialogue[currentScene.dialogue.length - 1]?.text}</div>
                {showTranslation && currentScene.dialogue[currentScene.dialogue.length - 1]?.translation && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {currentScene.dialogue[currentScene.dialogue.length - 1]?.translation}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => playAudio(currentScene.dialogue[currentScene.dialogue.length - 1]?.text)}
                className="ml-2"
              >
                <VolumeUp className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Dialogue History */}
        <Card className="p-4 max-h-60 overflow-y-auto">
          <div className="space-y-4">
            {currentScene.dialogue.map((entry, index) => (
              <div key={index} className="flex">
                <div className="font-bold mr-2 min-w-[80px]">{entry.character}:</div>
                <div className="flex-1">
                  <div>{entry.text}</div>
                  {showTranslation && entry.translation && (
                    <div className="text-sm text-muted-foreground mt-1">{entry.translation}</div>
                  )}
                </div>
              </div>
            ))}
            <div ref={dialogueEndRef} />
          </div>
        </Card>

        {/* Input Area */}
        <div className="flex items-center space-x-2">
          <Tabs value={inputMode} onValueChange={(value) => setInputMode(value as "text" | "voice")} className="flex-1">
            <div className="flex items-center">
              <TabsList className="mr-2">
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="voice">Voice</TabsTrigger>
              </TabsList>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowTranslation(!showTranslation)}
                className="mr-2"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            <TabsContent value="text" className="mt-0">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="日本語で入力してください..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={!userInput.trim() || isLoading}>
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full"></div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="voice" className="mt-0">
              <div className="flex justify-center">
                <Button
                  size="lg"
                  variant={isRecording ? "destructive" : "default"}
                  className={`h-16 w-16 rounded-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isLoading}
                >
                  <Mic className="h-6 w-6" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

