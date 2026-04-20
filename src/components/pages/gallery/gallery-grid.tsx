'use client';

import { useState } from 'react';
import Container from '@/src/components/atoms/container';
import Img from '@/src/components/atoms/img';
import { GalleryGrid } from '@/src/types/page-content/gallery-content';

interface Props {
  data: GalleryGrid;
}

export default function Grid({ data }: Props) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  const selectedItem = data.images.find((img) => img.id === selectedImage);

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <Container>
        {data.title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-light text-charcoal leading-tight">
              {data.title}
            </h2>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
              onClick={() => openLightbox(image.id)}
            >
              <Img
                image={image.image}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                fill
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-12 h-12 text-cream"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {selectedImage && selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-cream hover:text-primary transition-colors"
            onClick={closeLightbox}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="relative max-w-5xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Img
              image={selectedItem.image}
              className="w-full h-full object-contain"
              fill
            />
          </div>
        </div>
      )}
    </section>
  );
}
