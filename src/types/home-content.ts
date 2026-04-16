import { StrapiEntity } from '@/src/types/strapi';
import { CTA, Header, Img, Link } from '@/src/types/shared';
import { TestimonialEntity } from '@/src/types/testimonial.entity';

export interface HomeHero {
  __component: 'home.home-hero';
  id: number;
  header: Header;
  image: Img;
  links: Link[];
}

export interface HomeAbout {
  __component: 'home.home-about';
  id: number;
  header: Header;
  image: Img;
  link: Link;
}

export interface HomeRooms {
  __component: 'home.home-rooms';
  id: number;
  header: Header;
  link: Link;
}

export interface HomeServices {
  __component: 'home.home-services';
  id: number;
  header: Header;
  link: Link;
}

export interface HomeTestimonials {
  __component: 'home.home-testimonials';
  id: number;
  header: Header;
  testimonials: TestimonialEntity[];
  link: Link;
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
