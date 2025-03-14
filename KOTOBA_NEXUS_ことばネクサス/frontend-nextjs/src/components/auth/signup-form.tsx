"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock } from "lucide-react";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    try {
      // Simulate signup success
      login({
        id: "user-" + Date.now(),
        name: name,
        email: email,
      });

      router.push("/dashboard");
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-8 text-center md:text-left">
        Register
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="pl-10 pr-4 py-2 bg-gray-100 border-none"
            required
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
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

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="pl-10 pr-4 py-2 bg-gray-100 border-none"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(!!checked)}
            required
          />
          <Label
            htmlFor="terms"
            className="text-sm font-normal text-muted-foreground"
          >
            I agree to the{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>

        <Button type="submit" className="w-full bg-primary text-white py-6">
          Create Account
        </Button>

        <div className="text-center text-sm text-muted-foreground mt-4">
          or register with social platforms
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
