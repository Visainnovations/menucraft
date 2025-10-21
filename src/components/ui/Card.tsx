import { cn } from '@utils/cn';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-8 border border-gray-100',
        hover && 'hover:shadow-2xl transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}