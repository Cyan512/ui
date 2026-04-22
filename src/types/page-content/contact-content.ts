import { StrapiEntity } from '@/src/types/strapi';
import { SectionContact, SectionHero, SectionMap } from '@/src/types/shared';

export type ContactBlocks = SectionHero | SectionContact | SectionMap;

export type ContactContent = StrapiEntity<{
  content: ContactBlocks[];
}>;
