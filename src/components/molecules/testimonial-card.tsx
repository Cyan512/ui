import { TestimonialEntity } from '@/src/types/entitys/testimonial.entity';
import { FaStar } from 'react-icons/fa';
import { JSX } from 'react';

interface Props {
  data: TestimonialEntity;
}

export default function TestimonialCard({ data }: Props): JSX.Element {
  return (
    <div className="h-full p-8 bg-white/5">
      <div className="flex gap-1 mb-6">
        {Array.from({ length: data.rating }).map((_, i) => (
          <FaStar key={i} className="text-gold w-4 h-4" />
        ))}
      </div>
      <p className="text-neutral font-body text-base font-light leading-relaxed mb-8">
        {data.text}
      </p>
      <div className="border-t border-white/10 pt-6">
        <p className="text-cream font-headline text-lg font-medium">
          {data.name}
        </p>
        <p className="text-neutral/70 font-body text-sm mt-1">
          {data.location}
        </p>
      </div>
    </div>
  );
}
