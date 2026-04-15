import { HomeHero } from '@/src/types/home-content';
import { JSX } from 'react';
import Img from '@/src/components/atoms/img';

interface Props {
  data: HomeHero;
}
export default function Hero({ data }: Props): JSX.Element {
  console.log(data);
  return (
    <section>
      {data.header.title}
      <br />
      {data.header.subtitle}
      <br />
      {data.header.description}
      <Img
        strapiUrl={data.image.src.url}
        alt={data.image.alt}
        width={1920}
        height={1080}
      />
    </section>
  );
}
