import { z } from "zod"

export const tipoProgramaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
  imagenCard: z.string().optional(),
  imagenBg: z.string().optional(),
})

export type TipoProgramaSchema = z.infer<typeof tipoProgramaSchema>
