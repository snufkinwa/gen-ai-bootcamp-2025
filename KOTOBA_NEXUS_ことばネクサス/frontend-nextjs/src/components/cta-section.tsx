"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section
      className="py-20 pt-[450px] mt-[-550px] z-[-1] relative 
   before:absolute before:inset-0 before:bg-[url('/ui/cta.png')] dark:before:bg-[url('/ui/dark-cta.png')] before:bg-fill before:bg-center before:bg-repeat before:opacity-30 before:z-[-1]"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-40 left-12 text-9xl font-bold text-primary font-yokomoji">
          あ
        </div>
        <div className="absolute bottom-12 right-12 text-9xl font-bold text-primary font-yokomoji">
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

            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10 pointer-events-auto">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
