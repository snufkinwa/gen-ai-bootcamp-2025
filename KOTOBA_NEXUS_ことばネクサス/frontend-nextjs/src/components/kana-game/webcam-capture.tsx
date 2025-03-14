"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Camera, RefreshCw } from "lucide-react"

interface WebcamCaptureProps {
  onCapture: (imageData: string) => void
  isCapturing: boolean
}

export default function WebcamCapture({ onCapture, isCapturing }: WebcamCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isActive, setIsActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Start the webcam
  const startWebcam = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })
      setStream(mediaStream)
      setIsActive(true)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Error accessing webcam:", error)
      alert("Unable to access webcam. Please ensure you have granted permission.")
    }
  }, [])

  // Stop the webcam
  const stopWebcam = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      setIsActive(false)

      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }, [stream])

  // Capture an image from the webcam
  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw the current video frame to the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to image data
        const imageData = canvas.toDataURL("image/png")
        onCapture(imageData)
      }
    }
  }, [onCapture])

  return (
    <div className="space-y-4">
      <div className="relative border rounded-lg overflow-hidden bg-black aspect-video">
        {isActive ? (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full bg-muted">
            <p className="text-muted-foreground">Webcam inactive</p>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex space-x-2">
        {isActive ? (
          <>
            <Button variant="outline" onClick={stopWebcam} disabled={isCapturing} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button onClick={captureImage} disabled={isCapturing} className="flex-1">
              {isCapturing ? (
                <div className="h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full"></div>
              ) : (
                <>
                  <Camera className="mr-2 h-4 w-4" />
                  Capture
                </>
              )}
            </Button>
          </>
        ) : (
          <Button onClick={startWebcam} disabled={isCapturing} className="w-full">
            <Camera className="mr-2 h-4 w-4" />
            Start Webcam
          </Button>
        )}
      </div>
    </div>
  )
}

