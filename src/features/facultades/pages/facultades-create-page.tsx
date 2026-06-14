import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/shared/page-header"
import { useCrearFacultad } from "@/hooks/queries/use-facultades"
import { facultadSchema, type FacultadSchema } from "../schemas/facultad-schema"

export function FacultadesCreatePage() {
  const navigate = useNavigate()
  const { mutateAsync: crear, isPending } = useCrearFacultad()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FacultadSchema>({
    resolver: zodResolver(facultadSchema),
  })

  async function onSubmit(data: FacultadSchema) {
    try {
      await crear(data)
      toast.success("Facultad creada exitosamente")
      navigate("/facultades")
    } catch {
      toast.error("Error al crear la facultad")
    }
  }

  return (
    <div>
      <PageHeader
        title="Nueva Facultad"
        breadcrumbs={[
          { label: "Facultades", href: "/facultades" },
          { label: "Nuevo" },
        ]}
      />
      <Card className="max-w-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" placeholder="Ej: Ingeniería" {...register("nombre")} />
              {errors.nombre && (
                <p className="text-sm text-destructive">{errors.nombre.message}</p>
              )}
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/facultades")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
