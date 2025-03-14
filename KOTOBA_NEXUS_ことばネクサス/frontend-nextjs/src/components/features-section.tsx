"use client";

import { motion } from "framer-motion";
import { Brush, Mic, BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const features = [
  {
    icon: <Brush className="h-10 w-10 text-primary" />,
    title: "Kana Writing Game",
    description:
      "Practice writing hiragana and katakana with real-time AI feedback. Use your webcam, upload images, or draw directly.",
    link: "/kana-game",
  },
  {
    icon: <Mic className="h-10 w-10 text-primary" />,
    title: "Pronunciation Practice",
    description:
      "Improve your Japanese pronunciation with AI-powered feedback. Practice with real-world examples from YouTube videos.",
    link: "/pronunciation",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: "Visual Novel Experience",
    description:
      "Immerse yourself in interactive Japanese conversations. Practice speaking and listening in realistic scenarios.",
    link: "/visual-novel",
  },
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-lazy-dog section-title">
            Interactive Learning Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered tools help you master Japanese through engaging,
            interactive experiences.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link href={feature.link} className="block h-full">
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-3xl font-lazy-dog section-title">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
