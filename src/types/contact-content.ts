import { CTA, Hero } from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export type ContactBlocks = Hero | CTA;

export type ContactContent = StrapiEntity<{
  content: ContactBlocks[];
}>;
