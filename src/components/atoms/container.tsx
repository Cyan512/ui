import { ReactNode, HTMLAttributes, JSX } from 'react';
import { cn } from '@/src/lib/cn';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: 'default' | 'lg' | 'full';
}

const containerSizes = {
  default: 'max-w-7xl mx-auto px-6 lg:px-12',
  lg: 'max-w-5xl mx-auto px-6 lg:px-12',
  full: 'w-full',
};

export default function Container({
  children,
  size = 'default',
  className = '',
  ...props
}: ContainerProps): JSX.Element {
  return (
    <div className={cn(containerSizes[size], className)} {...props}>
      {children}
    </div>
  );
}
