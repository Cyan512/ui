import { HomeRooms } from '@/src/types/home-content';
import { JSX } from 'react';
import Heading from '@/src/components/atoms/heading';

interface Props {
  data: HomeRooms;
}
export default function Rooms({ data }: Props): JSX.Element {
  return (
    <section className="py-32 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col  items-center lg:justify-between mb-16">
          <Heading header={data.header} className="mb-0" />
        </div>
      </div>
    </section>
  );
}
