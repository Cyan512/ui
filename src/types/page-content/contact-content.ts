import { SectionHero as Hero } from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export type ContactBlocks = Hero;

export type ContactContent = StrapiEntity<{
  content: ContactBlocks[];
}>;
