import { SectionCTA as CTA } from '@/src/types/shared';
import { Button } from '@/src/components/atoms/button';
import Container from '@/src/components/atoms/container';

interface Props {
  data: CTA;
}
export default function SectionCTA({ data }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-primary">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-cream/80 font-body text-sm tracking-[0.2em] uppercase mb-4">
            {data.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-headline font-light text-cream mb-6 leading-tight">
            {data.title}
          </h2>
          <p className="text-cream/70 font-body text-lg font-light leading-relaxed mb-10">
            {data.description}
          </p>
          <Button link={data.link} />
        </div>
      </Container>
    </section>
  );
}
