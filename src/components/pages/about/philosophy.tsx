import Container from '@/src/components/atoms/container';
import { AboutPhilosophy } from '@/src/types/page-content/about-content';

interface Props {
  data: AboutPhilosophy;
}

export default function Philosophy({ data }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
            {data.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-headline font-light text-charcoal mb-6 leading-tight">
            {data.title}
          </h2>
          <p className="text-neutral font-body text-lg font-light leading-relaxed">
            {data.description}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {data.values.map((value) => (
            <div
              key={value.id}
              className="text-center p-8 border border-primary/10 hover:border-primary/30 transition-colors duration-300"
            >
              <h3 className="text-2xl font-headline font-light text-charcoal mb-4">
                {value.title}
              </h3>
              <p className="text-neutral font-body font-light leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
