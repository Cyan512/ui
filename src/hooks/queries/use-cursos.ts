import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { ApiResponse, Curso, CrearCursoRequest, ActualizarCursoRequest } from "@/types"

export function useCursos() {
  return useQuery({
    queryKey: ["cursos"],
    queryFn: () =>
      api.get<ApiResponse<Curso[]>>("/cursos").then((r) => r.data.data),
  })
}

export function useCurso(id: number) {
  return useQuery({
    queryKey: ["curso", id],
    queryFn: () =>
      api.get<ApiResponse<Curso>>(`/cursos/${id}`).then((r) => r.data.data),
    enabled: !!id,
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

export function useActualizarCurso() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ActualizarCursoRequest }) =>
      api.put<ApiResponse<Curso>>(`/cursos/${id}`, data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cursos"] })
    },
  })
}

export function useEliminarCurso() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      api.delete<ApiResponse<null>>(`/cursos/${id}`).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cursos"] })
    },
  })
}
