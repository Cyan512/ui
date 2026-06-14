import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Eye, Plus, Search, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable, type ColumnDef } from "@/components/shared/data-table"
import { useFacultades } from "@/hooks/queries/use-facultades"
import { useTiposPrograma } from "@/hooks/queries/use-tipos-programa"
import { useProgramas } from "@/hooks/queries/use-programas"
import type { Programa, ProgramasFilters } from "@/types"

function ActionCell({ slug, tipoSlug }: { slug: string; tipoSlug: string }) {
  const navigate = useNavigate()
  return (
    <Button variant="ghost" size="sm" onClick={() => navigate(`/programas/${tipoSlug}/${slug}`)}>
      <Eye className="size-4" />
    </Button>
  )
}

export function ProgramasListPage() {
  const navigate = useNavigate()
  const { tipoSlug } = useParams<{ tipoSlug?: string }>()
  const { data: tipos } = useTiposPrograma()
  const { data: facultades } = useFacultades()

  const [draft, setDraft] = useState({ q: "", modalidad: "", idFacultad: "", convocatoria: "" })
  const [applied, setApplied] = useState<URLSearchParams>(new URLSearchParams())

  const filters: ProgramasFilters = {
    tipoSlug,
    q: applied.get("q") ?? undefined,
    modalidad: (applied.get("modalidad") as ProgramasFilters["modalidad"]) ?? undefined,
    idFacultad: applied.get("idFacultad") ? Number(applied.get("idFacultad")) : undefined,
    convocatoria: applied.get("convocatoria") === "true"
      ? true
      : applied.get("convocatoria") === "false"
        ? false
        : undefined,
  }

  const { data, isLoading, isError, refetch } = useProgramas(filters)

  function buscar() {
    const params = new URLSearchParams()
    if (draft.q) params.set("q", draft.q)
    if (draft.modalidad) params.set("modalidad", draft.modalidad)
    if (draft.idFacultad) params.set("idFacultad", draft.idFacultad)
    if (draft.convocatoria) params.set("convocatoria", draft.convocatoria)
    setApplied(params)
  }

  function limpiar() {
    setDraft({ q: "", modalidad: "", idFacultad: "", convocatoria: "" })
    setApplied(new URLSearchParams())
  }

  const tipoNombre = tipos?.find((t) => t.slug === tipoSlug)?.nombre
  const titulo = tipoNombre ? `Programas de ${tipoNombre}` : "Todos los Programas"
  const breadcrumbs = tipoNombre
    ? [{ label: "Programas", href: "/programas" }, { label: tipoNombre }]
    : [{ label: "Programas" }]

  const columns: ColumnDef<Programa>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Nombre", accessorKey: "nombre" },
    {
      header: "Tipo",
      accessorFn: (row) => row.idTipoPrograma.nombre,
    },
    {
      header: "Facultad",
      accessorFn: (row) => row.idFacultad.nombre,
    },
    { header: "Slug", accessorKey: "slug" },
    {
      header: "Modalidad",
      accessorKey: "modalidad",
      cell: (value) => {
        const v = value as string
        return <Badge variant={v === "PRESENCIAL" ? "default" : "secondary"}>{v}</Badge>
      },
    },
    {
      header: "Convocatoria",
      accessorKey: "convocatoria",
      cell: (value) => {
        const v = value as boolean
        return (
          <Badge variant={v ? "default" : "outline"}>
            {v ? "Abierta" : "Cerrada"}
          </Badge>
        )
      },
    },
    {
      header: "Acciones",
      accessorFn: (row) => row.slug,
      cell: (_, row) => <ActionCell slug={row.slug} tipoSlug={row.idTipoPrograma.slug} />,
    },
  ]

  return (
    <div>
      <PageHeader
        title={titulo}
        breadcrumbs={breadcrumbs}
        action={{
          label: "Nuevo Programa",
          icon: <Plus />,
          onClick: () => navigate("/programas/crear"),
        }}
      />

      <div className="mb-4 flex flex-wrap items-end gap-3 rounded-lg border p-4">
        <div className="space-y-1">
          <Label className="text-xs">Facultad</Label>
          <Select
            value={draft.idFacultad}
            onValueChange={(v) => setDraft((p) => ({ ...p, idFacultad: v === "all" ? "" : v }))}
          >
            <SelectTrigger className="h-8 w-44">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {facultades?.map((f) => (
                <SelectItem key={f.id} value={String(f.id)}>{f.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Modalidad</Label>
          <Select
            value={draft.modalidad}
            onValueChange={(v) => setDraft((p) => ({ ...p, modalidad: v === "all" ? "" : v }))}
          >
            <SelectTrigger className="h-8 w-40">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="PRESENCIAL">Presencial</SelectItem>
              <SelectItem value="SEMIPRESENCIAL">Semipresencial</SelectItem>
              <SelectItem value="VIRTUAL">Virtual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Convocatoria</Label>
          <Select
            value={draft.convocatoria}
            onValueChange={(v) => setDraft((p) => ({ ...p, convocatoria: v === "all" ? "" : v }))}
          >
            <SelectTrigger className="h-8 w-36">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="true">Abierta</SelectItem>
              <SelectItem value="false">Cerrada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-8 w-44 pl-8"
              placeholder="Nombre..."
              value={draft.q}
              onChange={(e) => setDraft((p) => ({ ...p, q: e.target.value }))}
            />
          </div>
        </div>
        <div className="flex items-end gap-2">
          <Button className="h-8" onClick={buscar}>
            <Search />
            Buscar
          </Button>
          <Button className="h-8" variant="outline" onClick={limpiar}>
            <X />
            Limpiar
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        emptyMessage="No hay programas registrados"
        emptyAction={{
          label: "Crear Programa",
          onClick: () => navigate("/programas/crear"),
        }}
      />
    </div>
  )
}
