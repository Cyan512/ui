import { SectionHero as Hero, Social } from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export interface ContactInfo {
  __component: 'contact.contact-info';
  id: number;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
}

export interface ContactMap {
  __component: 'contact.contact-map';
  id: number;
  title: string;
  embedUrl: string;
}

export interface ContactForm {
  __component: 'contact.contact-form';
  id: number;
  title: string;
  subtitle: string;
}

export interface ContactSocial {
  __component: 'contact.contact-social';
  id: number;
  title: string;
  subtitle: string;
  socials: Social[];
}

export type ContactBlocks = Hero | ContactInfo | ContactMap | ContactForm;

export type ContactContent = StrapiEntity<{
  content: ContactBlocks[];
}>;
