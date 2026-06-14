import { z } from "zod"

export const cursoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(200, "Máximo 200 caracteres"),
  creditos: z.coerce.number().int().min(1, "Mínimo 1 crédito"),
  categoria: z.enum(["OE", "EE"] as const, { message: "Selecciona una categoría" }),
})

export type CursoSchema = z.infer<typeof cursoSchema>
