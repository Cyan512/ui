import { SectionCTA as CTA } from '@/src/types/shared';
import { Button } from '@/src/components/atoms/button';

interface Props {
  data: CTA;
}
export default function SectionCTA({ data }: Props) {
  return (
    <section>
      {data.title}
      {data.subtitle}
      {data.description}
      <Button link={data.link} />
    </section>
  );
}
