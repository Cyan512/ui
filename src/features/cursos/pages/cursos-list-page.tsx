import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Pencil, Plus, Trash2 } from "lucide-react"
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
import { useCursos, useCrearCurso, useActualizarCurso, useEliminarCurso } from "@/hooks/queries/use-cursos"
import { cursoSchema, type CursoSchema } from "../schemas/curso-schema"
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
  const { data, isLoading, isError, refetch } = useCursos()
  const [createOpen, setCreateOpen] = useState(false)
  const [editItem, setEditItem] = useState<Curso | null>(null)
  const [deleteItem, setDeleteItem] = useState<Curso | null>(null)
  const { mutateAsync: crear, isPending: isCreating } = useCrearCurso()
  const { mutateAsync: actualizar, isPending: isUpdating } = useActualizarCurso()
  const { mutateAsync: eliminar, isPending: isDeleting } = useEliminarCurso()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<CursoSchema>({ resolver: zodResolver(cursoSchema) as any })
  const { register, handleSubmit, setValue, reset, formState: { errors } } = form

  async function onCreate(data: CursoSchema) {
    try {
      await crear(data)
      toast.success("Curso creado exitosamente")
      setCreateOpen(false)
      reset()
    } catch {
      toast.error("Error al crear el curso")
    }
  }

  async function onEdit(data: CursoSchema) {
    if (!editItem) return
    try {
      await actualizar({ id: editItem.id, data })
      toast.success("Curso actualizado exitosamente")
      setEditItem(null)
      reset()
    } catch {
      toast.error("Error al actualizar el curso")
    }
  }

  async function onDelete() {
    if (!deleteItem) return
    try {
      await eliminar(deleteItem.id)
      toast.success("Curso eliminado exitosamente")
      setDeleteItem(null)
    } catch {
      toast.error("Error al eliminar el curso")
    }
  }

  function openEdit(curso: Curso) {
    setEditItem(curso)
    reset({ nombre: curso.nombre, creditos: curso.creditos, categoria: curso.categoria })
  }

  function closeEdit() {
    setEditItem(null)
    reset()
  }

  const actionColumns: ColumnDef<Curso>[] = [
    ...columns,
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
                <AlertDialogTitle>Eliminar curso</AlertDialogTitle>
                <AlertDialogDescription>
                  Vas a eliminar el curso <strong>"{row.nombre}"</strong>. Esta acción no se puede deshacer.
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
        title="Cursos"
        breadcrumbs={[{ label: "Cursos" }]}
        action={{
          label: "Nuevo Curso",
          icon: <Plus />,
          onClick: () => setCreateOpen(true),
        }}
      />
      <DataTable
        columns={actionColumns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        emptyMessage="No hay cursos registrados"
        emptyAction={{
          label: "Crear Curso",
          onClick: () => setCreateOpen(true),
        }}
      />

      <CreateSheet
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open)
          if (!open) reset()
        }}
        title="Nuevo Curso"
        description="Completa los datos para registrar un nuevo curso"
      >
        <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="create-nombre">Nombre</Label>
            <Input
              id="create-nombre"
              placeholder="Ej: Matemáticas Básicas"
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-creditos">Créditos</Label>
            <Input
              id="create-creditos"
              type="number"
              min={1}
              placeholder="4"
              {...register("creditos")}
            />
            {errors.creditos && (
              <p className="text-sm text-destructive">{errors.creditos.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-categoria">Categoría</Label>
            <Select onValueChange={(v) => setValue("categoria", v as "OE" | "EE")}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OE">Obligatorio Específico</SelectItem>
                <SelectItem value="EE">Electivo Específico</SelectItem>
              </SelectContent>
            </Select>
            {errors.categoria && (
              <p className="text-sm text-destructive">{errors.categoria.message}</p>
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
        title="Editar Curso"
        description="Actualiza los datos del curso"
      >
        <form onSubmit={handleSubmit(onEdit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-nombre">Nombre</Label>
            <Input
              id="edit-nombre"
              placeholder="Ej: Matemáticas Básicas"
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-creditos">Créditos</Label>
            <Input
              id="edit-creditos"
              type="number"
              min={1}
              placeholder="4"
              {...register("creditos")}
            />
            {errors.creditos && (
              <p className="text-sm text-destructive">{errors.creditos.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-categoria">Categoría</Label>
            <Select
              defaultValue={editItem?.categoria}
              onValueChange={(v) => setValue("categoria", v as "OE" | "EE")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OE">Obligatorio Específico</SelectItem>
                <SelectItem value="EE">Electivo Específico</SelectItem>
              </SelectContent>
            </Select>
            {errors.categoria && (
              <p className="text-sm text-destructive">{errors.categoria.message}</p>
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
