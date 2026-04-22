import { AboutPhilosophy } from '@/src/types/page-content/about-content';

interface Props {
  data: AboutPhilosophy;
}

export default function Philosophy({ data }: Props) {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.values.map((value) => (
            <div
              key={value.id}
              className="bg-white p-10 border border-[#E8E4DF]"
            >
              <h3 className="font-headline text-2xl text-charcoal mb-4">
                {value.title}
              </h3>
              <p className="text-neutral font-light leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
