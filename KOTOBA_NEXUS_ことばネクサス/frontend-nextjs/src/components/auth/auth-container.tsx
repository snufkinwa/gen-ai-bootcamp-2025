"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "@/components/auth/login-form";
import SignupForm from "@/components/auth/signup-form";

export default function AuthContainer() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(pathname === "/login");

  // Animation states
  const [animationPhase, setAnimationPhase] = useState(0);
  // 0 = initial state
  // 1 = expanding color panel
  // 2 = contracting color panel to opposite side

  // If the URL changes, update the form state
  useEffect(() => {
    setIsLogin(pathname === "/login");
    setAnimationPhase(0);
  }, [pathname]);

  const handleFormSwitch = (toLogin: boolean) => {
    if (animationPhase !== 0 || toLogin === isLogin) return;

    // Start animation
    setAnimationPhase(1);

    // Phase 1: Expand color panel (300ms)
    setTimeout(() => {
      setAnimationPhase(2);

      // Phase 2: Contract to opposite side (300ms)
      setTimeout(() => {
        // Navigate to the new route
        router.push(toLogin ? "/login" : "/signup");
        setAnimationPhase(0);
      }, 300);
    }, 300);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-white relative h-[600px]">
      {/* Fixed split container */}
      <div className="absolute inset-0 flex">
        {/* Left half - Always contains the login form */}
        <div className="w-1/2 h-full">
          <div
            className={`w-full h-full ${
              isLogin ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
            style={{
              zIndex: isLogin ? 2 : 0,
              transitionDelay: isLogin ? "300ms" : "0ms",
              pointerEvents: isLogin ? "auto" : "none",
            }}
          >
            {isLogin && (
              <div className="p-10 w-full h-full">
                <LoginForm />
              </div>
            )}
          </div>
        </div>

        {/* Right half - Always contains the signup form */}
        <div className="w-1/2 h-full">
          <div
            className={`w-full h-full ${
              !isLogin ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
            style={{
              zIndex: !isLogin ? 2 : 0,
              transitionDelay: !isLogin ? "300ms" : "0ms",
              pointerEvents: !isLogin ? "auto" : "none",
            }}
          >
            {!isLogin && (
              <div className="p-10 w-full h-full">
                <SignupForm />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Colored panel - starts at right half, moves to left half when switching */}
      <motion.div
        className="absolute inset-0 bg-primary"
        initial={false}
        animate={{
          x:
            animationPhase === 0
              ? isLogin
                ? "100%"
                : "0%"
              : animationPhase === 1
              ? "0%"
              : isLogin
              ? "0%"
              : "100%",
          width: animationPhase === 1 ? "100%" : "50%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        style={{ zIndex: 1 }} // Keeps it between the active/inactive forms
      >
        {/* Login panel content - shown when on right side */}
        <AnimatePresence>
          {isLogin && animationPhase === 0 && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-xs">
                <h1 className="text-3xl md:text-2xl font-bold mb-4">
                  こんにちは、ようこそ!
                </h1>

                <p className="mb-8">Don't have an account?</p>
                <button
                  onClick={() => handleFormSwitch(false)}
                  className="px-8 py-2 border-2 border-white rounded-full text-white font-medium hover:bg-white hover:text-primary transition-colors"
                >
                  Register
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Signup panel content - shown when on left side */}
        <AnimatePresence>
          {!isLogin && animationPhase === 0 && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-xs">
                <h1 className="text-3xl md:text-2xl font-bold mb-4">
                  いっしょに、しようよ！
                </h1>
                <p className="mb-8">Already have an account?</p>
                <button
                  onClick={() => handleFormSwitch(true)}
                  className="px-8 py-2 border-2 border-white rounded-full text-white font-medium hover:bg-white hover:text-primary transition-colors"
                >
                  Login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
