import * as React from "react";
import { ToastContainer } from "@/components/ui/Toast";

const ToastContext = React.createContext(undefined);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback(
    ({ title, description, type = "info" }) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type }]);
    },
    [],
  );

  const success = React.useCallback(
    (title, description) => addToast({ title, description, type: "success" }),
    [addToast],
  );
  const error = React.useCallback(
    (title, description) => addToast({ title, description, type: "error" }),
    [addToast],
  );

  const removeToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
