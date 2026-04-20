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

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface FeaturedService {
  id: number;
  title: string;
  description: string;
  image: Img;
  icon: string;
}

export interface GuestExperienceItem {
  id: number;
  title: string;
  description: string;
  image: Img;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
}

export interface GalleryImage {
  id: number;
  image: Img;
  category: string;
}

export interface Social {
  id: number;
  platform: string;
  url: string;
  icon: string;
}
