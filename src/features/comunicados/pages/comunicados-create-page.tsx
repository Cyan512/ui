import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/shared/page-header"
import { useCrearComunicado } from "@/hooks/queries/use-comunicados"
import { comunicadoSchema, type ComunicadoSchema } from "../schemas/comunicado-schema"

export function ComunicadosCreatePage() {
  const navigate = useNavigate()
  const { mutateAsync: crear, isPending } = useCrearComunicado()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComunicadoSchema>({ resolver: zodResolver(comunicadoSchema) })

  async function onSubmit(data: ComunicadoSchema) {
    try {
      await crear({
        ...data,
        imagen: data.imagen || undefined,
      })
      toast.success("Comunicado creado exitosamente")
      navigate("/comunicados")
    } catch {
      toast.error("Error al crear el comunicado")
    }
  }

  return (
    <div>
      <PageHeader
        title="Nuevo Comunicado"
        breadcrumbs={[
          { label: "Comunicados", href: "/comunicados" },
          { label: "Nuevo" },
        ]}
      />
      <Card className="max-w-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título</Label>
              <Input id="titulo" placeholder="Ej: Nuevo comunicado" {...register("titulo")} />
              {errors.titulo && (
                <p className="text-sm text-destructive">{errors.titulo.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="resumen">Resumen</Label>
              <Textarea id="resumen" placeholder="Resumen del comunicado" {...register("resumen")} />
              {errors.resumen && (
                <p className="text-sm text-destructive">{errors.resumen.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contenido">Contenido</Label>
              <Textarea
                id="contenido"
                placeholder="Contenido completo del comunicado"
                className="min-h-[120px]"
                {...register("contenido")}
              />
              {errors.contenido && (
                <p className="text-sm text-destructive">{errors.contenido.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="imagen">Imagen <span className="text-muted-foreground font-normal">(opcional)</span></Label>
              <Input id="imagen" placeholder="URL de la imagen" {...register("imagen")} />
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/comunicados")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
