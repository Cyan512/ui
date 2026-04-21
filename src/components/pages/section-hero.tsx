import { SectionHero as Hero } from '@/src/types/shared';
import Img from '@/src/components/atoms/img';
import Container from '@/src/components/atoms/container';
import NextImage from 'next/image';
interface Props {
  data: Hero;
}

export default function SectionHero({ data }: Props) {
  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Img
            image={data.image}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/40" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-cream/80 font-body text-sm tracking-[0.2em] uppercase mb-4 animate-fade-in">
              {data.subtitle}
            </p>
            <h1 className="text-5xl md:text-7xl font-headline font-light text-cream mb-6 leading-tight animate-fade-in-up">
              {data.title}
            </h1>
          </div>
        </Container>
      </section>
      <NextImage
        src="https://strapi.hostal-korikallpa.com/uploads/hero_bg_1_3_910e858a_159a8f399e.jpg"
        alt={data.title}
        width="200"
        height="200"
      />
      <img
        src="https://strapi.hostal-korikallpa.com/uploads/hero_bg_1_3_910e858a_159a8f399e.jpg"
        alt="asda"
      />
      <NextImage
        src="https://strapi.hostal-korikallpa.com/uploads/hero_bg_1_3_910e858a_159a8f399e.jpg"
        alt="Habitaciones"
        width={1200}
        height={800}
        unoptimized
      />
    </>
  );
}
