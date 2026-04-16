import { HomeHero } from '@/src/types/home-content';
import { JSX } from 'react';
import Img from '@/src/components/atoms/img';
import { Link } from '@/src/i18n/navigation';
import { Button } from '@/src/components/atoms/button';
interface Props {
  data: HomeHero;
}
export default function Hero({ data }: Props): JSX.Element {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-black/30 z-10" />
        <Img
          strapiUrl={data.image.src.url}
          alt={data.image.alt}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 z-20 grid place-items-center">
        <div className="text-center px-6 max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="inline-block w-20 h-px bg-gold mb-6 mx-auto" />
            <p className="text-gold text-xs tracking-[0.5em] uppercase mb-8 font-light">
              {data.header.subtitle}
            </p>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-light tracking-wide leading-[1.1] mb-6 md:mb-10">
            <span className="block whitespace-pre-line">
              {data.header.title}
            </span>
          </h1>
          <p className="text-white/70 text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed">
            <span className="block whitespace-pre-line">
              {data.header.description}
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {data.links.map((link) => (
              <Button key={link.id} href={link.url}>
                {link.label}
              </Button>
            ))}
            <Link
              href="/rooms"
              className="group px-14 py-5 bg-gold hover:bg-[#B89952] text-white text-xs tracking-[0.2em] uppercase transition-all duration-500 relative overflow-hidden"
            >
              <span className="relative z-10">Descubrir</span>
              <div className="absolute inset-0 bg-linear-to-r from-secondary to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link
              href="/contact"
              className="px-14 py-5 border border-white/40 hover:border-white/80 hover:bg-white/10 text-white text-xs tracking-[0.2em] uppercase transition-all duration-500"
            >
              Contactar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
