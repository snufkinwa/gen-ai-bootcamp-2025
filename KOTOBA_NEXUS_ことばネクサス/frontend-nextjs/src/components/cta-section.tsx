"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function CallToActionSection() {
  return (
    <section className="py-20 pt-[450px] mt-[-550px] z-[-1] bg-background relative">
      {/* Pattern background - same as before but will now extend higher up */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/cta.png')] bg-repeat opacity-10 dark:opacity-0"></div>
        <div className="absolute inset-0 bg-[url('/dark-cta.png')] bg-repeat opacity-0 dark:opacity-20"></div>
      </div>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-40 left-12 text-9xl font-bold text-primary font-yokomoji">
          あ
        </div>
        <div className="absolute bottom-12 right-12 text-9xl font-bold text-primary font-yokomoji ">
          ア
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-lazy-dog section-title">
              <span className="font-yokomoji">「夢に向かって！」</span>
              <br />
              fluency awaits
            </h2>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of students already experiencing our AI-powered
              language learning platform. Your first lesson is completely free.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/signup">Start Free Trial</Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                asChild
              >
                <Link href="/kana-game">Try Kana Game</Link>
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap justify-center gap-8 items-center">
                <div className="flex items-center">
                  <div className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">AI-Powered Feedback</div>
                    <div className="text-sm text-muted-foreground">
                      Real-time corrections
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Learn at Your Pace</div>
                    <div className="text-sm text-muted-foreground">
                      5-15 minute daily sessions
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Growing Community</div>
                    <div className="text-sm text-muted-foreground">
                      10,000+ active learners
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
