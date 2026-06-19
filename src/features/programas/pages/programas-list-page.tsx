import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Eye, Pencil, Plus, Search, Trash2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
import { useFacultades } from "@/hooks/queries/use-facultades"
import { useTiposPrograma } from "@/hooks/queries/use-tipos-programa"
import { useProgramas, useCrearPrograma, useActualizarPrograma, useEliminarPrograma } from "@/hooks/queries/use-programas"
import { programaSchema, type ProgramaSchema } from "../schemas/programa-schema"
import type { Programa, ProgramasFilters } from "@/types"

function ActionCell({ slug, tipoSlug }: { slug: string; tipoSlug: string }) {
  const navigate = useNavigate()
  return (
    <Button variant="ghost" size="sm" onClick={() => navigate(`/programas/${tipoSlug}/${slug}`)}>
      <Eye className="size-4" />
    </Button>
  )
}

export function ProgramasListPage() {
  const { tipoSlug } = useParams<{ tipoSlug?: string }>()
  const { data: tipos } = useTiposPrograma()
  const { data: facultades } = useFacultades()

  const [draft, setDraft] = useState({ q: "", modalidad: "", idFacultad: "", convocatoria: "" })
  const [applied, setApplied] = useState<URLSearchParams>(new URLSearchParams())
  const [createOpen, setCreateOpen] = useState(false)
  const [editItem, setEditItem] = useState<Programa | null>(null)
  const [deleteItem, setDeleteItem] = useState<Programa | null>(null)
  const { mutateAsync: crear, isPending: isCreating } = useCrearPrograma()
  const { mutateAsync: actualizar, isPending: isUpdating } = useActualizarPrograma()
  const { mutateAsync: eliminar, isPending: isDeleting } = useEliminarPrograma()

  const filters: ProgramasFilters = {
    tipoSlug,
    q: applied.get("q") ?? undefined,
    modalidad: (applied.get("modalidad") as ProgramasFilters["modalidad"]) ?? undefined,
    idFacultad: applied.get("idFacultad") ? Number(applied.get("idFacultad")) : undefined,
    convocatoria: applied.get("convocatoria") === "true"
      ? true
      : applied.get("convocatoria") === "false"
        ? false
        : undefined,
  }

  const { data, isLoading, isError, refetch } = useProgramas(filters)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ProgramaSchema>({
    resolver: zodResolver(programaSchema) as any,
  })

  async function onCreate(data: ProgramaSchema) {
    try {
      await crear({
        ...data,
        convocatoria: data.convocatoria ?? false,
        imagen: data.imagen || undefined,
      })
      toast.success("Programa creado exitosamente")
      setCreateOpen(false)
      reset()
    } catch {
      toast.error("Error al crear el programa")
    }
  }

  async function onEdit(data: ProgramaSchema) {
    if (!editItem) return
    try {
      await actualizar({
        slug: editItem.slug,
        data: {
          ...data,
          convocatoria: data.convocatoria ?? false,
          imagen: data.imagen || undefined,
        },
      })
      toast.success("Programa actualizado exitosamente")
      setEditItem(null)
      reset()
    } catch {
      toast.error("Error al actualizar el programa")
    }
  }

  async function onDelete() {
    if (!deleteItem) return
    try {
      await eliminar(deleteItem.slug)
      toast.success("Programa eliminado exitosamente")
      setDeleteItem(null)
    } catch {
      toast.error("Error al eliminar el programa")
    }
  }

  function openEdit(programa: Programa) {
    setEditItem(programa)
    reset({
      nombre: programa.nombre,
      idTipoPrograma: programa.idTipoPrograma.id,
      idFacultad: programa.idFacultad.id,
      modalidad: programa.modalidad,
      convocatoria: programa.convocatoria,
      imagen: programa.imagen ?? "",
      objetivoGeneral: programa.objetivoGeneral,
      objetivosEspecificos: programa.objetivosEspecificos,
      perfilPosgraduado: programa.perfilPosgraduado,
      lineasInvestigacion: programa.lineasInvestigacion,
    })
  }

  function closeEdit() {
    setEditItem(null)
    reset()
  }

  function buscar() {
    const params = new URLSearchParams()
    if (draft.q) params.set("q", draft.q)
    if (draft.modalidad) params.set("modalidad", draft.modalidad)
    if (draft.idFacultad) params.set("idFacultad", draft.idFacultad)
    if (draft.convocatoria) params.set("convocatoria", draft.convocatoria)
    setApplied(params)
  }

  function limpiar() {
    setDraft({ q: "", modalidad: "", idFacultad: "", convocatoria: "" })
    setApplied(new URLSearchParams())
  }

  const tipoNombre = tipos?.find((t) => t.slug === tipoSlug)?.nombre
  const titulo = tipoNombre ? `Programas de ${tipoNombre}` : "Todos los Programas"
  const breadcrumbs = tipoNombre
    ? [{ label: "Programas", href: "/programas" }, { label: tipoNombre }]
    : [{ label: "Programas" }]

  const columns: ColumnDef<Programa>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Nombre", accessorKey: "nombre" },
    {
      header: "Tipo",
      accessorFn: (row) => row.idTipoPrograma.nombre,
    },
    {
      header: "Facultad",
      accessorFn: (row) => row.idFacultad.nombre,
    },
    { header: "Slug", accessorKey: "slug" },
    {
      header: "Modalidad",
      accessorKey: "modalidad",
      cell: (value) => {
        const v = value as string
        return (
          <Badge variant={v === "PRESENCIAL" ? "default" : "secondary"}>
            {v}
          </Badge>
        )
      },
    },
    {
      header: "Convocatoria",
      accessorKey: "convocatoria",
      cell: (value) => {
        const v = value as boolean
        return (
          <Badge variant={v ? "default" : "outline"}>
            {v ? "Abierta" : "Cerrada"}
          </Badge>
        )
      },
    },
    {
      header: "Acciones",
      accessorFn: (row) => row.slug,
      cell: (_, row) => (
        <div className="flex gap-1">
          <ActionCell slug={row.slug} tipoSlug={row.idTipoPrograma.slug} />
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
                <AlertDialogTitle>Eliminar programa</AlertDialogTitle>
                <AlertDialogDescription>
                  Vas a eliminar el programa <strong>"{row.nombre}"</strong>. Esta acción no se puede deshacer.
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
        title={titulo}
        breadcrumbs={breadcrumbs}
        action={{
          label: "Nuevo Programa",
          icon: <Plus />,
          onClick: () => setCreateOpen(true),
        }}
      />

      <div className="mb-4 flex flex-wrap items-end gap-3 rounded-lg border p-4">
        <div className="space-y-1">
          <Label className="text-xs">Facultad</Label>
          <Select
            value={draft.idFacultad}
            onValueChange={(v) => setDraft((p) => ({ ...p, idFacultad: v === "all" ? "" : v }))}
          >
            <SelectTrigger className="h-8 w-44">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {facultades?.map((f) => (
                <SelectItem key={f.id} value={String(f.id)}>{f.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Modalidad</Label>
          <Select
            value={draft.modalidad}
            onValueChange={(v) => setDraft((p) => ({ ...p, modalidad: v === "all" ? "" : v }))}
          >
            <SelectTrigger className="h-8 w-40">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="PRESENCIAL">Presencial</SelectItem>
              <SelectItem value="SEMIPRESENCIAL">Semipresencial</SelectItem>
              <SelectItem value="VIRTUAL">Virtual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Convocatoria</Label>
          <Select
            value={draft.convocatoria}
            onValueChange={(v) => setDraft((p) => ({ ...p, convocatoria: v === "all" ? "" : v }))}
          >
            <SelectTrigger className="h-8 w-36">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="true">Abierta</SelectItem>
              <SelectItem value="false">Cerrada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-8 w-44 pl-8"
              placeholder="Nombre..."
              value={draft.q}
              onChange={(e) => setDraft((p) => ({ ...p, q: e.target.value }))}
            />
          </div>
        </div>
        <div className="flex items-end gap-2">
          <Button className="h-8" onClick={buscar}>
            <Search />
            Buscar
          </Button>
          <Button className="h-8" variant="outline" onClick={limpiar}>
            <X />
            Limpiar
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        emptyMessage="No hay programas registrados"
        emptyAction={{
          label: "Crear Programa",
          onClick: () => setCreateOpen(true),
        }}
      />

      <CreateSheet
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open)
          if (!open) reset()
        }}
        title="Nuevo Programa"
        description="Completa los datos para registrar un nuevo programa"
      >
        <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="create-nombre">Nombre</Label>
            <Input
              id="create-nombre"
              placeholder="Ej: Ingeniería de Sistemas"
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-idTipoPrograma">Tipo de Programa</Label>
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
            <Label htmlFor="create-idFacultad">Facultad</Label>
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
            <Label htmlFor="create-modalidad">Modalidad</Label>
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
              id="create-convocatoria"
              onCheckedChange={(v) => setValue("convocatoria", v)}
            />
            <Label htmlFor="create-convocatoria">Convocatoria abierta</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-imagen">Imagen <span className="text-muted-foreground font-normal">(opcional)</span></Label>
            <Input id="create-imagen" placeholder="URL de la imagen" {...register("imagen")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-objetivoGeneral">Objetivo General</Label>
            <Textarea id="create-objetivoGeneral" placeholder="Objetivo general del programa" {...register("objetivoGeneral")} />
            {errors.objetivoGeneral && (
              <p className="text-sm text-destructive">{errors.objetivoGeneral.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-objetivosEspecificos">Objetivos Específicos</Label>
            <Textarea id="create-objetivosEspecificos" placeholder="Objetivos específicos del programa" {...register("objetivosEspecificos")} />
            {errors.objetivosEspecificos && (
              <p className="text-sm text-destructive">{errors.objetivosEspecificos.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-perfilPosgraduado">Perfil del Posgraduado</Label>
            <Textarea id="create-perfilPosgraduado" placeholder="Perfil del posgraduado" {...register("perfilPosgraduado")} />
            {errors.perfilPosgraduado && (
              <p className="text-sm text-destructive">{errors.perfilPosgraduado.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-lineasInvestigacion">Líneas de Investigación</Label>
            <Textarea id="create-lineasInvestigacion" placeholder="Líneas de investigación" {...register("lineasInvestigacion")} />
            {errors.lineasInvestigacion && (
              <p className="text-sm text-destructive">{errors.lineasInvestigacion.message}</p>
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
        title="Editar Programa"
        description="Actualiza los datos del programa"
      >
        <form onSubmit={handleSubmit(onEdit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-nombre">Nombre</Label>
            <Input
              id="edit-nombre"
              placeholder="Ej: Ingeniería de Sistemas"
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-idTipoPrograma">Tipo de Programa</Label>
            <Select
              defaultValue={String(editItem?.idTipoPrograma.id ?? "")}
              onValueChange={(v) => setValue("idTipoPrograma", Number(v))}
            >
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
            <Label htmlFor="edit-idFacultad">Facultad</Label>
            <Select
              defaultValue={String(editItem?.idFacultad.id ?? "")}
              onValueChange={(v) => setValue("idFacultad", Number(v))}
            >
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
            <Label htmlFor="edit-modalidad">Modalidad</Label>
            <Select
              defaultValue={editItem?.modalidad}
              onValueChange={(v) => setValue("modalidad", v as ProgramaSchema["modalidad"])}
            >
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
              id="edit-convocatoria"
              defaultChecked={editItem?.convocatoria}
              onCheckedChange={(v) => setValue("convocatoria", v)}
            />
            <Label htmlFor="edit-convocatoria">Convocatoria abierta</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-imagen">Imagen <span className="text-muted-foreground font-normal">(opcional)</span></Label>
            <Input id="edit-imagen" placeholder="URL de la imagen" {...register("imagen")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-objetivoGeneral">Objetivo General</Label>
            <Textarea id="edit-objetivoGeneral" placeholder="Objetivo general del programa" {...register("objetivoGeneral")} />
            {errors.objetivoGeneral && (
              <p className="text-sm text-destructive">{errors.objetivoGeneral.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-objetivosEspecificos">Objetivos Específicos</Label>
            <Textarea id="edit-objetivosEspecificos" placeholder="Objetivos específicos del programa" {...register("objetivosEspecificos")} />
            {errors.objetivosEspecificos && (
              <p className="text-sm text-destructive">{errors.objetivosEspecificos.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-perfilPosgraduado">Perfil del Posgraduado</Label>
            <Textarea id="edit-perfilPosgraduado" placeholder="Perfil del posgraduado" {...register("perfilPosgraduado")} />
            {errors.perfilPosgraduado && (
              <p className="text-sm text-destructive">{errors.perfilPosgraduado.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-lineasInvestigacion">Líneas de Investigación</Label>
            <Textarea id="edit-lineasInvestigacion" placeholder="Líneas de investigación" {...register("lineasInvestigacion")} />
            {errors.lineasInvestigacion && (
              <p className="text-sm text-destructive">{errors.lineasInvestigacion.message}</p>
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
