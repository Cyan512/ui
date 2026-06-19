import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type {
  ApiResponse,
  Comunicado,
  CrearComunicadoRequest,
  ActualizarComunicadoRequest,
} from "@/types"

export function useComunicados() {
  return useQuery({
    queryKey: ["comunicados"],
    queryFn: () =>
      api.get<ApiResponse<Comunicado[]>>("/comunicados").then((r) => r.data.data),
  })
}

export function useComunicado(slug: string) {
  return useQuery({
    queryKey: ["comunicado", slug],
    queryFn: () =>
      api
        .get<ApiResponse<Comunicado>>(`/comunicados/${slug}`)
        .then((r) => r.data.data),
    enabled: !!slug,
  })
}

export function useCrearComunicado() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CrearComunicadoRequest) =>
      api.post<ApiResponse<Comunicado>>("/comunicados", data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comunicados"] })
    },
  })
}

export function useActualizarComunicado() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: ActualizarComunicadoRequest }) =>
      api.put<ApiResponse<Comunicado>>(`/comunicados/${slug}`, data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comunicados"] })
    },
  })
}

export function useEliminarComunicado() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (slug: string) =>
      api.delete<ApiResponse<null>>(`/comunicados/${slug}`).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comunicados"] })
    },
  })
}
