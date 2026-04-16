import { CTA, Hero } from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export type RoomBlocks = Hero | CTA;

export type RoomContent = StrapiEntity<{
  content: RoomBlocks[];
}>;
