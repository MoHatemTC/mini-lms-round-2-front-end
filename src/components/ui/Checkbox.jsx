import * as React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

const Checkbox = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className={cn(
            'peer h-4 w-4 shrink-0 rounded-[4px] border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-transparent checked:bg-primary checked:border-primary transition-colors',
            className
          )}
          ref={ref}
          {...props}
        />
        <Check className="absolute left-0 top-0 h-4 w-4 text-primary-foreground pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
