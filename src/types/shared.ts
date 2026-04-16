import { StrapiMedia } from '@/src/types/strapi';

export interface Header {
  title: string;
  subtitle: string;
  description: string;
}

export interface Img {
  src: StrapiMedia;
  alt: string;
}

export interface Link {
  id: number;
  url: string;
  label: string;
}

export interface CTA {
  __component: 'shared.section-cta';
  id: number;
  header: Header;
  link: Link;
}

export interface Hero {
  __component: 'shared.section-hero';
  id: number;
  header: Header;
  image: Img;
}

export interface Stats {
  id: number;
  label: string;
  more: boolean;
  value: string;
}
