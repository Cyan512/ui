'use client';

import { useState } from 'react';

import Container from '@/src/components/atoms/container';
import { ServiceFAQ } from '@/src/types/page-content/service-content';

interface Props {
  data: ServiceFAQ;
}

export default function FAQ({ data }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4">
            {data.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-headline font-light text-charcoal leading-tight">
            {data.title}
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          {data.items.map((item, index) => (
            <div
              key={item.id}
              className="border-b border-neutral/20 last:border-b-0"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <span className="font-headline text-lg text-charcoal pr-4">
                  {item.question}
                </span>
                <span className="shrink-0 text-primary">
                  {openIndex === index ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? 'max-h-40 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="pb-6 text-neutral font-body font-light leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
