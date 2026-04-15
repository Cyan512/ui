import { StrapiEntity } from '@/src/types/strapi';
import { CTA, Header, Img } from '@/src/types/shared';

export interface HomeHero {
  __component: 'home.home-hero';
  id: number;
  header: Header;
  image: Img;
}

export interface HomeAbout {
  __component: 'home.home-about';
  id: number;
  header: Header;
  image: Img;
}

export interface HomeRooms {
  __component: 'home.home-rooms';
  id: number;
  header: Header;
}

export interface HomeServices {
  __component: 'home.home-services';
  id: number;
  header: Header;
}

export interface HomeTestimonials {
  __component: 'home.home-testimonials';
  id: number;
  header: Header;
}

export type HomeBlocks =
  | HomeHero
  | HomeAbout
  | HomeRooms
  | HomeServices
  | HomeTestimonials
  | CTA;

export type HomeContent = StrapiEntity<{
  content: HomeBlocks[];
}>;
