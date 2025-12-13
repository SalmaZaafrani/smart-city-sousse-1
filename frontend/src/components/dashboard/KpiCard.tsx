import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'info' | 'primary';
}

const variantStyles = {
  default: 'from-card to-secondary/30 border-border',
  success: 'from-success/10 to-success/5 border-success/20',
  warning: 'from-warning/10 to-warning/5 border-warning/20',
  info: 'from-info/10 to-info/5 border-info/20',
  primary: 'from-primary/10 to-primary/5 border-primary/20',
};

const iconStyles = {
  default: 'bg-muted text-muted-foreground',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  info: 'bg-info/20 text-info',
  primary: 'bg-primary/20 text-primary',
};

export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
}: KpiCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border p-5 bg-gradient-to-br transition-all duration-300',
        'hover:shadow-lg hover:scale-[1.02] cursor-default',
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-foreground tracking-tight">
              {value}
            </h3>
            {trend && (
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.positive ? 'text-success' : 'text-destructive'
                )}
              >
                {trend.positive ? '+' : ''}
                {trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div
          className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center',
            iconStyles[variant]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Decorative gradient orb */}
      <div
        className={cn(
          'absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-20 blur-2xl',
          variant === 'success' && 'bg-success',
          variant === 'warning' && 'bg-warning',
          variant === 'info' && 'bg-info',
          variant === 'primary' && 'bg-primary',
          variant === 'default' && 'bg-muted-foreground'
        )}
      />
    </div>
  );
}