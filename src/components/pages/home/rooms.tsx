import { HomeRooms } from '@/src/types/home-content';
import { JSX } from 'react';

interface Props {
  data: HomeRooms;
}
export default function Rooms({ data }: Props): JSX.Element {
  return (
    <section>
      <div>{data.header.title}</div>
    </section>
  );
}
