"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CLOUD_FRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;

interface Character {
  name: string;
  outline: string;
  color: string;
  message: string;
}

const characterMessages: Character[] = [
  {
    name: "高橋先生",
    outline: `${CLOUD_FRONT_URL}/character/22.png`,
    color: `${CLOUD_FRONT_URL}/character/23.png`,
    message: "Hey, don't forget about the festival!",
  },
  {
    name: "ピイ",
    outline: `${CLOUD_FRONT_URL}/character/25.png`,
    color: `${CLOUD_FRONT_URL}/character/14.png`,
    message: "Pop quiz time! Are you ready?",
  },
  {
    name: "黒",
    outline: `${CLOUD_FRONT_URL}/character/17.png`,
    color: `${CLOUD_FRONT_URL}/character/24.png`,
    message: "Congratulations! You nailed that test!",
  },
];

const CharacterPopup = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Prevent multiple triggers
    if (timeoutRef.current) return;

    // Pick a random character
    const randomCharacter =
      characterMessages[Math.floor(Math.random() * characterMessages.length)];
    setCharacter(randomCharacter);

    // Show popup after a delay for smooth appearance
    timeoutRef.current = setTimeout(() => setVisible(true), 500);

    // Auto-dismiss after 10 seconds
    const hideTimer = setTimeout(() => dismiss(), 10000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(timeoutRef.current!);
      timeoutRef.current = null;
    };
  }, []);

  const dismiss = () => {
    setDismissing(true);
    setTimeout(() => {
      setVisible(false);
      setDismissing(false);
    }, 1000); // Matches exit duration for smoothness
  };

  if (!character || !visible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="character-popup"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed bottom-0 right-0 z-50 flex items-end space-x-2"
      >
        {/* Speech Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: dismissing ? 0 : 1,
            scale: dismissing ? 0.8 : 1,
            y: dismissing ? 20 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative bottom-40 bg-white dark:bg-gray-800 text-black dark:text-white text-sm px-6 py-3 rounded-lg shadow-lg max-w-xs"
        >
          <Button
            size="icon"
            variant="ghost"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={dismiss}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Dismiss</span>
          </Button>
          <p className="mb-1 font-medium">{character.name}</p>
          <p>{character.message}</p>

          {/* Speech bubble tail (adjusted to be below) */}
          <div className="absolute -right-2 bottom-4 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45"></div>
        </motion.div>

        {/* Character Images (Outline → Color Transition) */}
        <motion.div
          className="relative w-[250px] h-[350px]"
          initial={{ y: 40 }}
          animate={{
            y: dismissing ? 40 : 0,
            opacity: dismissing ? 0 : 1,
            scale: dismissing ? 0.9 : 1,
          }}
          exit={{ opacity: 0, y: 50, scale: 0.85 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.img
            src={character.outline}
            alt={`${character.name} Outline`}
            className="absolute bottom-0 left-0 w-full h-full"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <motion.img
            src={character.color}
            alt={`${character.name} Color`}
            className="absolute bottom-0 left-0 w-full h-full object-contain"
            initial={{ opacity: 0, filter: "grayscale(100%)" }}
            animate={{ opacity: 1, filter: "grayscale(0%)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Subtle floating animation */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              y: ["0%", "-2%", "0%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CharacterPopup;
