"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"


export default function UserIconNavbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    setOpen(false)
    router.push("/login")
  }

  const handleClick = () => {
    if (!user) {
      router.push("/login")
    } else {
      setOpen(!open)
    }
  }

  return (
    <div className="relative">
      <User
        className="cursor-pointer text-black dark:text-white"
        strokeWidth='1'
        onClick={handleClick}
      />

      {/* Dropdown */}
      {open && user && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 font-sans"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
