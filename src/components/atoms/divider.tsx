interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'gold' | 'white' | 'gray';
  className?: string;
}

const dividerColors = {
  gold: 'bg-[#C9A962]',
  white: 'bg-white',
  gray: 'border-[#E8E4DF]',
};

const dividerSizes = {
  sm: 'h-px w-12',
  md: 'h-px w-20',
  lg: 'h-px w-32',
  xl: 'h-px w-full',
};

export default function Divider({
  orientation = 'horizontal',
  size = 'md',
  color = 'gold',
  className = '',
}: DividerProps) {
  if (orientation === 'vertical') {
    return <div className={`w-px h-full bg-[#E8E4DF] ${className}`} />;
  }

  return (
    <div
      className={`
                ${color === 'gray' ? 'border-t' : dividerSizes[size]}
                ${color === 'gray' ? '' : dividerColors[color]}
                ${color === 'gray' ? 'border border-[#E8E4DF]' : ''}
                ${className}
            `}
    />
  );
}
