import { SectionHero as Hero } from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export type RoomBlocks = Hero;

export type RoomContent = StrapiEntity<{
  content: RoomBlocks[];
}>;
