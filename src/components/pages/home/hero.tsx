import { HomeHero } from '@/src/types/page-content/home-content';
import { JSX } from 'react';
import Img from '@/src/components/atoms/img';
import { Button } from '@/src/components/atoms/button';

interface Props {
  data: HomeHero;
}
export default function Hero({ data }: Props): JSX.Element {
  return (
    <section>
      {data.title}
      {data.subtitle}
      {data.description}
      {data.links.map((link) => (
        <Button key={link.id} link={link} />
      ))}
      <Img image={data.image} fill priority />
    </section>
  );
}
