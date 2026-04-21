'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { HomeServices } from '@/src/types/page-content/home-content';
import { JSX } from 'react';
import { Button } from '@/src/components/atoms/button';
import Container from '@/src/components/atoms/container';
import ServiceCard from '@/src/components/molecules/service-card';

interface Props {
  data: HomeServices;
}
export default function Services({ data }: Props): JSX.Element {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4">
            {data.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-headline font-light text-charcoal leading-tight">
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
          {data.services?.map((service) => (
            service?.title ? (
              <SwiperSlide key={service.id}>
                <ServiceCard data={service} />
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
