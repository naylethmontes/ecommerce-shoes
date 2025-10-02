"use client"

import { useRegister } from "@/api/getRegister"
import { useEffect, useState } from "react"

export default function RegisterForm({ changeToLogin }: { changeToLogin: () => void }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { register, loading, error, success } = useRegister()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await register({ username, email, password })
  }

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        changeToLogin()
      }, 2000);

      return () => clearTimeout(timeout)
    }
  }, [success, changeToLogin])


  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-sans">
      <div>
        <label htmlFor="username" className="block text-sm font-medium">Usuario</label>
        <input
          type="text"
          id="username"
          className="w-full border rounded px-3 py-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Correo electrónico</label>
        <input
          type="email"
          id="email"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
        <input
          type="password"
          id="password"
          className="w-full border rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50 dark:bg-gray-600 dark:hover:bg-gray-500"
        disabled={loading}
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>

      {success && <p className="text-green-600 font-sans">Registrado con éxito. Redirigiendo...</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  )
}
