import { SectionHero as Hero } from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export type ServiceBlocks = Hero;

export type ServiceContent = StrapiEntity<{
  content: ServiceBlocks[];
}>;
