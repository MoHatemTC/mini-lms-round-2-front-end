import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  success: <CheckCircle2 className="h-5 w-5 text-success" />,
  error: <XCircle className="h-5 w-5 text-danger" />,
  warning: <AlertCircle className="h-5 w-5 text-warning" />,
  info: <Info className="h-5 w-5 text-primary" />,
};

const bgColors = {
  success: "bg-success/10 border-success/20",
  error: "bg-danger/10 border-danger/20",
  warning: "bg-warning/10 border-warning/20",
  info: "bg-primary/10 border-primary/20",
};

export function Toast({ toast, onDismiss }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={cn(
        "pointer-events-auto flex w-full max-w-md rounded-xl border p-4 shadow-lg backdrop-blur-md",
        bgColors[toast.type],
        "bg-card/95", // Fallback to card bg with some transparency for glass effect, overlaid with type color
      )}
    >
      <div className="flex w-full items-start gap-4">
        <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
        <div className="flex-1 w-0 pt-0.5">
          <p className="text-sm font-semibold text-foreground">{toast.title}</p>
          {toast.description && (
            <p className="mt-1 text-sm text-text-secondary">
              {toast.description}
            </p>
          )}
        </div>
        <div className="ml-4 flex flex-shrink-0">
          <button
            type="button"
            className="inline-flex rounded-md text-text-secondary hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => onDismiss(toast.id)}
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function ToastContainer({ toasts, onDismiss }) {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-[100] flex px-4 py-6 items-end sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
