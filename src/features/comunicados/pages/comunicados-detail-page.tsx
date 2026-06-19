import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "@/components/shared/page-header"
import { ErrorState } from "@/components/shared/error-state"
import { useComunicado } from "@/hooks/queries/use-comunicados"

export function ComunicadosDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: comunicado, isLoading, isError, refetch } = useComunicado(slug!)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  if (isError || !comunicado) {
    return (
      <ErrorState
        message="No se pudo cargar el comunicado"
        onRetry={() => refetch()}
      />
    )
  }

  const fecha = new Date(comunicado.fechaPublicacion).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div>
      <PageHeader
        title={comunicado.titulo}
        breadcrumbs={[
          { label: "Comunicados", href: "/comunicados" },
          { label: comunicado.titulo },
        ]}
      />

      {comunicado.imagen && (
        <Card className="mb-4 overflow-hidden">
          <img
            src={comunicado.imagen}
            alt={comunicado.titulo}
            className="h-64 w-full object-cover"
          />
        </Card>
      )}

      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="size-4" />
        <span>{fecha}</span>
        <Badge variant="secondary" className="ml-2">
          {comunicado.slug}
        </Badge>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <span className="text-xs text-muted-foreground">Resumen</span>
            <p className="text-sm mt-1 text-muted-foreground">{comunicado.resumen}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Contenido</span>
            <div className="mt-1 whitespace-pre-line text-sm leading-relaxed">
              {comunicado.contenido}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="mt-4" onClick={() => navigate("/comunicados")}>
        <ArrowLeft />
        Volver a Comunicados
      </Button>
    </div>
  )
}
