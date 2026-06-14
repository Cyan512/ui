import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { useProgramas } from "@/hooks/queries/use-programas"
import { useCursos } from "@/hooks/queries/use-cursos"
import { useCrearProgramaCurso } from "@/hooks/queries/use-programas-cursos"
import {
  programaCursoSchema,
  type ProgramaCursoSchema,
} from "../schemas/programa-curso-schema"

export function ProgramasCursosCreatePage() {
  const navigate = useNavigate()
  const { data: programas } = useProgramas()
  const { data: cursos } = useCursos()
  const { mutateAsync: crear, isPending } = useCrearProgramaCurso()

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<ProgramaCursoSchema>({ resolver: zodResolver(programaCursoSchema) as any })

  async function onSubmit(data: ProgramaCursoSchema) {
    try {
      await crear(data)
      toast.success("Asociación creada exitosamente")
      navigate("/programas-cursos")
    } catch {
      toast.error("Error al crear la asociación")
    }
  }

  return (
    <div>
      <PageHeader
        title="Nueva Asociación Programa-Curso"
        breadcrumbs={[
          { label: "Programa-Curso", href: "/programas-cursos" },
          { label: "Nuevo" },
        ]}
      />
      <Card className="max-w-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <Input id="semestres" placeholder="Ej: I, II, III" onChange={(e) => setValue("semestres", e.target.value)} />
              {errors.semestres && (
                <p className="text-sm text-destructive">{errors.semestres.message}</p>
              )}
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/programas-cursos")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
