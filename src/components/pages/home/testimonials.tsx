'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { HomeTestimonials } from '@/src/types/home-content';
import { JSX } from 'react';
import Heading from '@/src/components/atoms/heading';
import TestimonialCard from '@/src/components/molecules/testimonial-card';

interface Props {
  data: HomeTestimonials;
}
export default function Testimonials({ data }: Props): JSX.Element {
  return (
    <section className="py-32 lg:py-40 bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Heading header={data.header} variant="dark" />
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet ',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper"
        >
          {data.testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard data={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
