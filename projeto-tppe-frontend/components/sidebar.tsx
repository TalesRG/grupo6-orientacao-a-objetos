"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Users, Calendar, FileText, BarChart3 } from "lucide-react"

const menuItems = [
  { id: "/", label: "Dashboard", icon: BarChart3 },
  { id: "/locatarios", label: "Locatários", icon: Users },
  { id: "/locadoras", label: "Locadoras", icon: Building2 },
  { id: "/reservas", label: "Reservas", icon: Calendar },
  { id: "/relatorios", label: "Relatórios", icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md border-r border-orange-200 dark:border-gray-700">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Sistema de Locação</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.id

          return (
            <Link
              key={item.id}
              href={item.id}
              className={`w-full flex items-center px-4 py-2 text-left hover:bg-orange-50 dark:hover:bg-gray-700 ${
                isActive
                  ? "bg-orange-100 text-orange-600 border-r-2 border-orange-600 dark:bg-orange-900 dark:text-orange-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
