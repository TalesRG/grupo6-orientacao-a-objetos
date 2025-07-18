"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
    isAuthenticated: boolean
    login: (email: string, password: string) => boolean
    logout: () => void
    user: { email: string } | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<{ email: string } | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const savedAuth = localStorage.getItem("auth")
        if (savedAuth) {
            const authData = JSON.parse(savedAuth)
            setIsAuthenticated(true)
            setUser(authData.user)
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated && pathname !== "/login") {
                router.push("/login")
            } else if (isAuthenticated && pathname === "/login") {
                router.push("/")
            }
        }
    }, [isAuthenticated, pathname, router, isLoading])

    const login = (email: string, password: string): boolean => {
        if (email && password) {
            const userData = { email }
            setIsAuthenticated(true)
            setUser(userData)

            localStorage.setItem("auth", JSON.stringify({ user: userData }))

            router.push("/")
            return true
        }
        return false
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
        localStorage.removeItem("auth")
        router.push("/login")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Carregando...</p>
                </div>
            </div>
        )
    }

    return <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
