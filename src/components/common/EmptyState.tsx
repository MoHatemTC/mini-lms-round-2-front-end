import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-card rounded-[24px] border border-border border-dashed", className)}>
      <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-text-secondary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" className="bg-background">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
