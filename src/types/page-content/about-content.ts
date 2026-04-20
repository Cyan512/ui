import {
  SectionCTA as CTA,
  SectionHero as Hero,
  Img,
  Stats,
} from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export interface AboutStory {
  __component: 'about.about-story';
  id: number;
  image: Img;
  stats: Stats[];
  values: Stats[];
}

export type AboutBlocks = Hero | AboutStory | CTA;

export type AboutContent = StrapiEntity<{
  content: AboutBlocks[];
}>;
