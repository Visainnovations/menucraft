import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Restaurant } from '@/types/admin.types';

interface StatusBadgeProps {
  status: Restaurant['subscriptionStatus'];
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    trial: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800',
    suspended: 'bg-gray-100 text-gray-800',
  };

  const icons = {
    trial: Clock,
    active: CheckCircle,
    expired: XCircle,
    suspended: AlertCircle,
  };

  const Icon = icons[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      <Icon className="w-3.5 h-3.5" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}