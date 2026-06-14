import { useNavigate, useSearchParams } from "react-router-dom"
import { Eye, Plus, Search } from "lucide-react"
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

function ActionCell({ slug }: { slug: string }) {
  const navigate = useNavigate()
  return (
    <Button variant="ghost" size="sm" onClick={() => navigate(`/programas/${slug}`)}>
      <Eye className="size-4" />
    </Button>
  )
}

export function ProgramasListPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: tipos } = useTiposPrograma()
  const { data: facultades } = useFacultades()

  const filters: ProgramasFilters = {
    tipoSlug: searchParams.get("tipoSlug") ?? undefined,
    q: searchParams.get("q") ?? undefined,
    modalidad: (searchParams.get("modalidad") as ProgramasFilters["modalidad"]) ?? undefined,
    idFacultad: searchParams.get("idFacultad") ? Number(searchParams.get("idFacultad")) : undefined,
    convocatoria: searchParams.get("convocatoria") === "true"
      ? true
      : searchParams.get("convocatoria") === "false"
        ? false
        : undefined,
  }

  const { data, isLoading, isError, refetch } = useProgramas(filters)

  function setFilter(key: string, value: string | undefined) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value === undefined || value === "all") {
        next.delete(key)
      } else {
        next.set(key, value)
      }
      return next
    })
  }

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
      cell: (_, row) => <ActionCell slug={row.slug} />,
    },
  ]

  return (
    <div>
      <PageHeader
        title="Programas"
        breadcrumbs={[{ label: "Programas" }]}
        action={{
          label: "Nuevo Programa",
          icon: <Plus />,
          onClick: () => navigate("/programas/crear"),
        }}
      />

      <div className="mb-4 flex flex-wrap items-end gap-3 rounded-lg border p-4">
        <div className="space-y-1">
          <Label className="text-xs">Tipo</Label>
          <Select
            value={filters.tipoSlug ?? "all"}
            onValueChange={(v) => setFilter("tipoSlug", v === "all" ? undefined : v)}
          >
            <SelectTrigger className="h-8 w-40">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {tipos?.map((t) => (
                <SelectItem key={t.id} value={t.slug}>{t.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Facultad</Label>
          <Select
            value={filters.idFacultad ? String(filters.idFacultad) : "all"}
            onValueChange={(v) => setFilter("idFacultad", v === "all" ? undefined : v)}
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
            value={filters.modalidad ?? "all"}
            onValueChange={(v) => setFilter("modalidad", v === "all" ? undefined : v)}
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
            value={filters.convocatoria === undefined ? "all" : String(filters.convocatoria)}
            onValueChange={(v) => setFilter("convocatoria", v === "all" ? undefined : v)}
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
              defaultValue={filters.q ?? ""}
              onChange={(e) => {
                const val = e.target.value || undefined
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev)
                  if (!val) {
                    next.delete("q")
                  } else {
                    next.set("q", val)
                  }
                  return next
                })
              }}
            />
          </div>
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
