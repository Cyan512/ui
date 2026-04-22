'use client';

import { FaSearchPlus } from 'react-icons/fa';
import Img from '@/src/components/atoms/img';
import { GalleryGrid } from '@/src/types/page-content/gallery-content';
import { cn } from '@/src/lib/cn';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import environment from '@/src/environment';

interface Props {
  data: GalleryGrid;
}

export default function Grid({ data }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const images = data.images?.filter((img) => img?.src?.url) || [];

  const getImageUrl = (img: (typeof images)[number]) => {
    const bestFormat =
      img.src.formats?.large?.url ||
      img.src.formats?.medium?.url ||
      img.src.formats?.small?.url ||
      img.src.url;
    return bestFormat.startsWith('http')
      ? bestFormat
      : `${environment.strapi.apiEndpoint}${bestFormat}`;
  };

  if (images.length === 0) return null;
  return (
    <>
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
                className={cn(
                  'relative overflow-hidden cursor-pointer group',
                  index === 0 || index === 6
                    ? 'md:col-span-2 md:row-span-2'
                    : ''
                )}
              >
                <div
                  className={cn(
                    'w-full bg-linear-to-br from-secondary/20 to-primary/15',
                    index === 0 || index === 6
                      ? 'aspect-square md:aspect-auto md:h-full min-h-75'
                      : 'aspect-square'
                  )}
                >
                  <Img image={image} className="w-full h-full object-cover" />
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
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={images.map((img) => ({ src: getImageUrl(img) }))}
      />
    </>
  );
}
