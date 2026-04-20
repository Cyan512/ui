import { HomeHero } from '@/src/types/page-content/home-content';
import { JSX } from 'react';
import Img from '@/src/components/atoms/img';
import { Button } from '@/src/components/atoms/button';
import Container from '@/src/components/atoms/container';

interface Props {
  data: HomeHero;
}
export default function Hero({ data }: Props): JSX.Element {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Img image={data.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-charcoal/90 via-charcoal/60 to-transparent" />
      </div>
      <Container className="relative z-10 pt-32 pb-20 w-full">
        <div className="max-w-2xl">
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
            {data.subtitle}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-light text-cream mb-6 leading-tight">
            {data.title}
          </h1>
          <p className="text-white/70 font-body text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
            {data.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {data.links.map((link) => (
              <Button key={link.id} link={link} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
