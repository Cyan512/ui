import { HomeAbout } from '@/src/types/page-content/home-content';
import { JSX } from 'react';
import Img from '@/src/components/atoms/img';
import { Button } from '@/src/components/atoms/button';
import Container from '@/src/components/atoms/container';
import Divider from '@/src/components/atoms/divider';

interface Props {
  data: HomeAbout;
}

export default function About({ data }: Props): JSX.Element {
  return (
    <section className="py-32 lg:py-40 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-gold/5 to-transparent" />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative z-0">
            <div className="aspect-4/5 bg-linear-to-br from-secondary/20 to-primary/10 relative overflow-hidden">
              <Img image={data.image} fill className="object-cover " />
            </div>
          </div>
          <div>
            <p className="text-gold text-xs tracking-[0.5em] uppercase mb-6 font-light whitespace-pre-line">
              {data.subtitle}
            </p>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-charcoal font-light leading-[1.15] mb-8 whitespace-pre-line">
              {data.title}
            </h2>
            <Divider size="lg" color="gold" className="mb-8" />
            <p className="text-neutral leading-relaxed mb-10 font-light whitespace-pre-line ">
              {data.description}
            </p>
            <Button link={data.link} />
          </div>
        </div>
      </Container>
    </section>
  );
}
