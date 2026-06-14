import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { ApiResponse, ProgramaCurso, CrearProgramaCursoRequest } from "@/types"

export function useProgramasCursos() {
  return useQuery({
    queryKey: ["programas-cursos"],
    queryFn: () =>
      api.get<ApiResponse<ProgramaCurso[]>>("/programas-cursos").then((r) => r.data.data),
  })
}

export function useCrearProgramaCurso() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CrearProgramaCursoRequest) =>
      api.post<ApiResponse<ProgramaCurso>>("/programas-cursos", data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["programas-cursos"] })
    },
  })
}
