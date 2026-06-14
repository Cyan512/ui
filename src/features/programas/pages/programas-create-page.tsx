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
import { Switch } from "@/components/ui/switch"
import { PageHeader } from "@/components/shared/page-header"
import { useTiposPrograma } from "@/hooks/queries/use-tipos-programa"
import { useFacultades } from "@/hooks/queries/use-facultades"
import { useCrearPrograma } from "@/hooks/queries/use-programas"
import { programaSchema, type ProgramaSchema } from "../schemas/programa-schema"

export function ProgramasCreatePage() {
  const navigate = useNavigate()
  const { data: tipos } = useTiposPrograma()
  const { data: facultades } = useFacultades()
  const { mutateAsync: crear, isPending } = useCrearPrograma()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<ProgramaSchema>({ resolver: zodResolver(programaSchema) as any })

  async function onSubmit(data: ProgramaSchema) {
    try {
      await crear({
        ...data,
        convocatoria: data.convocatoria ?? false,
      })
      toast.success("Programa creado exitosamente")
      navigate("/programas")
    } catch {
      toast.error("Error al crear el programa")
    }
  }

  return (
    <div>
      <PageHeader
        title="Nuevo Programa"
        breadcrumbs={[
          { label: "Programas", href: "/programas" },
          { label: "Nuevo" },
        ]}
      />
      <Card className="max-w-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" placeholder="Ej: Ingeniería de Sistemas" {...register("nombre")} />
              {errors.nombre && (
                <p className="text-sm text-destructive">{errors.nombre.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="idTipoPrograma">Tipo de Programa</Label>
              <Select onValueChange={(v) => setValue("idTipoPrograma", Number(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tipos?.map((t) => (
                    <SelectItem key={t.id} value={String(t.id)}>{t.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.idTipoPrograma && (
                <p className="text-sm text-destructive">{errors.idTipoPrograma.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="idFacultad">Facultad</Label>
              <Select onValueChange={(v) => setValue("idFacultad", Number(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar facultad" />
                </SelectTrigger>
                <SelectContent>
                  {facultades?.map((f) => (
                    <SelectItem key={f.id} value={String(f.id)}>{f.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.idFacultad && (
                <p className="text-sm text-destructive">{errors.idFacultad.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="modalidad">Modalidad</Label>
              <Select onValueChange={(v) => setValue("modalidad", v as ProgramaSchema["modalidad"])}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar modalidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRESENCIAL">Presencial</SelectItem>
                  <SelectItem value="SEMIPRESENCIAL">Semipresencial</SelectItem>
                  <SelectItem value="VIRTUAL">Virtual</SelectItem>
                </SelectContent>
              </Select>
              {errors.modalidad && (
                <p className="text-sm text-destructive">{errors.modalidad.message}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="convocatoria"
                onCheckedChange={(v) => setValue("convocatoria", v)}
              />
              <Label htmlFor="convocatoria">Convocatoria abierta</Label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/programas")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
