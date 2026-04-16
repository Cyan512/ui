import { cn } from '@/src/lib/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { Link } from '@/src/i18n/navigation';
import { routing } from '@/src/i18n/routing';
import { useLocale } from 'next-intl';
import React, { ReactNode } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

const buttonVariants = cva(
  'inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-pg0 text-tx hover:bg-pg0/90 px-10 py-4 justify-center',
        secondary:
          'border border-pg0/30 text-pg0 hover:bg-pg0/10 px-10 py-4 justify-center',
        link: 'border-b border-tx/20 pb-1 hover:gap-4 transition-all',
        dark: 'bg-tx text-pg0 hover:bg-tx/90 px-10 py-4 justify-center',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  showArrow?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  href,
  className,
  onClick,
  type = 'button',
  disabled,
  showArrow = true,
  ...props
}: ButtonProps) {
  const locale = useLocale();

  const combinedStyles = cn(buttonVariants({ variant }), className);

  const content = (
    <>
      {children}
      {variant === 'link' && showArrow && <FaArrowRightLong size={14} />}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('www');
    const isAnchor = href.startsWith('#');
    const isLocalePath = routing.locales.some(
      (l: string) => href === `/${l}` || href.startsWith(`/${l}/`)
    );

    let finalHref = href;
    if (!isExternal && !isAnchor && !isLocalePath) {
      if (!href.startsWith('/')) {
        finalHref = `/${href}`;
      }
    }

    return (
      <Link href={finalHref} className={combinedStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      {...props}
    >
      {content}
    </button>
  );
}
