import Container from '@/src/components/atoms/container';
import { AboutHistory } from '@/src/types/page-content/about-content';

interface Props {
  data: AboutHistory;
}

export default function History({ data }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
            {data.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-headline font-light text-charcoal mb-8 leading-tight">
            {data.title}
          </h2>
          <p className="text-neutral font-body text-lg font-light leading-relaxed mb-12">
            {data.description}
          </p>
          <div className="inline-block border border-primary/20 px-8 py-4">
            <span className="text-6xl md:text-7xl font-headline font-light text-primary">
              {data.year}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
