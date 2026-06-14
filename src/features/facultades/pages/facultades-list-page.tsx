import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable, type ColumnDef } from "@/components/shared/data-table"
import { CreateSheet } from "@/components/shared/create-sheet"
import { useFacultades, useCrearFacultad, useActualizarFacultad, useEliminarFacultad } from "@/hooks/queries/use-facultades"
import { facultadSchema, type FacultadSchema } from "../schemas/facultad-schema"
import type { Facultad } from "@/types"

export function FacultadesListPage() {
  const { data, isLoading, isError, refetch } = useFacultades()
  const [createOpen, setCreateOpen] = useState(false)
  const [editItem, setEditItem] = useState<Facultad | null>(null)
  const [deleteItem, setDeleteItem] = useState<Facultad | null>(null)
  const { mutateAsync: crear, isPending: isCreating } = useCrearFacultad()
  const { mutateAsync: actualizar, isPending: isUpdating } = useActualizarFacultad()
  const { mutateAsync: eliminar, isPending: isDeleting } = useEliminarFacultad()

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

  async function onEdit(data: FacultadSchema) {
    if (!editItem) return
    try {
      await actualizar({ id: editItem.id, data })
      toast.success("Facultad actualizada exitosamente")
      setEditItem(null)
      reset()
    } catch {
      toast.error("Error al actualizar la facultad")
    }
  }

  async function onDelete() {
    if (!deleteItem) return
    try {
      await eliminar(deleteItem.id)
      toast.success("Facultad eliminada exitosamente")
      setDeleteItem(null)
    } catch {
      toast.error("Error al eliminar la facultad")
    }
  }

  function openEdit(facultad: Facultad) {
    setEditItem(facultad)
    reset({ nombre: facultad.nombre })
  }

  function closeEdit() {
    setEditItem(null)
    reset()
  }

  const columns: ColumnDef<Facultad>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Nombre", accessorKey: "nombre" },
    {
      header: "Acciones",
      accessorFn: () => null,
      cell: (_, row) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => openEdit(row)}>
            <Pencil className="size-4" />
          </Button>
          <AlertDialog open={deleteItem?.id === row.id} onOpenChange={(open) => { if (!open) setDeleteItem(null) }}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => setDeleteItem(row)}>
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Eliminar facultad</AlertDialogTitle>
                <AlertDialogDescription>
                  Vas a eliminar la facultad <strong>"{row.nombre}"</strong>. Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDeleteItem(null)}>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} disabled={isDeleting}>
                  {isDeleting ? "Eliminando..." : "Eliminar"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ]

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
            <Label htmlFor="create-nombre">Nombre</Label>
            <Input
              id="create-nombre"
              placeholder="Ej: Ingeniería"
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre.message}</p>
            )}
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Guardando..." : "Guardar"}
            </Button>
            <Button type="button" variant="outline" onClick={() => { setCreateOpen(false); reset() }}>
              Cancelar
            </Button>
          </div>
        </form>
      </CreateSheet>

      <CreateSheet
        open={!!editItem}
        onOpenChange={(open) => { if (!open) closeEdit() }}
        title="Editar Facultad"
        description="Actualiza los datos de la facultad"
      >
        <form onSubmit={handleSubmit(onEdit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-nombre">Nombre</Label>
            <Input
              id="edit-nombre"
              placeholder="Ej: Ingeniería"
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre.message}</p>
            )}
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Guardando..." : "Guardar"}
            </Button>
            <Button type="button" variant="outline" onClick={closeEdit}>
              Cancelar
            </Button>
          </div>
        </form>
      </CreateSheet>
    </div>
  )
}
