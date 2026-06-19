import { z } from "zod"

export const programaSchema = z.object({
  idTipoPrograma: z.coerce.number({ message: "Selecciona un tipo de programa" }),
  nombre: z.string().min(1, "El nombre es obligatorio").max(200, "Máximo 200 caracteres"),
  idFacultad: z.coerce.number({ message: "Selecciona una facultad" }),
  modalidad: z.enum(["PRESENCIAL", "SEMIPRESENCIAL", "VIRTUAL"] as const, {
    message: "Selecciona una modalidad",
  }),
  convocatoria: z.boolean().optional(),
  imagen: z.string().optional(),
  objetivoGeneral: z.string().min(1, "El objetivo general es obligatorio"),
  objetivosEspecificos: z.string().min(1, "Los objetivos específicos son obligatorios"),
  perfilPosgraduado: z.string().min(1, "El perfil del posgraduado es obligatorio"),
  lineasInvestigacion: z.string().min(1, "Las líneas de investigación son obligatorias"),
  costoMatricula: z.string().min(1, "El costo matricual es obligatorio")
})

export type ProgramaSchema = z.infer<typeof programaSchema>
