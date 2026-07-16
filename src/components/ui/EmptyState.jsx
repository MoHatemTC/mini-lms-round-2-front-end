import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  className,
  variant = "default",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12",
        variant === "card" &&
          "bg-card border border-border rounded-3xl shadow-sm",
        className,
      )}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-150 animate-pulse" />
        <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/20 shadow-inner">
          <Icon className="h-10 w-10 text-primary drop-shadow-sm" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-text-secondary max-w-sm mx-auto mb-8 leading-relaxed">
        {description}
      </p>

      {action && (
        <div className="relative">
          <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-md opacity-50" />
          <div className="relative">{action}</div>
        </div>
      )}
    </motion.div>
  );
}
