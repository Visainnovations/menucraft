import { cn } from '@utils/cn';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export default function Badge({ children, icon, className }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-100 rounded-full',
        className
      )}
    >
      {icon && <span className="text-primary-600 flex-shrink-0">{icon}</span>}
      <span className="text-xs sm:text-sm font-semibold text-primary-700">{children}</span>
    </div>
  );
}