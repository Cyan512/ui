import { StrapiMedia } from '@/src/types/strapi';

export interface Img {
  id: number;
  src: StrapiMedia;
  alt: string;
}

export interface Link {
  id: number;
  text: string;
  url: string;
  isExternal: boolean;
  type: 'primary' | 'secondary' | 'link';
}

export interface SectionCTA {
  __component: 'shared.section-cta';
  id: number;
  title: string;
  subtitle: string;
  description: string;
  link: Link;
}

export interface SectionHero {
  __component: 'shared.section-hero';
  id: number;
  title: string;
  subtitle: string;
  image: Img;
}

export interface Value {
  id: number;
  title: string;
  description: string;
}
