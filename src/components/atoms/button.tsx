import { cn } from '@/src/lib/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { Link } from '@/src/i18n/navigation';
import { routing } from '@/src/i18n/routing';
import { useLocale } from 'next-intl';
import React, { ReactNode } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link as SharedLink } from '@/src/types/shared';

interface Props {
  link: SharedLink;
  className?: string;
}

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 px-8 py-4 font-body text-sm tracking-wider transition-all duration-300',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-cream hover:bg-primary/90',
        secondary:
          'bg-transparent border border-cream text-cream hover:bg-cream hover:text-charcoal',
        link: 'text-gold hover:text-cream underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export function Button({ link, className }: Props) {
  const { text, url, isExternal, type } = link;
  const locale = useLocale();
  if (isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: type }), className)}
      >
        {text}
      </a>
    );
  }
  return (
    <Link
      href={url}
      className={cn(buttonVariants({ variant: type }), className)}
    >
      {text}
    </Link>
  );
}
