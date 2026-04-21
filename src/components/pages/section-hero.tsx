import { SectionHero as Hero } from '@/src/types/shared';
import Img from '@/src/components/atoms/img';

interface Props {
  data: Hero;
}

export default function SectionHero({ data }: Props) {
  return (
    <section className="pt-32 lg:pt-40 pb-20 bg-charcoal relative">
      <div className="absolute inset-0 z-0">
        <Img image={data.image} fill className="w-full h-full object-cover" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-light">
          {data.subtitle}
        </p>
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-white font-light mb-6">
          {data.title}
        </h1>
        <div className="w-12 h-px bg-gold mx-auto"></div>
      </div>
    </section>
  );
}
