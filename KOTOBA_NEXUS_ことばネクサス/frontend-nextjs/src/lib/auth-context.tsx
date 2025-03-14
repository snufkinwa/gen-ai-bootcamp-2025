"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
}

// Default context value
const defaultContextValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: false, // Changed to false by default
  login: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    try {
      // Only run in browser environment
      if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      }
    } catch (error) {
      console.error("Failed to parse saved user:", error)
      if (typeof window !== "undefined") {
        localStorage.removeItem("user")
      }
    } finally {
      // Always set loading to false after checking
      setIsLoading(false)
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData))
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

