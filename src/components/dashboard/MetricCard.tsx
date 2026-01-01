import React from 'react';
import { Card } from '../ui/Card';
import { BoxIcon } from 'lucide-react';
interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: BoxIcon;
  color: 'blue' | 'green' | 'red' | 'amber';
}
export function MetricCard({
  title,
  value,
  trend,
  icon: Icon,
  color
}: MetricCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-600'
  };
  return <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
          {trend && <p className={`text-sm mt-2 font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              <span className="text-gray-500 font-normal ml-1">
                vs last month
              </span>
            </p>}
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>;
}