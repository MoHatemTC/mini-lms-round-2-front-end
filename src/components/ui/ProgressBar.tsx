import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
  colorClass?: string;
  showLabel?: boolean;
  indicatorClassName?: string;
}

export function ProgressBar({ progress, className, colorClass = 'bg-primary', showLabel = false }: ProgressBarProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs font-medium mb-1.5">
          <span>Progress</span>
          <span>{safeProgress}%</span>
        </div>
      )}
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${safeProgress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn('h-full rounded-full', colorClass)}
        />
      </div>
    </div>
  );
}
