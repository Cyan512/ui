import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { ApiResponse, TipoPrograma, CrearTipoProgramaRequest, ActualizarTipoProgramaRequest } from "@/types"

export function useTiposPrograma() {
  return useQuery({
    queryKey: ["tipos-programa"],
    queryFn: () =>
      api.get<ApiResponse<TipoPrograma[]>>("/tipos-programa").then((r) => r.data.data),
  })
}

export function useTipoPrograma(slug: string) {
  return useQuery({
    queryKey: ["tipo-programa", slug],
    queryFn: () =>
      api.get<ApiResponse<TipoPrograma>>(`/tipos-programa/${slug}`).then((r) => r.data.data),
    enabled: !!slug,
  })
}

export function useCrearTipoPrograma() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CrearTipoProgramaRequest) =>
      api.post<ApiResponse<TipoPrograma>>("/tipos-programa", data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tipos-programa"] })
    },
  })
}

export function useActualizarTipoPrograma() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: ActualizarTipoProgramaRequest }) =>
      api.put<ApiResponse<TipoPrograma>>(`/tipos-programa/${slug}`, data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tipos-programa"] })
    },
  })
}

export function useEliminarTipoPrograma() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (slug: string) =>
      api.delete<ApiResponse<null>>(`/tipos-programa/${slug}`).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tipos-programa"] })
    },
  })
}
