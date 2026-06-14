import { Outlet } from "react-router-dom"

export function PublicLayout() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-4">
      <Outlet />
    </div>
  )
}
