import { z } from "zod"

export const programaCursoSchema = z.object({
  idPrograma: z.coerce.number({ message: "Selecciona un programa" }),
  idCurso: z.coerce.number({ message: "Selecciona un curso" }),
  semestre: z.string().min(1, "El semestre es obligatorio").max(20, "Máximo 20 caracteres"),
  costoCuota: z.coerce.number({
    message: "El costo es obligatorio",
  }),
})

export type ProgramaCursoSchema = z.infer<typeof programaCursoSchema>
