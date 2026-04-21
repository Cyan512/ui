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
      <div className="relative z-20 inset-0 grid place-items-center w-full">
        <div className="text-center px-6 max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="inline-block w-20 h-px bg-gold mb-6 mx-auto" />
            <p className="text-gold text-xs tracking-[0.5em] uppercase mb-8 font-light whitespace-pre-line">
              {data.subtitle}
            </p>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-light tracking-wide leading-[1.1] mb-6 md:mb-10">
            <span className="block whitespace-pre-line">{data.title}</span>
          </h1>
          <p className="text-white/70 text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed">
            <span className="block whitespace-pre-line">
              {data.description}
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {data.links.map((link) => (
              <Button key={link.id} link={link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
