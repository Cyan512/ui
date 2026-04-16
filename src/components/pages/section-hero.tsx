import { Hero } from '@/src/types/shared';
import Img from '@/src/components/atoms/img';

interface Props {
  data: Hero;
}

export default function SectionHero({ data }: Props) {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 bg-charcoal  overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-black/30 z-10" />
        <Img
          strapiUrl={data.image.src.url}
          alt={data.image.alt}
          fill
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-20 grid place-items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-light">
            {data.header.subtitle}
          </p>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-white font-light mb-6">
            {data.header.title}
          </h1>
          <div className="w-12 h-px bg-gold mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
