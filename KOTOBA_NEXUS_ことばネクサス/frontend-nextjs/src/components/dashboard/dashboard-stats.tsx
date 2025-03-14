"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function DashboardStats() {
  // Mock data - in a real app, this would come from an API
  const stats = {
    daysStreak: 7,
    totalMinutes: 320,
    kanaLearned: 46,
    wordsLearned: 124,
    overallProgress: 35,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Track your Japanese learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Overall Progress</h3>
                <span className="text-sm text-muted-foreground">{stats.overallProgress}%</span>
              </div>
              <Progress value={stats.overallProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">{stats.daysStreak}</div>
                <div className="text-xs text-muted-foreground mt-1">Day Streak</div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">{stats.totalMinutes}</div>
                <div className="text-xs text-muted-foreground mt-1">Minutes Studied</div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">{stats.kanaLearned}</div>
                <div className="text-xs text-muted-foreground mt-1">Kana Learned</div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">{stats.wordsLearned}</div>
                <div className="text-xs text-muted-foreground mt-1">Words Learned</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

