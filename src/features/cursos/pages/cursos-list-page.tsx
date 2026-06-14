import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Plus } from "lucide-react"
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
import { PageHeader } from "@/components/shared/page-header"
import { DataTable, type ColumnDef } from "@/components/shared/data-table"
import { CreateSheet } from "@/components/shared/create-sheet"
import { useCursos, useCrearCurso } from "@/hooks/queries/use-cursos"
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
  const { mutateAsync: crear, isPending } = useCrearCurso()

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
        columns={columns}
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
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              placeholder="Ej: Matemáticas Básicas"
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="creditos">Créditos</Label>
            <Input
              id="creditos"
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
            <Label htmlFor="categoria">Categoría</Label>
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
