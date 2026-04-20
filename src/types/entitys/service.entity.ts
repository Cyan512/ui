import { Img } from '@/src/types/shared';

export interface ServicelEntity {
  id: number;
  title: string;
  slug: string;
  description: string;
  images: Img[];
}
