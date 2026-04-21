'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { HomeTestimonials } from '@/src/types/page-content/home-content';
import { JSX } from 'react';
import { Button } from '@/src/components/atoms/button';
import Container from '@/src/components/atoms/container';
import TestimonialCard from '@/src/components/molecules/testimonial-card';
import SectionHeading from '@/src/components/atoms/section-heading';

interface Props {
  data: HomeTestimonials;
}
export default function Testimonials({ data }: Props): JSX.Element {
  return (
    <section className="py-32 lg:py-40 bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading
          label={data.subtitle}
          title={data.title}
          variant="dark"
        />
      </div>
    </section>
  );
}
