import React from 'react';

export interface CardStatsProps {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: string | {
    value: string;
    label: string;
    isUp?: boolean;
  };
  bgClass?: string;
  borderClass?: string;
  iconBgClass?: string;
  iconColorClass?: string;
  textColorClass?: string;
}

export default function CardStats({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend,
  bgClass = "bg-surface",
  borderClass = "border border-border shadow-sm hover:border-primary/50",
  iconBgClass = "bg-secondary",
  iconColorClass = "text-primary",
  textColorClass = "text-foreground"
}: CardStatsProps) {
  return (
    <div className={`${bgClass} ${borderClass} rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group`}>
      
      <div className="relative z-10 flex justify-between items-start">
        <div className="space-y-2">
          {/* Title in muted orange */}
          <h3 className="text-sm font-bold text-foreground-muted tracking-wide uppercase">{title}</h3>
          
          {/* Large Number */}
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black ${textColorClass} tracking-tight`}>{value}</span>
            {trend && typeof trend === 'object' && (
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md flex items-center ${trend.isUp ? 'bg-success/15 text-success' : 'bg-error/15 text-error'}`}>
                {trend.isUp ? '↗' : '↘'} {trend.value}
              </span>
            )}
          </div>
        </div>

        {/* Icon */}
        {icon && (
          <div className={`p-3 rounded-xl ${iconBgClass} ${iconColorClass} shadow-sm border border-black/5`}>
            {icon}
          </div>
        )}
      </div>

      {/* Subtitle in muted orange */}
      {(subtitle || (trend && typeof trend === 'object' && trend.label)) && (
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <p className="text-xs font-bold text-foreground-muted">
            {subtitle || (typeof trend === 'object' ? trend.label : '')}
          </p>
        </div>
      )}
    </div>
  );
}
