import { HomeRooms } from '@/src/types/page-content/home-content';
import { JSX } from 'react';
import { Button } from '@/src/components/atoms/button';

interface Props {
  data: HomeRooms;
}
export default function Rooms({ data }: Props): JSX.Element {
  return (
    <section>
      {data.title}
      {data.subtitle}
      <Button link={data.link} />
    </section>
  );
}
