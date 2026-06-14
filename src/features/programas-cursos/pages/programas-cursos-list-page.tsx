import { useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable, type ColumnDef } from "@/components/shared/data-table"
import { useProgramasCursos } from "@/hooks/queries/use-programas-cursos"
import type { ProgramaCurso } from "@/types"

const columns: ColumnDef<ProgramaCurso>[] = [
  { header: "ID", accessorKey: "id" },
  {
    header: "Programa",
    accessorFn: (row) => row.idPrograma.nombre,
  },
  {
    header: "Curso",
    accessorFn: (row) => row.idCurso.nombre,
  },
  { header: "Semestre(s)", accessorKey: "semestres" },
]

export function ProgramasCursosListPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useProgramasCursos()

  return (
    <div>
      <PageHeader
        title="Programa-Curso"
        breadcrumbs={[{ label: "Programa-Curso" }]}
        action={{
          label: "Nueva Asociación",
          icon: <Plus />,
          onClick: () => navigate("/programas-cursos/crear"),
        }}
      />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        emptyMessage="No hay asociaciones programa-curso"
        emptyAction={{
          label: "Crear Asociación",
          onClick: () => navigate("/programas-cursos/crear"),
        }}
      />
    </div>
  )
}
