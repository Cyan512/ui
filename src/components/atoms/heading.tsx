import { Header } from '@/src/types/shared';
import { cn } from '@/src/lib/cn';

interface Props {
  header: Header;
  className?: string;
  align?: 'left' | 'center' | 'right';
  variant?: 'light' | 'dark';
}

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const variantStyles = {
  light: 'text-charcoal',
  dark: 'text-white',
};

export default function Heading({
  header,
  align = 'center',
  variant = 'light',
  className = '',
}: Props) {
  return (
    <div className={cn('mb-16 lg:mb-20', alignStyles[align], className)}>
      {header.subtitle && (
        <p className="text-gold text-xs tracking-[0.5em] uppercase mb-6 font-light">
          {header.subtitle}
        </p>
      )}
      <h2
        className={cn(
          'font-headline text-4xl md:text-5xl lg:text-6xl font-light',
          variantStyles[variant]
        )}
      >
        {header.title}
      </h2>
      {header.description && (
        <p
          className={cn(
            'mt-6 text-lg font-light max-w-2xl',
            align === 'center' ? 'mx-auto' : '',
            variant === 'light' ? 'text-neutral' : 'text-white/60'
          )}
        >
          {header.description}
        </p>
      )}
    </div>
  );
}
