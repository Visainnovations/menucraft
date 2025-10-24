import { Users, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { SystemSettings } from '@/types/admin.types';
import StatCard from './StatCard';

interface StatsOverviewProps {
  settings: SystemSettings;
}

export default function StatsOverview({ settings }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Restaurants"
        value={settings.totalRestaurants}
        icon={Users}
        color="bg-blue-100 text-blue-600"
        subtitle="+12 this month"
      />
      <StatCard
        title="Active Subscriptions"
        value={settings.activeSubscriptions}
        icon={CheckCircle}
        color="bg-green-100 text-green-600"
        subtitle="70% of total"
      />
      <StatCard
        title="Trial Users"
        value={settings.trialUsers}
        icon={Clock}
        color="bg-yellow-100 text-yellow-600"
        subtitle="14 day trial"
      />
      <StatCard
        title="Monthly Revenue"
        value={settings.monthlyRevenue}
        icon={TrendingUp}
        color="bg-purple-100 text-purple-600"
        subtitle="October 2024"
      />
    </div>
  );
}