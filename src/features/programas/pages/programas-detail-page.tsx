import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "@/components/shared/page-header"
import { ErrorState } from "@/components/shared/error-state"
import { usePrograma } from "@/hooks/queries/use-programas"

export function ProgramasDetailPage() {
  const { tipoSlug, slug } = useParams<{ tipoSlug: string; slug: string }>()
  const navigate = useNavigate()
  const { data: programa, isLoading, isError, refetch } = usePrograma(slug!)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  if (isError || !programa) {
    return (
      <ErrorState
        message="No se pudo cargar el programa"
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <div>
      <PageHeader
        title={programa.nombre}
        breadcrumbs={[
          { label: "Programas", href: "/programas" },
          { label: programa.idTipoPrograma.nombre, href: `/programas/${tipoSlug}` },
          { label: programa.nombre },
        ]}
      />

      {programa.imagen && (
        <Card className="mb-4 overflow-hidden">
          <img
            src={programa.imagen}
            alt={programa.nombre}
            className="h-48 w-full object-cover"
          />
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-xs text-muted-foreground">ID</span>
              <p className="text-sm font-medium">{programa.id}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Slug</span>
              <p className="text-sm font-medium">{programa.slug}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Modalidad</span>
              <p>
                <Badge variant={programa.modalidad === "PRESENCIAL" ? "default" : "secondary"}>
                  {programa.modalidad}
                </Badge>
              </p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Convocatoria</span>
              <p>
                <Badge variant={programa.convocatoria ? "default" : "outline"}>
                  {programa.convocatoria ? "Abierta" : "Cerrada"}
                </Badge>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Relaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-xs text-muted-foreground">Tipo de Programa</span>
              <p className="text-sm font-medium">{programa.idTipoPrograma.nombre}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Facultad</span>
              <p className="text-sm font-medium">{programa.idFacultad.nombre}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Información Académica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="text-xs text-muted-foreground">Objetivo General</span>
            <p className="text-sm mt-1 whitespace-pre-line">{programa.objetivoGeneral}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Objetivos Específicos</span>
            <p className="text-sm mt-1 whitespace-pre-line">{programa.objetivosEspecificos}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Perfil del Posgraduado</span>
            <p className="text-sm mt-1 whitespace-pre-line">{programa.perfilPosgraduado}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Líneas de Investigación</span>
            <p className="text-sm mt-1 whitespace-pre-line">{programa.lineasInvestigacion}</p>
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="mt-4" onClick={() => navigate(`/programas/${tipoSlug}`)}>
        <ArrowLeft />
        Volver a {tipoSlug ? programa.idTipoPrograma.nombre : "Programas"}
      </Button>
    </div>
  )
}
