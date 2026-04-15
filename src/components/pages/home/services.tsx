import { HomeServices } from '@/src/types/home-content';
import { JSX } from 'react';
import Heading from '@/src/components/atoms/heading';

interface Props {
  data: HomeServices;
}
export default function Services({ data }: Props): JSX.Element {
  return (
    <section className="py-32 lg:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Heading header={data.header} />
      </div>
    </section>
  );
}
