import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Plus } from "lucide-react"
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
import { useProgramasCursos, useCrearProgramaCurso } from "@/hooks/queries/use-programas-cursos"
import { useProgramas } from "@/hooks/queries/use-programas"
import { useCursos } from "@/hooks/queries/use-cursos"
import { programaCursoSchema, type ProgramaCursoSchema } from "../schemas/programa-curso-schema"
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
  const { data, isLoading, isError, refetch } = useProgramasCursos()
  const { data: programas } = useProgramas()
  const { data: cursos } = useCursos()
  const [createOpen, setCreateOpen] = useState(false)
  const { mutateAsync: crear, isPending } = useCrearProgramaCurso()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { handleSubmit, setValue, reset, formState: { errors } } = useForm<ProgramaCursoSchema>({
    resolver: zodResolver(programaCursoSchema) as any,
  })

  async function onCreate(data: ProgramaCursoSchema) {
    try {
      await crear(data)
      toast.success("Asociación creada exitosamente")
      setCreateOpen(false)
      reset()
    } catch {
      toast.error("Error al crear la asociación")
    }
  }

  return (
    <div>
      <PageHeader
        title="Programa-Curso"
        breadcrumbs={[{ label: "Programa-Curso" }]}
        action={{
          label: "Nueva Asociación",
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
        emptyMessage="No hay asociaciones programa-curso"
        emptyAction={{
          label: "Crear Asociación",
          onClick: () => setCreateOpen(true),
        }}
      />

      <CreateSheet
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open)
          if (!open) reset()
        }}
        title="Nueva Asociación"
        description="Vincula un curso a un programa académico"
      >
        <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="idPrograma">Programa</Label>
            <Select onValueChange={(v) => setValue("idPrograma", Number(v))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar programa" />
              </SelectTrigger>
              <SelectContent>
                {programas?.map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>{p.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.idPrograma && (
              <p className="text-sm text-destructive">{errors.idPrograma.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="idCurso">Curso</Label>
            <Select onValueChange={(v) => setValue("idCurso", Number(v))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar curso" />
              </SelectTrigger>
              <SelectContent>
                {cursos?.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>{c.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.idCurso && (
              <p className="text-sm text-destructive">{errors.idCurso.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="semestres">Semestre(s)</Label>
            <Input
              id="semestres"
              placeholder="Ej: I, II, III"
              onChange={(e) => setValue("semestres", e.target.value)}
            />
            {errors.semestres && (
              <p className="text-sm text-destructive">{errors.semestres.message}</p>
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
