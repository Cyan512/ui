import Divider from '@/src/components/atoms/divider';
import Img from '@/src/components/atoms/img';
import { SectionAbout } from '@/src/types/shared';

interface Props {
  data: SectionAbout;
}

export default function History({ data }: Props) {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="aspect-4/5 bg-linear-to-br from-secondary/20 to-primary/10 relative">
            <Img image={data.image} fill className="object-cover " />
          </div>
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-light">
              {data.subtitle}
            </p>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-charcoal font-light mb-8 leading-tight">
              {data.title}
            </h2>
            <Divider size="sm" color="gold" className="mb-8" />
            <p className="text-neutral leading-relaxed mb-6 font-light whitespace-pre-line">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
