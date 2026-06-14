import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable, type ColumnDef } from "@/components/shared/data-table"
import { CreateSheet } from "@/components/shared/create-sheet"
import { useFacultades, useCrearFacultad } from "@/hooks/queries/use-facultades"
import { facultadSchema, type FacultadSchema } from "../schemas/facultad-schema"
import type { Facultad } from "@/types"

const columns: ColumnDef<Facultad>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Nombre", accessorKey: "nombre" },
]

export function FacultadesListPage() {
  const { data, isLoading, isError, refetch } = useFacultades()
  const [createOpen, setCreateOpen] = useState(false)
  const { mutateAsync: crear, isPending } = useCrearFacultad()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FacultadSchema>({
    resolver: zodResolver(facultadSchema),
  })

  async function onCreate(data: FacultadSchema) {
    try {
      await crear(data)
      toast.success("Facultad creada exitosamente")
      setCreateOpen(false)
      reset()
    } catch {
      toast.error("Error al crear la facultad")
    }
  }

  return (
    <div>
      <PageHeader
        title="Facultades"
        breadcrumbs={[{ label: "Facultades" }]}
        action={{
          label: "Nueva Facultad",
          icon: <Plus />,
          onClick: () => setCreateOpen(true),
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
          onClick: () => setCreateOpen(true),
        }}
      />

      <CreateSheet
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open)
          if (!open) reset()
        }}
        title="Nueva Facultad"
        description="Completa los datos para registrar una nueva facultad"
      >
        <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              placeholder="Ej: Ingeniería"
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre.message}</p>
            )}
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Guardando..." : "Guardar"}
            </Button>
            <Button type="button" variant="outline" onClick={() => { setCreateOpen(false); reset() }}>
              Cancelar
            </Button>
          </div>
        </form>
      </CreateSheet>
    </div>
  )
}
