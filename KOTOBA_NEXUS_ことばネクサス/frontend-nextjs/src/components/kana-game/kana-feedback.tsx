"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, X, ArrowRight } from "lucide-react"

interface KanaFeedbackProps {
  correct: boolean
  score: number
  message: string
  onNext: () => void
}

export default function KanaFeedback({ correct, score, message, onNext }: KanaFeedbackProps) {
  return (
    <motion.div
      className={`p-4 rounded-lg ${correct ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-2">
        {correct ? (
          <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
            <Check className="h-5 w-5 text-white" />
          </div>
        ) : (
          <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center mr-3">
            <X className="h-5 w-5 text-white" />
          </div>
        )}
        <h3 className="text-lg font-semibold">{correct ? "Correct!" : "Not quite right"}</h3>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${correct ? "bg-green-500" : "bg-amber-500"}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm font-medium">{score}%</span>
        </div>
        <p className="text-sm">{message}</p>
      </div>

      <Button onClick={onNext} className="w-full">
        Next Kana
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  )
}

