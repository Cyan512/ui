import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { ApiResponse, TipoPrograma, CrearTipoProgramaRequest } from "@/types"

export function useTiposPrograma() {
  return useQuery({
    queryKey: ["tipos-programa"],
    queryFn: () =>
      api.get<ApiResponse<TipoPrograma[]>>("/tipos-programa").then((r) => r.data.data),
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
