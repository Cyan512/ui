import { z } from "zod"

export const programaSchema = z.object({
  idTipoPrograma: z.coerce.number({ message: "Selecciona un tipo de programa" }),
  nombre: z.string().min(1, "El nombre es obligatorio").max(200, "Máximo 200 caracteres"),
  idFacultad: z.coerce.number({ message: "Selecciona una facultad" }),
  modalidad: z.enum(["PRESENCIAL", "SEMIPRESENCIAL", "VIRTUAL"] as const, {
    message: "Selecciona una modalidad",
  }),
  convocatoria: z.boolean().optional(),
})

export type ProgramaSchema = z.infer<typeof programaSchema>
