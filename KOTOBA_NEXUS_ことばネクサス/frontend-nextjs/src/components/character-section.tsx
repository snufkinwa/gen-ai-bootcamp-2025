"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const CLOUD_FRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;

const characters = [
  {
    id: 1,
    name: "高橋大和 (Takahashi Yamato)",
    title: "Writing Instructor",
    rating: 5,
    image: `${CLOUD_FRONT_URL}/character/1.png`,
    description:
      "Expert in kana, hiragana and kanji. Dedicated to teaching precise writing techniques and stroke order for beautiful Japanese script.",
    color: "primary",
  },
  {
    id: 2,
    name: "ピイ (Pii)",
    title: "Speed Learning Coach",
    rating: 5,
    image: `${CLOUD_FRONT_URL}/character/2.png`,
    description:
      "A cheerful language instructor specializing in everyday conversation. She'll help you speak Japanese naturally in daily situations.",
    color: "cherry-pink",
  },
  {
    id: 3,
    name: "黒 (Kuro)",
    title: "Slang Specialist",
    rating: 4,
    image: `${CLOUD_FRONT_URL}/character/3-color.png`,
    description:
      "Cool and casual, Kuro knows all the latest Japanese slang and youth expressions to keep your Japanese current.",
    color: "cherry-sky",
  },
  {
    id: 4,
    name: "緑 真律 (Midori Maritsu)",
    title: "Formal Language Expert",
    rating: 5,
    image: `${CLOUD_FRONT_URL}/character/5-color.png`,
    description:
      "Elegant and proper, Midori teaches formal Japanese for business settings and traditional contexts.",
    color: "cherry-blush",
  },
];

export default function CharacterSection() {
  const [activeCharacter, setActiveCharacter] = useState(characters[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const constraintsRef = useRef(null);

  // Function to handle zoom toggle
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-visible">
      {/* Background decoration with vertical extension only */}
      <div className="absolute inset-0 -top-16  -bottom-16 right-0 left-0 z-0 opacity-20 pointer-events-none">
        <Image
          src={`${CLOUD_FRONT_URL}/ui/herosakura.png`}
          alt="Cherry blossom background"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-lazy-dog section-title">
          Meet Your Language Companions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center">
          {/* Character Info - LEFT SIDE */}
          <div className="md:col-span-3 order-2 md:order-1">
            <Card className="relative bg-card/80 backdrop-blur-sm border border-primary/20 overflow-hidden h-full">
              {/* Character Info Content */}
              <CardContent className="p-6">
                <motion.div
                  key={activeCharacter.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {activeCharacter.name}
                  </h3>

                  {/* Star rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < activeCharacter.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Title badge */}
                  <div className="flex items-center mb-4 space-x-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <svg
                        className="h-6 w-6 text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {activeCharacter.title}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">
                    {activeCharacter.description}
                  </p>
                </motion.div>
              </CardContent>

              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40"></div>
            </Card>
          </div>

          {/* Character Image - CENTER */}
          <div
            className="md:col-span-6 order-1 md:order-2 relative min-h-[500px]"
            ref={constraintsRef}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCharacter.id}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className={`relative cursor-pointer ${
                    isZoomed ? "scale-150 origin-center" : ""
                  }`}
                  whileHover={{ scale: isZoomed ? 1 : 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={toggleZoom}
                >
                  <Image
                    src={activeCharacter.image}
                    alt={activeCharacter.name}
                    width={400}
                    height={600}
                    className="h-auto w-auto max-h-[500px]"
                    priority
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Floating Japanese characters */}
            <motion.div
              className="absolute top-10 left-10 text-4xl text-primary/30 font-yokomoji"
              animate={{
                y: [0, -15, 0],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              あ
            </motion.div>
            <motion.div
              className="absolute bottom-10 right-20 text-5xl text-[hsl(var(--cherry-pink))]/50 font-yokomoji"
              animate={{
                y: [0, 20, 0],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              ネ
            </motion.div>
          </div>

          {/* Character Selector - RIGHT SIDE */}
          <div className="md:col-span-3 order-3 md:order-3 flex flex-row md:flex-col items-center justify-center md:items-start space-x-3 md:space-x-0 md:space-y-4">
            {characters.map((character) => (
              <motion.div
                key={character.id}
                className={`relative cursor-pointer group`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setActiveCharacter(character);
                  setIsZoomed(false);
                }}
              >
                {/* Character avatar */}
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 
                  ${
                    activeCharacter.id === character.id
                      ? "border-primary"
                      : "border-white/20 group-hover:border-white/50"
                  }`}
                >
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full object-top"
                  />
                </div>

                {/* Active indicator */}
                {activeCharacter.id === character.id && (
                  <motion.div
                    className="absolute -inset-1.5 rounded-full border-2 border-primary/50"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 0.5, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}

                {/* Name tooltip on hover (desktop) */}
                <div className="hidden md:block absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-sm px-2 py-1 rounded pointer-events-none">
                  {character.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 bg-[hsl(var(--cherry-pink))]/10 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-32 -left-20 w-80 h-80 bg-[hsl(var(--cherry-sky))]/10 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </section>
  );
}
