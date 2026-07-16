import * as React from "react";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef(
  ({ className, src, alt, fallback, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted",
          className,
        )}
        {...props}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="aspect-square h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-text-primary">
            {fallback || alt?.charAt(0).toUpperCase() || "?"}
          </div>
        )}
      </div>
    );
  },
);
Avatar.displayName = "Avatar";

export { Avatar };
