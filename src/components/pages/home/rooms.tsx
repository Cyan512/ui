import { HomeRooms } from '@/src/types/page-content/home-content';
import { JSX } from 'react';
import { Button } from '@/src/components/atoms/button';
import Container from '@/src/components/atoms/container';

interface Props {
  data: HomeRooms;
}
export default function Rooms({ data }: Props): JSX.Element {
  return (
    <section className="py-24 lg:py-32 bg-charcoal">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
            {data.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-headline font-light text-cream leading-tight">
            {data.title}
          </h2>
        </div>
        <div className="text-center">
          <Button link={data.link} />
        </div>
      </Container>
    </section>
  );
}
