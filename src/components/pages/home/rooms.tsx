import { HomeRooms } from '@/src/types/page-content/home-content';
import { JSX } from 'react';
import SectionHeading from '@/src/components/atoms/section-heading';

interface Props {
  data: HomeRooms;
}
export default function Rooms({ data }: Props): JSX.Element {
  return (
    <section className="py-32 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col  items-center lg:justify-between mb-16">
          <SectionHeading
            label={data.subtitle}
            title={data.title}
            className="mb-0"
          />
        </div>
      </div>
    </section>
  );
}
