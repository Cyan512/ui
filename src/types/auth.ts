export interface User {
  id?: number
  nombre: string
  email: string
  rol: string
}

export interface LoginRequest {
  email: string
  password: string
}
