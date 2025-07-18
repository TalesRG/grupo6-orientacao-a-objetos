"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Users, Calendar, FileText, BarChart3, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
    { id: "/", label: "Dashboard", icon: BarChart3 },
    { id: "/locatarios", label: "Locatários", icon: Users },
    { id: "/locadoras", label: "Locadoras", icon: Building2 },
    { id: "/reservas", label: "Reservas", icon: Calendar },
    { id: "/relatorios", label: "Relatórios", icon: FileText },
]

export function Sidebar() {
    const pathname = usePathname()
    const { user, logout } = useAuth()

    return (
        <div className="w-64 bg-white dark:bg-gray-800 shadow-md border-r border-orange-200 dark:border-gray-700 flex flex-col">
            <div className="p-4">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Sistema de Locação</h1>
            </div>

            <nav className="mt-4 flex-1">
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

            {/* User Menu */}
            <div className="p-4 border-t border-orange-200 dark:border-gray-700">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start">
                            <User className="mr-2 h-4 w-4" />
                            <span className="truncate">{user?.email}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem disabled>
                            <User className="mr-2 h-4 w-4" />
                            {user?.email}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className="text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
