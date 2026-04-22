import { SectionCTA as CTA } from '@/src/types/shared';
import { Button } from '@/src/components/atoms/button';

interface Props {
  data: CTA;
}

export default function SectionCTA({ data }: Props) {
  return (
    <section className="py-20 lg:py-32 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        {data.subtitle && (
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-light">
            {data.subtitle}
          </p>
        )}
        <h2 className="font-headline text-3xl md:text-4xl font-light mb-8">
          {data.title}
        </h2>
        <p className="text-white/60 font-light max-w-2xl mx-auto mb-10">
          {data.description}
        </p>
        <Button link={data.link} />
      </div>
    </section>
  );
}
