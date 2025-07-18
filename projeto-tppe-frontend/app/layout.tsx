import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { ProtectedLayout } from "@/components/protected-layout"
import {Metadata} from "next";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Locação",
  description: "Sistema de gerenciamento de locação de veículos",
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="pt-BR">
      <body className={inter.className}>
      <AuthProvider>
        <ProtectedLayout>{children}</ProtectedLayout>
      </AuthProvider>
      </body>
      </html>
  )
}
