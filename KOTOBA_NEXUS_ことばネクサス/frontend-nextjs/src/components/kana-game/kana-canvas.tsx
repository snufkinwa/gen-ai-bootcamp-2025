"use client"

import type React from "react"

import { forwardRef, useRef, useState, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Eraser, Send } from "lucide-react"

interface KanaCanvasProps {
  onSubmit: (imageData: string) => void
  isSubmitting: boolean
}

const KanaCanvas = forwardRef<HTMLCanvasElement, KanaCanvasProps>(({ onSubmit, isSubmitting }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // Forward the canvas ref
  useImperativeHandle(ref, () => canvasRef.current!)

  // Initialize canvas when component mounts
  useState(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext("2d")
      if (context) {
        context.lineWidth = 8
        context.lineCap = "round"
        context.lineJoin = "round"
        context.strokeStyle = "#000000"
      }
    }
  })

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext("2d")
      if (context) {
        const rect = canvas.getBoundingClientRect()
        let clientX, clientY

        if ("touches" in e) {
          clientX = e.touches[0].clientX
          clientY = e.touches[0].clientY
        } else {
          clientX = e.clientX
          clientY = e.clientY
        }

        context.beginPath()
        context.moveTo(clientX - rect.left, clientY - rect.top)
      }
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext("2d")
      if (context) {
        const rect = canvas.getBoundingClientRect()
        let clientX, clientY

        if ("touches" in e) {
          clientX = e.touches[0].clientX
          clientY = e.touches[0].clientY
        } else {
          clientX = e.clientX
          clientY = e.clientY
        }

        context.lineTo(clientX - rect.left, clientY - rect.top)
        context.stroke()
      }
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  // Clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext("2d")
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  // Submit the drawing
  const handleSubmit = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const imageData = canvas.toDataURL("image/png")
      onSubmit(imageData)
    }
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="w-full touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={clearCanvas} disabled={isSubmitting} className="flex-1">
          <Eraser className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
          {isSubmitting ? (
            <div className="h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full"></div>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit
            </>
          )}
        </Button>
      </div>
    </div>
  )
})

KanaCanvas.displayName = "KanaCanvas"

export default KanaCanvas

