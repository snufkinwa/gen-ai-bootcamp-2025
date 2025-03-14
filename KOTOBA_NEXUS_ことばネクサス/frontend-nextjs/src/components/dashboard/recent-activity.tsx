"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Clock, Trophy, Star } from "lucide-react"

export default function RecentActivity() {
  // Mock data - in a real app, this would come from an API
  const activities = [
    {
      type: "achievement",
      title: "Perfect Score!",
      description: "You got 100% on hiragana あ row",
      time: "2 hours ago",
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    },
    {
      type: "practice",
      title: "Pronunciation Practice",
      description: "Completed basic greetings lesson",
      time: "Yesterday",
      icon: <Check className="h-5 w-5 text-green-500" />,
    },
    {
      type: "streak",
      title: "7 Day Streak!",
      description: "You've been learning for a week straight",
      time: "Today",
      icon: <Star className="h-5 w-5 text-orange-500" />,
    },
    {
      type: "practice",
      title: "Visual Novel",
      description: "Completed café conversation",
      time: "3 days ago",
      icon: <Check className="h-5 w-5 text-green-500" />,
    },
  ]

  // Recommended lessons
  const recommendations = ["Review katakana タ row", "Practice basic verb conjugations", "Learn common food vocabulary"]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest learning achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-muted rounded-full p-2 mt-0.5">{activity.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{activity.title}</h4>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recommended Next</CardTitle>
            <CardDescription>Personalized learning suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="bg-muted/50 p-3 rounded-md text-sm">
                  {recommendation}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}

