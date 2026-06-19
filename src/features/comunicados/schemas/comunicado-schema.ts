import { z } from "zod"

export const comunicadoSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio").max(200, "Máximo 200 caracteres"),
  resumen: z.string().min(1, "El resumen es obligatorio"),
  contenido: z.string().min(1, "El contenido es obligatorio"),
  imagen: z.string().optional(),
})

export type ComunicadoSchema = z.infer<typeof comunicadoSchema>
