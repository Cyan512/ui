'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { HomeTestimonials } from '@/src/types/page-content/home-content';
import { JSX } from 'react';
import { Button } from '@/src/components/atoms/button';
import TestimonialCard from '@/src/components/molecules/testimonial-card';

interface Props {
  data: HomeTestimonials;
}
export default function Testimonials({ data }: Props): JSX.Element {
  return (
    <section>
      {data.title}
      {data.subtitle}
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
      <Button link={data.link} />
    </section>
  );
}
