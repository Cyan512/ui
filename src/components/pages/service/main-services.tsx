'use client';

import { ReactElement } from 'react';
import Container from '@/src/components/atoms/container';
import { Button } from '@/src/components/atoms/button';
import { MainServices } from '@/src/types/page-content/service-content';

interface Props {
  data: MainServices;
}

function getIcon(iconName: string) {
  const icons: Record<string, ReactElement> = {
    wifi: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.6-5.517 15.564-5.517 21.163 0"
        />
      </svg>
    ),
    pool: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.286L13 21l-2.286-6.857L5 12l5.714-2.286L13 3z"
        />
      </svg>
    ),
    spa: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 6V4m0 2a2 2 0 100 4 2 2 0 000-4m0 0a2 2 0 100 4 2 2 0 000-4m0 0V4m0 2a2 2 0 100 4 2 2 0 000-4"
        />
      </svg>
    ),
    restaurant: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    parking: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    '24h': (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };
  return icons[iconName] || icons['24h'];
}

export default function Main({ data }: Props) {
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
          <p className="text-neutral font-body text-lg font-light leading-relaxed mt-6">
            {data.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white p-8 border border-neutral/10 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="text-primary mb-6">{getIcon(service.icon)}</div>
              <h3 className="font-headline text-xl text-charcoal mb-3">
                {service.title}
              </h3>
              <p className="text-neutral font-body font-light leading-relaxed">
                {service.description}
              </p>
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
