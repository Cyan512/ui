import { AboutMetrics } from '@/src/types/page-content/about-content';

interface Props {
  data: AboutMetrics;
}
export default function Metrics({ data }: Props) {
  return (
    <section className="py-16 border-y border-[#E8E4DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {data.metrics.map((stat) => (
            <div key={stat.id} className="text-center">
              <p className="font-headline text-4xl lg:text-5xl text-primary mb-3">
                {stat.number}
                {stat.more && <span>+</span>}
              </p>
              <p className="text-neutral text-sm tracking-wide font-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
