"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { useAuth } from "@/components/auth-provider"

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { isAuthenticated } = useAuth()

    // Se estiver na página de login, não mostrar o layout com sidebar
    if (pathname === "/login") {
        return <>{children}</>
    }

    // Se não estiver autenticado, não mostrar nada (o AuthProvider vai redirecionar)
    if (!isAuthenticated) {
        return null
    }

    // Layout normal com sidebar para usuários autenticados
    return (
        <div className="flex h-screen bg-orange-50 dark:bg-gray-900">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-orange-50 dark:bg-gray-900">
                <div className="p-6">{children}</div>
            </main>
        </div>
    )
}