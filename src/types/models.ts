export type Modalidad = "PRESENCIAL" | "SEMIPRESENCIAL" | "VIRTUAL"
export type Categoria = "OE" | "EE"

export interface TipoPrograma {
  id: number
  nombre: string
  imagenCard: string | null
  imagenBg: string | null
  slug: string
}

export interface CrearTipoProgramaRequest {
  nombre: string
  imagenCard?: string
  imagenBg?: string
}

export interface Facultad {
  id: number
  nombre: string
}

export interface CrearFacultadRequest {
  nombre: string
}

export interface Curso {
  id: number
  nombre: string
  creditos: number
  categoria: Categoria
}

export interface CrearCursoRequest {
  nombre: string
  creditos: number
  categoria: Categoria
}

export interface Programa {
  id: number
  idTipoPrograma: TipoPrograma
  nombre: string
  idFacultad: Facultad
  slug: string
  convocatoria: boolean
  modalidad: Modalidad
}

export interface CrearProgramaRequest {
  idTipoPrograma: number
  nombre: string
  idFacultad: number
  convocatoria?: boolean
  modalidad: Modalidad
}

export interface ProgramaCurso {
  id: number
  idPrograma: { id: number; nombre: string; slug: string }
  idCurso: { id: number; nombre: string; creditos: number; categoria: Categoria }
  semestres: string
}

export interface CrearProgramaCursoRequest {
  idPrograma: number
  idCurso: number
  semestres: string
}

export interface ProgramasFilters {
  tipoSlug?: string
  q?: string
  modalidad?: Modalidad
  idFacultad?: number
  convocatoria?: boolean
}
