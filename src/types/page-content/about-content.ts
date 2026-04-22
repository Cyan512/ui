import { StrapiEntity } from '@/src/types/strapi';
import {
  SectionHero,
  SectionCTA,
  Value,
  Metric,
  SectionAbout,
} from '@/src/types/shared';

export interface AboutMetrics {
  __component: 'about.about-metrics';
  id: number;
  metrics: Metric[];
}

export interface AboutPhilosophy {
  __component: 'about.about-philosophy';
  id: number;
  values: Value[];
}

export type AboutBlocks =
  | SectionHero
  | SectionAbout
  | AboutMetrics
  | AboutPhilosophy
  | SectionCTA;

export type AboutContent = StrapiEntity<{
  content: AboutBlocks[];
}>;
