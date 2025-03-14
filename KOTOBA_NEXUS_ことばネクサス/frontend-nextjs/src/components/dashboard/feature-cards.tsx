"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Brush, Mic, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function FeatureCards() {
  // Mock data - in a real app, this would come from an API
  const features = [
    {
      title: "Kana Writing Game",
      description: "Practice writing hiragana and katakana with real-time AI feedback",
      icon: <Brush className="h-8 w-8 text-primary" />,
      progress: 65,
      link: "/kana-game",
      lastActivity: "2 hours ago",
      nextLesson: "Practice katakana ナ, ニ, ヌ, ネ, ノ",
    },
    {
      title: "Pronunciation Practice",
      description: "Improve your Japanese pronunciation with AI-powered feedback",
      icon: <Mic className="h-8 w-8 text-primary" />,
      progress: 42,
      link: "/pronunciation",
      lastActivity: "Yesterday",
      nextLesson: "Practice basic greetings",
    },
    {
      title: "Visual Novel Experience",
      description: "Immerse yourself in interactive Japanese conversations",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      progress: 28,
      link: "/visual-novel",
      lastActivity: "3 days ago",
      nextLesson: "Café conversation scenario",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <h2 className="text-2xl font-bold">Learning Activities</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div key={index} variants={item}>
            <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  {feature.icon}
                  <div className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                    {feature.lastActivity}
                  </div>
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{feature.progress}%</span>
                    </div>
                    <Progress value={feature.progress} className="h-2" />
                  </div>

                  <div className="bg-muted/50 p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-1">Next Lesson</h4>
                    <p className="text-sm text-muted-foreground">{feature.nextLesson}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={feature.link}>Continue Learning</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

