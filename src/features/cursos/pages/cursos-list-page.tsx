import { useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable, type ColumnDef } from "@/components/shared/data-table"
import { useCursos } from "@/hooks/queries/use-cursos"
import type { Curso } from "@/types"

const columns: ColumnDef<Curso>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Nombre", accessorKey: "nombre" },
  { header: "Créditos", accessorKey: "creditos" },
  {
    header: "Categoría",
    accessorKey: "categoria",
    cell: (value) => {
      const cat = value as string
      return (
        <Badge variant={cat === "OE" ? "default" : "secondary"}>
          {cat === "OE" ? "Obligatorio Específico" : "Electivo Específico"}
        </Badge>
      )
    },
  },
]

export function CursosListPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useCursos()

  return (
    <div>
      <PageHeader
        title="Cursos"
        breadcrumbs={[{ label: "Cursos" }]}
        action={{
          label: "Nuevo Curso",
          icon: <Plus />,
          onClick: () => navigate("/cursos/crear"),
        }}
      />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        emptyMessage="No hay cursos registrados"
        emptyAction={{
          label: "Crear Curso",
          onClick: () => navigate("/cursos/crear"),
        }}
      />
    </div>
  )
}
