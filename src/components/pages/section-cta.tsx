import { SectionCTA as CTA } from '@/src/types/shared';
import { Button } from '@/src/components/atoms/button';
import Container from '@/src/components/atoms/container';
import SectionHeading from '@/src/components/atoms/section-heading';

interface Props {
  data: CTA;
}
export default function SectionCTA({ data }: Props) {
  return (
    <section className="py-32 lg:py-40 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-gold/5 rounded-full blur-[150px]" />
      </div>
      <Container size="lg">
        <div className="text-center relative z-10">
          <SectionHeading
            label={data.subtitle}
            title={data.title}
            subtitle={data.description}
            variant="dark"
          />
          <Button link={data.link} />
        </div>
      </Container>
    </section>
  );
}
