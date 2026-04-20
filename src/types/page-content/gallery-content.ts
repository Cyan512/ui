import {
  SectionHero as Hero,
  SectionCTA,
  GalleryImage,
  GalleryCategory,
} from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export interface GalleryFilters {
  __component: 'gallery.gallery-filters';
  id: number;
  title: string;
  subtitle: string;
  categories: GalleryCategory[];
}

export interface GalleryGrid {
  __component: 'gallery.gallery-grid';
  id: number;
  title: string;
  images: GalleryImage[];
}

export type GalleryBlocks = Hero | GalleryFilters | GalleryGrid | SectionCTA;

export type GalleryContent = StrapiEntity<{
  content: GalleryBlocks[];
}>;
