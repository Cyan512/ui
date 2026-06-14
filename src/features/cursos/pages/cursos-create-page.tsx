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
import { useCrearCurso } from "@/hooks/queries/use-cursos"
import { cursoSchema, type CursoSchema } from "../schemas/curso-schema"

export function CursosCreatePage() {
  const navigate = useNavigate()
  const { mutateAsync: crear, isPending } = useCrearCurso()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<CursoSchema>({ resolver: zodResolver(cursoSchema) as any })

  async function onSubmit(data: CursoSchema) {
    try {
      await crear(data)
      toast.success("Curso creado exitosamente")
      navigate("/cursos")
    } catch {
      toast.error("Error al crear el curso")
    }
  }

  return (
    <div>
      <PageHeader
        title="Nuevo Curso"
        breadcrumbs={[
          { label: "Cursos", href: "/cursos" },
          { label: "Nuevo" },
        ]}
      />
      <Card className="max-w-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" placeholder="Ej: Matemáticas Básicas" {...register("nombre")} />
              {errors.nombre && (
                <p className="text-sm text-destructive">{errors.nombre.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditos">Créditos</Label>
              <Input id="creditos" type="number" min={1} placeholder="4" {...register("creditos")} />
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
              <Button type="button" variant="outline" onClick={() => navigate("/cursos")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
