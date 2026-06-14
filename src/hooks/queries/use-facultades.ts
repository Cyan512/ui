import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { ApiResponse, Facultad, CrearFacultadRequest, ActualizarFacultadRequest } from "@/types"

export function useFacultades() {
  return useQuery({
    queryKey: ["facultades"],
    queryFn: () =>
      api.get<ApiResponse<Facultad[]>>("/facultades").then((r) => r.data.data),
  })
}

export function useFacultad(id: number) {
  return useQuery({
    queryKey: ["facultad", id],
    queryFn: () =>
      api.get<ApiResponse<Facultad>>(`/facultades/${id}`).then((r) => r.data.data),
    enabled: !!id,
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

export function useActualizarFacultad() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ActualizarFacultadRequest }) =>
      api.put<ApiResponse<Facultad>>(`/facultades/${id}`, data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["facultades"] })
    },
  })
}

export function useEliminarFacultad() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      api.delete<ApiResponse<null>>(`/facultades/${id}`).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["facultades"] })
    },
  })
}
