"use client"

import { toast } from "sonner";
import { useLogin } from "@/api/getLogin"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth";


export default function LoginForm() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const { loginUser, loading, error } = useLogin()
  const { user, token } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (token) {
      toast.success(`Ya has iniciado sesión como ${user?.username}`)
      router.push("/")
    }
  }, [token])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const result = await loginUser({ identifier, password })
    if (result) {
      toast.success(`Bienvenido a LunadeAbril, ${result.user.username}`);
      const redirectTo = localStorage.getItem("redirectAfterLogin");
      localStorage.removeItem("redirectAfterLogin");
      router.push(redirectTo || "/") // Redirige al home si el login fue exitoso
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-sans">
      <div>
        <label htmlFor="identifier" className="block text-sm font-medium">
          Correo o usuario
        </label>
        <input
          type="text"
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button type="submit"
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50 dark:bg-gray-600 dark:hover:bg-gray-500"
        disabled={loading}
      >
        {loading ? "Iniciando.." : "Iniciar sesion"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
