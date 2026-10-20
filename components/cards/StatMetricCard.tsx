import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

export interface StatMetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  progressPercent?: number;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  onClick?: () => void;
}

export const StatMetricCard: React.FC<StatMetricCardProps> = ({
  label,
  value,
  unit,
  subtext,
  progressPercent,
  icon: Icon,
  iconBgColor = 'bg-brand-50',
  iconColor = 'text-brand-600',
  trend,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-surface-card border border-borderSubtle rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
            {label}
          </span>
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform ${iconBgColor} ${iconColor}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline gap-1.5 mb-1.5">
          <span
            suppressHydrationWarning
            className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 leading-none"
          >
            {value}
          </span>
          {unit && (
            <span suppressHydrationWarning className="text-xs font-semibold text-slate-400">
              {unit}
            </span>
          )}
        </div>
      </div>

      <div className="mt-2 space-y-2">
        {typeof progressPercent === 'number' && (
          <div className="w-full bg-surface-subtle h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          {subtext && (
            <p suppressHydrationWarning className="text-xs text-slate-500 font-medium truncate">
              {subtext}
            </p>
          )}
          {trend && (
            <span
              suppressHydrationWarning
              className={`inline-flex items-center gap-0.5 text-xs font-bold ${
                trend.isPositive ? 'text-accent-emerald' : 'text-accent-rose'
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {trend.value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
