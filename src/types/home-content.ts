import { StrapiEntity } from '@/src/types/strapi';
import { Header, Img } from '@/src/types/shared';

export interface HomeHero {
  __component: 'home.home-hero';
  id: number;
  header: Header;
  image: Img;
}

export interface HomePhilosophy {
  __component: 'home.home-philosophy';
  id: number;
  header: Header;
  image: Img;
}

export interface HomeFeaturedRooms {
  __component: 'home.home-featured-rooms';
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

export interface HomeGastronomy {
  __component: 'home.home-gastronomy';
  id: number;
  header: Header;
  image: Img;
}

export type HomeBlocks =
  | HomeHero
  | HomePhilosophy
  | HomeFeaturedRooms
  | HomeServices
  | HomeTestimonials
  | HomeGastronomy;

export type HomeContent = StrapiEntity<{
  content: HomeBlocks[];
}>;
