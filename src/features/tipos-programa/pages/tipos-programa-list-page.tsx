import { useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable, type ColumnDef } from "@/components/shared/data-table"
import { useTiposPrograma } from "@/hooks/queries/use-tipos-programa"
import type { TipoPrograma } from "@/types"

const columns: ColumnDef<TipoPrograma>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Nombre", accessorKey: "nombre" },
  { header: "Slug", accessorKey: "slug" },
  {
    header: "Imagen Card",
    accessorFn: (row) => row.imagenCard ?? "—",
  },
  {
    header: "Imagen BG",
    accessorFn: (row) => row.imagenBg ?? "—",
  },
]

export function TiposProgramaListPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useTiposPrograma()

  return (
    <div>
      <PageHeader
        title="Tipos de Programa"
        breadcrumbs={[{ label: "Tipos de Programa" }]}
        action={{
          label: "Nuevo Tipo",
          icon: <Plus />,
          onClick: () => navigate("/tipos-programa/crear"),
        }}
      />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        emptyMessage="No hay tipos de programa registrados"
        emptyAction={{
          label: "Crear Tipo de Programa",
          onClick: () => navigate("/tipos-programa/crear"),
        }}
      />
    </div>
  )
}
