import {
  SectionHero as Hero,
  Img,
  SectionCTA,
  Value,
} from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export interface AboutHistory {
  __component: 'about.about-history';
  id: number;
  title: string;
  subtitle: string;
  description: string;
  year: string;
}

export interface AboutPhilosophy {
  __component: 'about.about-philosophy';
  id: number;
  title: string;
  subtitle: string;
  description: string;
  values: Value[];
}

export interface AboutLocation {
  __component: 'about.about-location';
  id: number;
  title: string;
  subtitle: string;
  description: string;
  address: string;
  googleMapsUrl: string;
}
export type AboutBlocks =
  | Hero
  | AboutHistory
  | AboutPhilosophy
  | AboutLocation
  | SectionCTA;

export type AboutContent = StrapiEntity<{
  content: AboutBlocks[];
}>;
