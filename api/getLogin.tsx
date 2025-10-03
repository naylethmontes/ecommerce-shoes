import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false)

  async function loginUser({ identifier, password }: { identifier: string; password: string }) {
    setLoading(true);
    setError("");
    setSuccess(false)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          password
        }),
      });

      if (!res.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const data = await res.json();

      useAuth.getState().login({
        user: {
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
        },
        token: data.jwt, // el token real de Strapi
      });

      setSuccess(true);
      return data;
    } catch (error: unknown) {
      setLoading(false);
      setError("Error inesperado");
    } finally {
      setLoading(false)
    }
  }

  return { loginUser, loading, error, success };
}
