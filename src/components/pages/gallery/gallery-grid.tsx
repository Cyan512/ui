'use client';

import { FaSearchPlus } from 'react-icons/fa';
import Img from '@/src/components/atoms/img';
import { GalleryGrid } from '@/src/types/page-content/gallery-content';
import { cn } from '@/src/lib/cn';
import { useState } from 'react';

interface Props {
  data: GalleryGrid;
}

export default function Grid({ data }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = data.images?.filter((img) => img?.image.src) || [];

  if (images.length === 0) return null;
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {data.images.map((image, index) => (
            <div
              key={index}
              onClick={() => setLightboxIndex(index)}
              className={cn(
                'relative overflow-hidden cursor-pointer group',
                index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
              )}
            >
              <div
                className={cn(
                  'w-full bg-linear-to-br from-secondary/20 to-primary/15',
                  index === 0 || index === 5
                    ? 'aspect-square md:aspect-auto md:h-full min-h-75'
                    : 'aspect-square'
                )}
              >
                <Img
                  image={image.image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-all duration-500 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all duration-500 scale-50 group-hover:scale-100">
                  <FaSearchPlus size={20} className="text-charcoal" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
