import {
  SectionHero as Hero,
  SectionCTA,
  ServiceItem,
  Link,
  FeaturedService,
  GuestExperienceItem,
  FAQItem,
} from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export interface MainServices {
  __component: 'service.main-services';
  id: number;
  title: string;
  subtitle: string;
  description: string;
  services: ServiceItem[];
  link: Link;
}

export interface FeaturedServices {
  __component: 'service.featured-services';
  id: number;
  title: string;
  subtitle: string;
  description: string;
  services: FeaturedService[];
  link: Link;
}

export interface GuestExperience {
  __component: 'service.guest-experience';
  id: number;
  title: string;
  subtitle: string;
  description: string;
  items: GuestExperienceItem[];
}

export interface ServiceFAQ {
  __component: 'service.service-faq';
  id: number;
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export type ServiceBlocks =
  | Hero
  | MainServices
  | FeaturedServices
  | GuestExperience
  | ServiceFAQ
  | SectionCTA;

export type ServiceContent = StrapiEntity<{
  content: ServiceBlocks[];
}>;
