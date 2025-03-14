"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onUpload: (imageData: string) => void
  isUploading: boolean
}

export default function ImageUpload({ onUpload, isUploading }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setPreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Clear the selected image
  const clearImage = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Submit the image
  const handleSubmit = () => {
    if (preview) {
      onUpload(preview)
    }
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden bg-muted aspect-video relative">
        {preview ? (
          <>
            <Image src={preview || "/placeholder.svg"} alt="Uploaded kana" fill className="object-contain" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={clearImage}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-center">Drag and drop an image, or click to browse</p>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex-1"
        >
          <Upload className="mr-2 h-4 w-4" />
          Browse
        </Button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

        <Button onClick={handleSubmit} disabled={!preview || isUploading} className="flex-1">
          {isUploading ? (
            <div className="h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full"></div>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  )
}

