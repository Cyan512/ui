import { SectionHero } from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export interface RoomList {
  __component: 'room.room-list';
  id: number;
}

export type RoomBlocks = SectionHero | RoomList;

export type RoomContent = StrapiEntity<{
  content: RoomBlocks[];
}>;
