'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import { HomeServices } from '@/src/types/page-content/home-content';
import { JSX } from 'react';
import SectionHeading from '@/src/components/atoms/section-heading';

interface Props {
  data: HomeServices;
}
export default function Services({ data }: Props): JSX.Element {
  return (
    <section className="py-32 lg:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading label={data.subtitle} title={data.title} />
      </div>
    </section>
  );
}
