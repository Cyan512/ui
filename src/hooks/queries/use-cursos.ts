import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { ApiResponse, Curso, CrearCursoRequest } from "@/types"

export function useCursos() {
  return useQuery({
    queryKey: ["cursos"],
    queryFn: () =>
      api.get<ApiResponse<Curso[]>>("/cursos").then((r) => r.data.data),
  })
}

export function useCrearCurso() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CrearCursoRequest) =>
      api.post<ApiResponse<Curso>>("/cursos", data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cursos"] })
    },
  })
}
