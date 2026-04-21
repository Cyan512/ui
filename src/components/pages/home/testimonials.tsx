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

interface Props {
  data: HomeTestimonials;
}
export default function Testimonials({ data }: Props): JSX.Element {
  return (
    <section className="py-24 lg:py-32 bg-charcoal">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
            {data.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-headline font-light text-cream leading-tight">
            {data.title}
          </h2>
        </div>
      </Container>
      <Container size="full">
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
          {data.testimonials?.map((testimonial) => (
            testimonial?.text ? (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard data={testimonial} />
              </SwiperSlide>
            ) : null
          ))}
        </Swiper>
      </Container>
      <Container>
        <div className="text-center mt-12">
          <Button link={data.link} />
        </div>
      </Container>
    </section>
  );
}
