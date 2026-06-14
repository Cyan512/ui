import { createContext } from "react"
import type { User } from "@/types/auth"

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string) => void
  logout: () => void
}

const storedUser = localStorage.getItem("user")
const storedToken = localStorage.getItem("token")

export const AuthContext = createContext<AuthState>({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  isAuthenticated: !!storedToken,
  login: () => {},
  logout: () => {},
})
