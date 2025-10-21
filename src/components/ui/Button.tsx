import { cn } from '@utils/cn';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-2xl',
    secondary: 'bg-white text-gray-900 border-2 border-gray-200 hover:border-primary-500',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}