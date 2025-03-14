"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Github } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      // Simulate login
      login({
        id: "user-123",
        name: email.split("@")[0],
        email: email,
      });

      router.push("/dashboard");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-8 text-center md:text-left">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username"
            className="pl-10 pr-4 py-2 bg-gray-100 border-none"
            required
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="pl-10 pr-4 py-2 bg-gray-100 border-none"
            required
          />
        </div>

        <div className="text-right">
          <Button variant="link" className="text-sm p-0 h-auto" asChild>
            <a href="#">Forgot Password?</a>
          </Button>
        </div>

        <Button type="submit" className="w-full bg-primary text-white py-6">
          Login
        </Button>

        <div className="text-center text-sm text-muted-foreground mt-4">
          or login with social platforms
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <a
            href="#"
            className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <img src="/Google.svg" />
          </a>
        </div>
      </form>
    </div>
  );
}
