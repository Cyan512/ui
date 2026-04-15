import { TestimonialEntity } from '@/src/types/testimonial.entity';
import { FaStar } from 'react-icons/fa';

interface Props {
  data: TestimonialEntity;
}

export default function TestimonialCard({ data }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 lg:p-10 h-full flex flex-col">
      <div className="flex gap-1 mb-6">
        {Array.from({ length: data.rating }).map((_, i) => (
          <FaStar key={i} size={16} className="text-gold" />
        ))}
      </div>
      <p className="text-white/80 font-light leading-relaxed flex-1 mb-8 italic">
        &ldquo;{data.text}&rdquo;
      </p>
      <div className="flex items-center gap-4 pt-6 border-t border-white/10">
        <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
          <span className="text-gold font-headline text-lg">
            {data.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-white font-light">{data.name}</p>
          <p className="text-white/40 text-sm">{data.location}</p>
        </div>
      </div>
    </div>
  );
}
