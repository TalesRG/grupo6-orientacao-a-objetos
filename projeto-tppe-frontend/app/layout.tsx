import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Locação",
  description: "Sistema de gerenciamento de locação de veículos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex h-screen bg-orange-50 dark:bg-gray-900">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-orange-50 dark:bg-gray-900">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
