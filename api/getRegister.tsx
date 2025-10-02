import { useState } from "react";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);


  async function register({
    username,
    email,
    password
  }: {
    username: string;
    email: string;
    password: string
  }) {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Error al registrar");
      }

      setSuccess(true);
      return data;
    } catch (err: any) {
      setError(err.message || "Error inesperado");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { register, loading, error, success };
}