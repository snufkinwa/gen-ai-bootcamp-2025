"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type User = {
  id: string;
  name: string;
  email: string;
};

interface DashboardHeaderProps {
  user: User | null;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  // Get current date and time in Japan
  const now = new Date();
  const japanTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9 for Japan
  const formattedDate = japanTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = japanTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Determine greeting based on time of day in Japan
  const hour = japanTime.getHours();
  let greeting = "こんにちは"; // Hello (general)
  let greetingTranslation = "Hello";

  if (hour < 12) {
    greeting = "おはようございます";
    greetingTranslation = "Good morning";
  } else if (hour >= 17) {
    greeting = "こんばんは";
    greetingTranslation = "Good evening";
  }

  return (
    <Card className="border-none shadow-md bg-gradient-to-r from-primary/10 to-secondary/10">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-2"
            >
              <h1 className="text-3xl font-yokomoji">
                {greeting}, {user?.name?.split(" ")[0] || "Student"}!
              </h1>
              <p className="text-muted-foreground">{greetingTranslation}</p>
            </motion.div>
            <p className="text-muted-foreground">
              Welcome to your Japanese learning dashboard
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Japan Date: {formattedDate}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              <span>Japan Time: {formattedTime}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
