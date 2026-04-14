import { StrapiMedia } from '@/src/types/strapi';

export interface Img {
  src: StrapiMedia;
  alt: string;
}

export interface Header {
  title: string;
  subtitle: string;
  description: string;
}
