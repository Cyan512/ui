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
import { useTiposPrograma, useCrearTipoPrograma, useActualizarTipoPrograma, useEliminarTipoPrograma } from "@/hooks/queries/use-tipos-programa"
import { tipoProgramaSchema, type TipoProgramaSchema } from "../schemas/tipo-programa-schema"
import type { TipoPrograma } from "@/types"

export function TiposProgramaListPage() {
  const { data, isLoading, isError, refetch } = useTiposPrograma()
  const [createOpen, setCreateOpen] = useState(false)
  const [editItem, setEditItem] = useState<TipoPrograma | null>(null)
  const [deleteItem, setDeleteItem] = useState<TipoPrograma | null>(null)
  const { mutateAsync: crear, isPending: isCreating } = useCrearTipoPrograma()
  const { mutateAsync: actualizar, isPending: isUpdating } = useActualizarTipoPrograma()
  const { mutateAsync: eliminar, isPending: isDeleting } = useEliminarTipoPrograma()

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

  async function onEdit(data: TipoProgramaSchema) {
    if (!editItem) return
    try {
      await actualizar({
        slug: editItem.slug,
        data: {
          nombre: data.nombre,
          imagenCard: data.imagenCard || undefined,
          imagenBg: data.imagenBg || undefined,
        },
      })
      toast.success("Tipo de programa actualizado exitosamente")
      setEditItem(null)
      reset()
    } catch {
      toast.error("Error al actualizar el tipo de programa")
    }
  }

  async function onDelete() {
    if (!deleteItem) return
    try {
      await eliminar(deleteItem.slug)
      toast.success("Tipo de programa eliminado exitosamente")
      setDeleteItem(null)
    } catch {
      toast.error("Error al eliminar el tipo de programa")
    }
  }

  function openEdit(tipo: TipoPrograma) {
    setEditItem(tipo)
    reset({ nombre: tipo.nombre, imagenCard: tipo.imagenCard ?? "", imagenBg: tipo.imagenBg ?? "" })
  }

  function closeEdit() {
    setEditItem(null)
    reset()
  }

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
                <AlertDialogTitle>Eliminar tipo de programa</AlertDialogTitle>
                <AlertDialogDescription>
                  Vas a eliminar el tipo de programa <strong>"{row.nombre}"</strong>. Esta acción no se puede deshacer.
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
            <Label htmlFor="create-nombre">Nombre</Label>
            <Input
              id="create-nombre"
              placeholder="Ej: Pregrado"
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-imagenCard">Imagen Card <span className="text-muted-foreground font-normal">(opcional)</span></Label>
            <Input
              id="create-imagenCard"
              placeholder="URL de imagen"
              {...register("imagenCard")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-imagenBg">Imagen de Fondo <span className="text-muted-foreground font-normal">(opcional)</span></Label>
            <Input
              id="create-imagenBg"
              placeholder="URL de imagen"
              {...register("imagenBg")}
            />
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
        title="Editar Tipo de Programa"
        description="Actualiza los datos del tipo de programa"
      >
        <form onSubmit={handleSubmit(onEdit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-nombre">Nombre</Label>
            <Input
              id="edit-nombre"
              placeholder="Ej: Pregrado"
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-imagenCard">Imagen Card <span className="text-muted-foreground font-normal">(opcional)</span></Label>
            <Input
              id="edit-imagenCard"
              placeholder="URL de imagen"
              {...register("imagenCard")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-imagenBg">Imagen de Fondo <span className="text-muted-foreground font-normal">(opcional)</span></Label>
            <Input
              id="edit-imagenBg"
              placeholder="URL de imagen"
              {...register("imagenBg")}
            />
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
