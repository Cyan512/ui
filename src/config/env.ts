export const env = {
  VITE_API_URL: import.meta.env.VITE_API_URL as string,
} as const

if (!env.VITE_API_URL) {
  throw new Error("VITE_API_URL is not defined in .env")
}
