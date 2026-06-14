import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthGuard } from "@/components/layout/auth-guard"
import { AppLayout } from "@/components/layout/app-layout"
import { PublicLayout } from "@/components/layout/public-layout"
import { LoginPage } from "@/features/auth/pages/login-page"
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page"
import { TiposProgramaListPage } from "@/features/tipos-programa/pages/tipos-programa-list-page"
import { TiposProgramaCreatePage } from "@/features/tipos-programa/pages/tipos-programa-create-page"
import { FacultadesListPage } from "@/features/facultades/pages/facultades-list-page"
import { FacultadesCreatePage } from "@/features/facultades/pages/facultades-create-page"
import { CursosListPage } from "@/features/cursos/pages/cursos-list-page"
import { CursosCreatePage } from "@/features/cursos/pages/cursos-create-page"
import { ProgramasListPage } from "@/features/programas/pages/programas-list-page"
import { ProgramasCreatePage } from "@/features/programas/pages/programas-create-page"
import { ProgramasDetailPage } from "@/features/programas/pages/programas-detail-page"
import { ProgramasCursosListPage } from "@/features/programas-cursos/pages/programas-cursos-list-page"
import { ProgramasCursosCreatePage } from "@/features/programas-cursos/pages/programas-cursos-create-page"

function App() {
  return (
    <BrowserRouter>
    <TooltipProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<AuthGuard />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tipos-programa" element={<TiposProgramaListPage />} />
            <Route path="/tipos-programa/crear" element={<TiposProgramaCreatePage />} />
            <Route path="/facultades" element={<FacultadesListPage />} />
            <Route path="/facultades/crear" element={<FacultadesCreatePage />} />
            <Route path="/cursos" element={<CursosListPage />} />
            <Route path="/cursos/crear" element={<CursosCreatePage />} />
            <Route path="/programas" element={<ProgramasListPage />} />
            <Route path="/programas/crear" element={<ProgramasCreatePage />} />
            <Route path="/programas/:tipoSlug" element={<ProgramasListPage />} />
            <Route path="/programas/:tipoSlug/:slug" element={<ProgramasDetailPage />} />
            <Route path="/programas-cursos" element={<ProgramasCursosListPage />} />
            <Route path="/programas-cursos/crear" element={<ProgramasCursosCreatePage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster richColors position="bottom-right" />
    </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
