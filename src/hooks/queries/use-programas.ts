import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type {
  ApiResponse,
  Programa,
  CrearProgramaRequest,
  ActualizarProgramaRequest,
  ProgramasFilters,
} from "@/types"

export function useProgramas(filters?: ProgramasFilters) {
  return useQuery({
    queryKey: ["programas", filters],
    queryFn: () =>
      api
        .get<ApiResponse<Programa[]>>("/programas", { params: filters })
        .then((r) => r.data.data),
  })
}

export function usePrograma(slug: string) {
  return useQuery({
    queryKey: ["programa", slug],
    queryFn: () =>
      api
        .get<ApiResponse<Programa>>(`/programas/${slug}`)
        .then((r) => r.data.data),
    enabled: !!slug,
  })
}

export function useCrearPrograma() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CrearProgramaRequest) =>
      api.post<ApiResponse<Programa>>("/programas", data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["programas"] })
    },
  })
}

export function useActualizarPrograma() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: ActualizarProgramaRequest }) =>
      api.put<ApiResponse<Programa>>(`/programas/${slug}`, data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["programas"] })
    },
  })
}

export function useEliminarPrograma() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (slug: string) =>
      api.delete<ApiResponse<null>>(`/programas/${slug}`).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["programas"] })
    },
  })
}
