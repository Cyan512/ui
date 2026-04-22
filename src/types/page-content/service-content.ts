import { SectionHero } from '@/src/types/shared';
import { StrapiEntity } from '@/src/types/strapi';

export interface ServiceList {
  __component: 'service.service-list';
  id: number;
}

export type ServiceBlocks = SectionHero | ServiceList;

export type ServiceContent = StrapiEntity<{
  content: ServiceBlocks[];
}>;
