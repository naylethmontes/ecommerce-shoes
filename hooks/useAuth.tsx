import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  username: string;
  email: string;
  //token: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (data: { user: User; token: string }) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: ({ user, token }) =>
        set({
          user,   // guarda id, username, email
          token,  // guarda el jwt
        }),
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("auth-storage"); // eliminamos el storage completo
      },
    }),
    {
      name: "auth-storage", // clave de persistencia
    }
  )
);
