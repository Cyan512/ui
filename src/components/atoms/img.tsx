import NextImage from 'next/image';
import { cn } from '@/src/lib/cn';
import { Img as SharedImage } from '@/src/types/shared';
import environment from '@/src/environment';

interface Props {
  image: SharedImage | null;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export default function Img({
  image,
  className,
  priority = false,
  fill = false,
  sizes,
}: Props) {
  if (!image || !image.src?.url) return null;

  const bestFormat =
    image.src.formats?.large?.url ||
    image.src.formats?.medium?.url ||
    image.src.formats?.small?.url ||
    image.src.url;

  const src = bestFormat.startsWith('http')
    ? bestFormat
    : `${environment.strapi.apiEndpoint}${bestFormat}`;

  const alt =
    image.alt || image.src.alternativeText || image.src.name || 'image';

  if (fill) {
    return (
      <NextImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? '100vw'}
        className={cn(className)}
      />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={image.src.width}
      height={image.src.height}
      priority={priority}
      sizes={sizes}
      className={cn(className)}
    />
  );
}
