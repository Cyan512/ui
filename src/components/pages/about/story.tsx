import { AboutStory } from '@/src/types/about-content';
import { JSX } from 'react';
import Img from '@/src/components/atoms/img';

interface Props {
  data: AboutStory;
}
export default function Story({ data }: Props): JSX.Element {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <div className="aspect-4/5 bg-linear-to-br from-secondary/20 to-primary/10 relative">
            <Img
              strapiUrl={data.image.src.url}
              alt={data.image.alt}
              fill
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-gold/30"></div>
          </div>
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-light">
              {data.header.subtitle}
            </p>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-charcoal font-light mb-8 leading-tight">
              {data.header.title}
            </h2>
            <p className="text-neutral leading-relaxed font-light whitespace-pre-line">
              {data.header.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-24 py-16 border-y border-[#E8E4DF]">
          {data.stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <p className="font-headline text-4xl lg:text-5xl text-primary mb-3">
                {stat.value}
                {stat.more && <span>+</span>}
              </p>
              <p className="text-neutral text-sm tracking-wide font-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.values.map((value) => (
            <div
              key={value.id}
              className="bg-white p-10 border border-[#E8E4DF]"
            >
              <h3 className="font-headline text-2xl text-charcoal mb-4">
                {value.label}
              </h3>
              <p className="text-neutral font-light leading-relaxed">
                {value.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
