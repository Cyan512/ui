import { useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable, type ColumnDef } from "@/components/shared/data-table"
import { useFacultades } from "@/hooks/queries/use-facultades"
import type { Facultad } from "@/types"

const columns: ColumnDef<Facultad>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Nombre", accessorKey: "nombre" },
]

export function FacultadesListPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useFacultades()

  return (
    <div>
      <PageHeader
        title="Facultades"
        breadcrumbs={[{ label: "Facultades" }]}
        action={{
          label: "Nueva Facultad",
          icon: <Plus />,
          onClick: () => navigate("/facultades/crear"),
        }}
      />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        emptyMessage="No hay facultades registradas"
        emptyAction={{
          label: "Crear Facultad",
          onClick: () => navigate("/facultades/crear"),
        }}
      />
    </div>
  )
}
