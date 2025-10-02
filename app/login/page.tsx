"use client"
import { useState } from "react"
import LoginForm from "./loginForm"
import RegisterForm from "./registerForm"

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login")

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <div className="flex mb-6 border-b font-serif">
        <button
          onClick={() => setTab("login")}
          className={`flex-1 py-2 text-center font-medium  ${tab === "login" ? "border-b-2 border-black" : "text-gray-500"}`}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => setTab("register")}
          className={`flex-1 py-2 text-center font-medium ${tab === "register" ? "border-b-2 border-black" : "text-gray-500"}`}
        >
          Registrarse
        </button>
      </div>

      {tab === "login" ? <LoginForm /> :
        <RegisterForm changeToLogin={() => setTab("login")} />}
    </div>
  )
}
