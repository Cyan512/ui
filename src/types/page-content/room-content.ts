import { SectionCTA as CTA, SectionHero as Hero } from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export type RoomBlocks = Hero | CTA;

export type RoomContent = StrapiEntity<{
  content: RoomBlocks[];
}>;
