import { HomeAbout } from '@/src/types/home-content';
import { JSX } from 'react';
import Container from '@/src/components/atoms/container';
import Img from '@/src/components/atoms/img';

interface Props {
  data: HomeAbout;
}

export default function About({ data }: Props): JSX.Element {
  return (
    <section className="py-32 lg:py-40 relative overflow-hidden">
      <div></div>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative">
            <div className="aspect-4/5 bg-linear-to-br from-[#D4A373]/20 to-[#C0573E]/10 relative overflow-hidden">
              <Img
                strapiUrl={data.image.src.url}
                alt={data.image.alt}
                fill
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.5em] uppercase mb-6 font-light">
              {data.header.subtitle}
            </p>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] mb-8">
              {data.header.title}
            </h2>
            <p className="leading-relaxed mb-6 font-light text-lg whitespace-pre-line">
              {data.header.description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
