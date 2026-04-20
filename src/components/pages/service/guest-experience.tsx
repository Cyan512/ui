'use client';

import Container from '@/src/components/atoms/container';
import Img from '@/src/components/atoms/img';
import { GuestExperience } from '@/src/types/page-content/service-content';

interface Props {
  data: GuestExperience;
}

export default function Experience({ data }: Props) {
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
          {data.items.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-neutral/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Img
                  image={item.image}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="font-headline text-lg text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral font-body font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
