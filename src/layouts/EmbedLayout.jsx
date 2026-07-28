import React from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '../lib/utils';

/**
 * EmbedLayout
 * A specialized reusable layout designed for rendering embedded views
 * inside iframes or external containers.
 * 
 * Key layout principles enforced:
 * - Does not assume full viewport height (avoiding min-h-screen/h-screen)
 * - Prevents layout overflow and horizontal scrolling
 * - Uses adaptive spacing that scales smoothly from mobile to desktop
 * - Excludes app navigation (sidebars, navbars, footers) for iframe safety
 */
export default function EmbedLayout() {
  return (
    <div 
      className={cn(
        "w-full max-w-full bg-background text-foreground selection:bg-primary/20",
        "overflow-x-hidden overflow-y-auto",
        "p-3 sm:p-5 md:p-8 transition-all duration-300"
      )}
    >
      <div className="mx-auto w-full max-w-[1400px] flex flex-col gap-6">
        <Outlet />
      </div>
    </div>
  );
}
