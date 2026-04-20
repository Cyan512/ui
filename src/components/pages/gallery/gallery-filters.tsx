'use client';

import { useState } from 'react';
import Container from '@/src/components/atoms/container';
import { GalleryFilters } from '@/src/types/page-content/gallery-content';

interface Props {
  data: GalleryFilters;
}

export default function Filters({ data }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  return (
    <section className="py-16 bg-cream">
      <Container>
        <div className="text-center mb-12">
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4">
            {data.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-headline font-light text-charcoal leading-tight">
            {data.title}
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 font-body text-sm tracking-wider transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-primary text-cream'
                : 'bg-white text-charcoal border border-neutral/20 hover:border-primary/30'
            }`}
          >
            Todas
          </button>
          {data.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.slug)}
              className={`px-6 py-3 font-body text-sm tracking-wider transition-all duration-300 ${
                activeCategory === category.slug
                  ? 'bg-primary text-cream'
                  : 'bg-white text-charcoal border border-neutral/20 hover:border-primary/30'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
