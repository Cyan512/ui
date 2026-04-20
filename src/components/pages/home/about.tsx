import { HomeAbout } from '@/src/types/page-content/home-content';
import { JSX } from 'react';
import Img from '@/src/components/atoms/img';
import { Button } from '@/src/components/atoms/button';

interface Props {
  data: HomeAbout;
}

export default function About({ data }: Props): JSX.Element {
  return (
    <section>
      {data.title}
      {data.subtitle}
      {data.description}
      <Button link={data.link} />
      <Img image={data.image} fill priority />
    </section>
  );
}
