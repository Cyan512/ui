import { CTA } from '@/src/types/shared';
import Container from '@/src/components/atoms/container';
import Heading from '@/src/components/atoms/heading';

interface Props {
  data: CTA;
}
export default function SectionCta({ data }: Props) {
  return (
    <section className="py-32 lg:py-40 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-gold/5 rounded-full blur-[150px]" />
      </div>
      <Container size="lg">
        <div className="text-center relative z-10">
          <Heading header={data.header} variant="dark" />
        </div>
      </Container>
    </section>
  );
}
