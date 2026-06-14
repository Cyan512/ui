import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/shared/page-header"
import { useCrearTipoPrograma } from "@/hooks/queries/use-tipos-programa"
import {
  tipoProgramaSchema,
  type TipoProgramaSchema,
} from "../schemas/tipo-programa-schema"

export function TiposProgramaCreatePage() {
  const navigate = useNavigate()
  const { mutateAsync: crear, isPending } = useCrearTipoPrograma()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TipoProgramaSchema>({
    resolver: zodResolver(tipoProgramaSchema),
  })

  async function onSubmit(data: TipoProgramaSchema) {
    try {
      await crear({
        nombre: data.nombre,
        imagenCard: data.imagenCard || undefined,
        imagenBg: data.imagenBg || undefined,
      })
      toast.success("Tipo de programa creado exitosamente")
      navigate("/tipos-programa")
    } catch {
      toast.error("Error al crear el tipo de programa")
    }
  }

  return (
    <div>
      <PageHeader
        title="Nuevo Tipo de Programa"
        breadcrumbs={[
          { label: "Tipos de Programa", href: "/tipos-programa" },
          { label: "Nuevo" },
        ]}
      />
      <Card className="max-w-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" placeholder="Ej: Pregrado" {...register("nombre")} />
              {errors.nombre && (
                <p className="text-sm text-destructive">{errors.nombre.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="imagenCard">Imagen Card (opcional)</Label>
              <Input id="imagenCard" placeholder="URL de imagen" {...register("imagenCard")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imagenBg">Imagen de Fondo (opcional)</Label>
              <Input id="imagenBg" placeholder="URL de imagen" {...register("imagenBg")} />
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/tipos-programa")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
