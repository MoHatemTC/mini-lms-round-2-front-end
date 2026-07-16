import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/60", className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="p-5 border border-border rounded-[24px] bg-card space-y-4">
      <Skeleton className="h-[120px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      <Skeleton className="h-10 w-full rounded-xl mt-4" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-4 w-1/3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-4 w-24" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}
