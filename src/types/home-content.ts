import { StrapiEntity } from '@/src/types/strapi';
import { Img } from '@/src/types/shared';

export interface HomeHero {
  __component: 'home.home-hero';
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: Img;
}

export type HomeContent = StrapiEntity<{ content: HomeHero[] }>;
