import { CTA } from '@/src/types/shared';

interface Props {
  data: CTA;
}
export default function SectionCta({ data }: Props) {
  return <section>{data.header.title}</section>;
}
