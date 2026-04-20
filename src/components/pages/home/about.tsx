import { HomeAbout } from '@/src/types/page-content/home-content';
import { JSX } from 'react';
import Img from '@/src/components/atoms/img';
import { Button } from '@/src/components/atoms/button';
import Container from '@/src/components/atoms/container';

interface Props {
  data: HomeAbout;
}

export default function About({ data }: Props): JSX.Element {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-4/5 overflow-hidden">
              <Img image={data.image} className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4">
              {data.subtitle}
            </p>
            <h2 className="text-4xl md:text-5xl font-headline font-light text-charcoal mb-6 leading-tight">
              {data.title}
            </h2>
            <p className="text-neutral font-body text-lg font-light leading-relaxed mb-8">
              {data.description}
            </p>
            <Button link={data.link} />
          </div>
        </div>
      </Container>
    </section>
  );
}
