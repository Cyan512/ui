import { SectionCTA as CTA, SectionHero as Hero } from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export type GalleryBlocks = Hero | CTA;

export type GalleryContent = StrapiEntity<{
  content: GalleryBlocks[];
}>;
