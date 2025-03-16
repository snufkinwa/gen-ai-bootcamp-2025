"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CombinedSectionBreak from "@/components/section-break";

const CLOUD_FRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;

const blogPosts = [
  {
    id: 1,
    title: "5 Effective Techniques for Mastering Japanese Particles",
    excerpt:
      "Learn the secrets to understanding は, が, を, and other challenging particles with our proven methods.",
    date: "March 10, 2025",
    author: "Tanaka Yuki",
    category: "Grammar Tips",
    imageUrl: `${CLOUD_FRONT_URL}/ui/blog1.png?height=200&width=400`,
  },
  {
    id: 2,
    title: "The Ultimate Guide to JLPT N3 Preparation",
    excerpt:
      "A comprehensive roadmap to help you successfully pass the JLPT N3 exam with confidence.",
    date: "March 5, 2025",
    author: "Suzuki Akira",
    category: "JLPT",
    imageUrl: `${CLOUD_FRONT_URL}/ui/blog2.png?height=200&width=400`,
  },
  {
    id: 3,
    title: "Learning Japanese Through Anime: Benefits and Pitfalls",
    excerpt:
      "Discover how anime can be a valuable learning tool and what to watch out for when learning this way.",
    date: "February 28, 2025",
    author: "Watanabe Mei",
    category: "Culture",
    imageUrl: `${CLOUD_FRONT_URL}/ui/blog3.png?height=200&width=400`,
  },
];

export default function BlogSection() {
  return (
    <div className="relative w-full flex flex-col items-center pb-50">
      <div className="relative w-full h-full">
        <CombinedSectionBreak />
      </div>

      {/* Blog Section - Overlapping the Torii Gate */}
      <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl z-10  p-10 ">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-lazy-dog section-title">
            Latest from our Blog
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and resources to enhance your Japanese learning
            journey.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-md">
                    {post.category}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2 hover:text-primary transition-colors">
                    <Link href="#">{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base mb-4 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t pt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                    asChild
                  >
                    <Link href="#">Read more</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="#">View all articles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
