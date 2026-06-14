import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { ApiResponse, Facultad, CrearFacultadRequest } from "@/types"

export function useFacultades() {
  return useQuery({
    queryKey: ["facultades"],
    queryFn: () =>
      api.get<ApiResponse<Facultad[]>>("/facultades").then((r) => r.data.data),
  })
}

export function useCrearFacultad() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CrearFacultadRequest) =>
      api.post<ApiResponse<Facultad>>("/facultades", data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["facultades"] })
    },
  })
}
