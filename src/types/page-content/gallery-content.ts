import { Img, SectionHero } from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export interface GalleryList {
  __component: 'gallery.gallery-list';
  id: number;
  images: Img[];
}

export type GalleryBlocks = SectionHero | GalleryList;

export type GalleryContent = StrapiEntity<{
  content: GalleryBlocks[];
}>;
