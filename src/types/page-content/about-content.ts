import { SectionHero as Hero } from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export type AboutBlocks = Hero;

export type AboutContent = StrapiEntity<{
  content: AboutBlocks[];
}>;
