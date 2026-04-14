import type { HomeContent, HomeHero } from '@/src/types/home-content';
import Img from '@/src/components/atoms/img';
import { getContentSection } from '@/src/api/get-content-section';
import { Link } from '@/src/i18n/navigation';

type Props = {
  data: HomeHero;
  endpoint: string;
  locale: string;
};

export default async function HomeHero({ data, endpoint, locale }: Props) {
  const componentSection = 'home.home-hero';
  const res = await getContentSection<HomeContent>(
    endpoint,
    componentSection,
    locale
  );
  const content = res.data.content[0];
  console.log(content);
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-black/30 z-10" />
        <Img
          strapiUrl={content.image.src.url}
          alt={content.image.alt}
          width={1920}
          height={1080}
          fallback="/placeholder.svg"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center px-6 max-w-5xl mx-auto">
          <span className="inline-block w-20 h-px bg-gold mb-6 mx-auto" />
          <p className="text-gold text-xs tracking-[0.5em] uppercase mb-8 font-light">
            {content.header.subtitle}
          </p>

          <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-light tracking-wide leading-[1.1] mb-10">
            <span className="block whitespace-pre-line">
              {content.header.title}
            </span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-14 leading-relaxed">
            <span className="block whitespace-pre-line">
              {content.header.description}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
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

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="flex flex-col items-center gap-3">
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <svg
            className="w-5 h-5 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
