import { cn } from '@/src/lib/cn';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  variant?: 'light' | 'dark';
  className?: string;
}

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const variantStyles = {
  light: 'text-[#2C2C2C]',
  dark: 'text-white',
};

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  variant = 'light',
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-16 lg:mb-20', alignStyles[align], className)}>
      {label && (
        <p className="text-gold text-xs tracking-[0.5em] uppercase mb-6 font-light">
          {label}
        </p>
      )}
      <h2
        className={cn(
          'font-headline text-4xl md:text-5xl lg:text-6xl font-light',
          variantStyles[variant]
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-6 text-lg font-light max-w-2xl',
            align === 'center' ? 'mx-auto' : '',
            variant === 'light' ? 'text-neutral' : 'text-white/60'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
