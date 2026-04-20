import { SectionHero as Hero } from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export type GalleryBlocks = Hero;

export type GalleryContent = StrapiEntity<{
  content: GalleryBlocks[];
}>;
