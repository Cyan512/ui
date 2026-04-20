import { StrapiEntity } from '@/src/types/strapi';
import { SectionCTA, Img, Link } from '@/src/types/shared';
import { TestimonialEntity } from '@/src/types/testimonial.entity';

export interface HomeHero {
  __component: 'home.home-hero';
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: Img;
  links: Link[];
}

export interface HomeAbout {
  __component: 'home.home-about';
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: Img;
  link: Link;
}

export interface HomeRooms {
  __component: 'home.home-rooms';
  id: number;
  title: string;
  subtitle: string;
  link: Link;
}

export interface HomeServices {
  __component: 'home.home-services';
  id: number;
  title: string;
  subtitle: string;
  link: Link;
}

export interface HomeTestimonials {
  __component: 'home.home-testimonials';
  id: number;
  title: string;
  subtitle: string;
  testimonials: TestimonialEntity[];
  link: Link;
}

export type HomeBlocks =
  | HomeHero
  | HomeAbout
  | HomeRooms
  | HomeServices
  | HomeTestimonials
  | SectionCTA;

export type HomeContent = StrapiEntity<{
  content: HomeBlocks[];
}>;
