export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export type StrapiEntity<T> = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
} & T;

export interface StrapiMedia {
  url: string;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width?: number; height?: number }>;
}
