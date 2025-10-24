import { Restaurant } from '@/types/admin.types';

interface PlanBadgeProps {
  plan: Restaurant['planType'];
}

export default function PlanBadge({ plan }: PlanBadgeProps) {
  const styles = {
    basic: 'bg-gray-100 text-gray-800',
    pro: 'bg-purple-100 text-purple-800',
    premium: 'bg-orange-100 text-orange-800',
  };

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold uppercase ${styles[plan]}`}>
      {plan}
    </span>
  );
}