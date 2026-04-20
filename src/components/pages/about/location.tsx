import Img from '@/src/components/atoms/img';
import Container from '@/src/components/atoms/container';
import { AboutLocation } from '@/src/types/page-content/about-content';

interface Props {
  data: AboutLocation;
}

export default function Location({ data }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
              {data.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-headline font-light text-charcoal mb-6 leading-tight">
              {data.title}
            </h2>
            <p className="text-neutral font-body text-lg font-light leading-relaxed mb-8">
              {data.description}
            </p>
            <div className="flex items-start gap-4">
              <svg
                className="w-6 h-6 text-primary shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <h3 className="font-headline text-lg text-charcoal mb-2">
                  Dirección
                </h3>
                <p className="text-neutral font-body font-light">
                  {data.address}
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-4/3 overflow-hidden">
              <Img
                image={data.image}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
