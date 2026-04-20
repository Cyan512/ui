import { HomeServices } from '@/src/types/page-content/home-content';
import { JSX } from 'react';
import { Button } from '@/src/components/atoms/button';

interface Props {
  data: HomeServices;
}
export default function Services({ data }: Props): JSX.Element {
  return (
    <section>
      {data.title}
      {data.subtitle}
      <Button link={data.link} />
    </section>
  );
}
