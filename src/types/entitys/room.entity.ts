import { Img } from '@/src/types/shared';

export interface RoomEntity {
  id: number;
  name: string;
  slug: string;
  description: string;
  images: Img[];
}
