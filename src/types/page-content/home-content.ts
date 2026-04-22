import { StrapiEntity } from '@/src/types/strapi';
import {
  SectionCTA,
  Link,
  SectionHero,
  SectionAbout,
} from '@/src/types/shared';
import { ServiceEntity } from '@/src/types/entitys/service.entity';
import { RoomEntity } from '@/src/types/entitys/room.entity';
import { TestimonialEntity } from '@/src/types/entitys/testimonial.entity';

export interface HomeRooms {
  __component: 'home.home-rooms';
  id: number;
  title: string;
  subtitle: string;
  link: Link;
  rooms: RoomEntity[];
}

export interface HomeServices {
  __component: 'home.home-services';
  id: number;
  title: string;
  subtitle: string;
  link: Link;
  services: ServiceEntity[];
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
  | SectionHero
  | SectionAbout
  | HomeRooms
  | HomeServices
  | HomeTestimonials
  | SectionCTA;

export type HomeContent = StrapiEntity<{
  content: HomeBlocks[];
}>;
