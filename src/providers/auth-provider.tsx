import { useState, useCallback, type ReactNode } from "react"
import type { User } from "@/types/auth"
import { AuthContext } from "./auth-context"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
  )
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  )

  const login = useCallback((email: string) => {
    const mockToken = "mock-token-" + Date.now()
    const mockUser: User = {
      nombre: "Administrador",
      email,
      rol: "admin",
    }
    localStorage.setItem("token", mockToken)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setToken(mockToken)
    setUser(mockUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
