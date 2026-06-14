export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  timestamp: number
}

export interface ApiErrorData {
  [field: string]: string
}
