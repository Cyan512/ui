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
import { useTiposPrograma, useCrearTipoPrograma } from "@/hooks/queries/use-tipos-programa"
import { tipoProgramaSchema, type TipoProgramaSchema } from "../schemas/tipo-programa-schema"
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
  const { data, isLoading, isError, refetch } = useTiposPrograma()
  const [createOpen, setCreateOpen] = useState(false)
  const { mutateAsync: crear, isPending } = useCrearTipoPrograma()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TipoProgramaSchema>({
    resolver: zodResolver(tipoProgramaSchema),
  })

  async function onCreate(data: TipoProgramaSchema) {
    try {
      await crear({
        nombre: data.nombre,
        imagenCard: data.imagenCard || undefined,
        imagenBg: data.imagenBg || undefined,
      })
      toast.success("Tipo de programa creado exitosamente")
      setCreateOpen(false)
      reset()
    } catch {
      toast.error("Error al crear el tipo de programa")
    }
  }

  return (
    <div>
      <PageHeader
        title="Tipos de Programa"
        breadcrumbs={[{ label: "Tipos de Programa" }]}
        action={{
          label: "Nuevo Tipo",
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
        emptyMessage="No hay tipos de programa registrados"
        emptyAction={{
          label: "Crear Tipo de Programa",
          onClick: () => setCreateOpen(true),
        }}
      />

      <CreateSheet
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open)
          if (!open) reset()
        }}
        title="Nuevo Tipo de Programa"
        description="Completa los datos para registrar un nuevo tipo de programa"
      >
        <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              placeholder="Ej: Pregrado"
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="imagenCard">Imagen Card <span className="text-muted-foreground font-normal">(opcional)</span></Label>
            <Input
              id="imagenCard"
              placeholder="URL de imagen"
              {...register("imagenCard")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imagenBg">Imagen de Fondo <span className="text-muted-foreground font-normal">(opcional)</span></Label>
            <Input
              id="imagenBg"
              placeholder="URL de imagen"
              {...register("imagenBg")}
            />
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
