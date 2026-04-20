'use client';

import { ReactElement } from 'react';
import Container from '@/src/components/atoms/container';
import Img from '@/src/components/atoms/img';
import { Button } from '@/src/components/atoms/button';
import { FeaturedServices } from '@/src/types/page-content/service-content';

interface Props {
  data: FeaturedServices;
}

function getIcon(iconName: string) {
  const icons: Record<string, ReactElement> = {
    'check-circle': (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    star: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
    heart: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    fire: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
      </svg>
    ),
  };
  return icons[iconName] || icons['check-circle'];
}

export default function Featured({ data }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-charcoal">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-cream/80 font-body text-sm tracking-[0.2em] uppercase mb-4">
            {data.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-headline font-light text-cream leading-tight">
            {data.title}
          </h2>
          <p className="text-cream/70 font-body text-lg font-light leading-relaxed mt-6">
            {data.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.services.map((service) => (
            <div
              key={service.id}
              className="group bg-white/5 border border-white/10 hover:border-primary/50 transition-colors duration-300 overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <Img
                  image={service.image}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-primary">
                  {getIcon(service.icon)}
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-headline text-xl text-cream mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-cream/70 font-body font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button link={data.link} />
        </div>
      </Container>
    </section>
  );
}
