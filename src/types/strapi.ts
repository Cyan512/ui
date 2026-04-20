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

export interface StrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface StrapiMediaFormats {
  thumbnail?: StrapiMediaFormat;
  small?: StrapiMediaFormat;
  medium?: StrapiMediaFormat;
  large?: StrapiMediaFormat;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  focalPoint: unknown | null;
  width: number;
  height: number;
  formats?: StrapiMediaFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
