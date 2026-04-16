'use client';

import Image from 'next/image';
import { useState } from 'react';
import environment from '@/src/environment';

type ImgProps = {
  strapiUrl?: string | null;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  fallback?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
};

export default function Img({
  strapiUrl,
  alt,
  width,
  height,
  fill = false,
  fallback = '/placeholder.svg',
  className,
  loading = 'lazy',
}: ImgProps) {
  const [imgSrc, setImgSrc] = useState(() => {
    if (!strapiUrl || typeof strapiUrl !== 'string') return fallback;
    return strapiUrl.startsWith('http')
      ? strapiUrl
      : `${environment.strapi.apiEndpoint}${strapiUrl}`;
  });

  const altText = alt || 'Image';

  const isStrapi =
    imgSrc.includes('localhost:1337') || imgSrc.includes('192.168.1.36:1337');

  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={altText}
      {...(fill ? { fill: true } : { width: width!, height: height! })}
      className={className}
      unoptimized={isStrapi}
      loading={loading}
      onError={handleError}
      onLoad={(e) => {
        const img = e.target as HTMLImageElement;
        if (img.naturalWidth === 0) {
          handleError();
        }
      }}
    />
  );
}
