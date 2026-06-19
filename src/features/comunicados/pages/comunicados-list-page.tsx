import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Eye, Pencil, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import {
  useComunicados,
  useCrearComunicado,
  useActualizarComunicado,
  useEliminarComunicado,
} from "@/hooks/queries/use-comunicados"
import { comunicadoSchema, type ComunicadoSchema } from "../schemas/comunicado-schema"
import type { Comunicado } from "@/types"

export function ComunicadosListPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useComunicados()
  const [createOpen, setCreateOpen] = useState(false)
  const [editItem, setEditItem] = useState<Comunicado | null>(null)
  const [deleteItem, setDeleteItem] = useState<Comunicado | null>(null)
  const { mutateAsync: crear, isPending: isCreating } = useCrearComunicado()
  const { mutateAsync: actualizar, isPending: isUpdating } = useActualizarComunicado()
  const { mutateAsync: eliminar, isPending: isDeleting } = useEliminarComunicado()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ComunicadoSchema>({
    resolver: zodResolver(comunicadoSchema),
  })

  async function onCreate(data: ComunicadoSchema) {
    try {
      await crear({
        ...data,
        imagen: data.imagen || undefined,
      })
      toast.success("Comunicado creado exitosamente")
      setCreateOpen(false)
      reset()
    } catch {
      toast.error("Error al crear el comunicado")
    }
  }

  async function onEdit(data: ComunicadoSchema) {
    if (!editItem) return
    try {
      await actualizar({
        slug: editItem.slug,
        data: {
          ...data,
          imagen: data.imagen || undefined,
        },
      })
      toast.success("Comunicado actualizado exitosamente")
      setEditItem(null)
      reset()
    } catch {
      toast.error("Error al actualizar el comunicado")
    }
  }

  async function onDelete() {
    if (!deleteItem) return
    try {
      await eliminar(deleteItem.slug)
      toast.success("Comunicado eliminado exitosamente")
      setDeleteItem(null)
    } catch {
      toast.error("Error al eliminar el comunicado")
    }
  }

  function openEdit(comunicado: Comunicado) {
    setEditItem(comunicado)
    reset({
      titulo: comunicado.titulo,
      resumen: comunicado.resumen,
      contenido: comunicado.contenido,
      imagen: comunicado.imagen ?? "",
    })
  }

  function closeEdit() {
    setEditItem(null)
    reset()
  }

  const columns: ColumnDef<Comunicado>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Título", accessorKey: "titulo" },
    { header: "Slug", accessorKey: "slug" },
    {
      header: "Resumen",
      accessorFn: (row) =>
        row.resumen.length > 80 ? row.resumen.slice(0, 80) + "..." : row.resumen,
    },
    {
      header: "Fecha",
      accessorFn: (row) =>
        new Date(row.fechaPublicacion).toLocaleDateString("es-PE", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      header: "Acciones",
      accessorFn: () => null,
      cell: (_, row) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => navigate(`/comunicados/${row.slug}`)}>
            <Eye className="size-4" />
          </Button>
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
                <AlertDialogTitle>Eliminar comunicado</AlertDialogTitle>
                <AlertDialogDescription>
                  Vas a eliminar el comunicado <strong>"{row.titulo}"</strong>. Esta acción no se puede deshacer.
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
        title="Comunicados"
        breadcrumbs={[{ label: "Comunicados" }]}
        action={{
          label: "Nuevo Comunicado",
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
        emptyMessage="No hay comunicados registrados"
        emptyAction={{
          label: "Crear Comunicado",
          onClick: () => setCreateOpen(true),
        }}
      />

      <CreateSheet
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open)
          if (!open) reset()
        }}
        title="Nuevo Comunicado"
        description="Completa los datos para registrar un nuevo comunicado"
      >
        <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="create-titulo">Título</Label>
            <Input
              id="create-titulo"
              placeholder="Ej: Nuevo comunicado"
              {...register("titulo")}
            />
            {errors.titulo && (
              <p className="text-sm text-destructive">{errors.titulo.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-resumen">Resumen</Label>
            <Textarea
              id="create-resumen"
              placeholder="Resumen del comunicado"
              {...register("resumen")}
            />
            {errors.resumen && (
              <p className="text-sm text-destructive">{errors.resumen.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-contenido">Contenido</Label>
            <Textarea
              id="create-contenido"
              placeholder="Contenido completo del comunicado"
              className="min-h-[120px]"
              {...register("contenido")}
            />
            {errors.contenido && (
              <p className="text-sm text-destructive">{errors.contenido.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-imagen">Imagen <span className="text-muted-foreground font-normal">(opcional)</span></Label>
            <Input
              id="create-imagen"
              placeholder="URL de la imagen"
              {...register("imagen")}
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
        title="Editar Comunicado"
        description="Actualiza los datos del comunicado"
      >
        <form onSubmit={handleSubmit(onEdit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-titulo">Título</Label>
            <Input
              id="edit-titulo"
              placeholder="Ej: Nuevo comunicado"
              {...register("titulo")}
            />
            {errors.titulo && (
              <p className="text-sm text-destructive">{errors.titulo.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-resumen">Resumen</Label>
            <Textarea
              id="edit-resumen"
              placeholder="Resumen del comunicado"
              {...register("resumen")}
            />
            {errors.resumen && (
              <p className="text-sm text-destructive">{errors.resumen.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-contenido">Contenido</Label>
            <Textarea
              id="edit-contenido"
              placeholder="Contenido completo del comunicado"
              className="min-h-[120px]"
              {...register("contenido")}
            />
            {errors.contenido && (
              <p className="text-sm text-destructive">{errors.contenido.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-imagen">Imagen <span className="text-muted-foreground font-normal">(opcional)</span></Label>
            <Input
              id="edit-imagen"
              placeholder="URL de la imagen"
              {...register("imagen")}
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
