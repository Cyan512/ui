import {
  FileType,
  Building2,
  BookOpen,
  GraduationCap,
  Link2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useTiposPrograma } from "@/hooks/queries/use-tipos-programa"
import { useFacultades } from "@/hooks/queries/use-facultades"
import { useCursos } from "@/hooks/queries/use-cursos"
import { useProgramas } from "@/hooks/queries/use-programas"
import { useProgramasCursos } from "@/hooks/queries/use-programas-cursos"

const cards = [
  { label: "Tipos de Programa", icon: FileType, hook: useTiposPrograma, href: "/tipos-programa" },
  { label: "Facultades", icon: Building2, hook: useFacultades, href: "/facultades" },
  { label: "Cursos", icon: BookOpen, hook: useCursos, href: "/cursos" },
  { label: "Programas", icon: GraduationCap, hook: useProgramas, href: "/programas" },
  { label: "Asociaciones", icon: Link2, hook: useProgramasCursos, href: "/programas-cursos" },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Panel de Control</h1>
        <p className="text-sm text-muted-foreground">
          Resumen del sistema de gestión académica
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => {
          const { data, isLoading } = card.hook()
          return (
            <Card key={card.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
                <card.icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{data?.length ?? 0}</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
