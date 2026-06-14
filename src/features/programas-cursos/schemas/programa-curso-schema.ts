import { z } from "zod"

export const programaCursoSchema = z.object({
  idPrograma: z.coerce.number({ message: "Selecciona un programa" }),
  idCurso: z.coerce.number({ message: "Selecciona un curso" }),
  semestres: z.string().min(1, "El semestre es obligatorio").max(20, "Máximo 20 caracteres"),
})

export type ProgramaCursoSchema = z.infer<typeof programaCursoSchema>
