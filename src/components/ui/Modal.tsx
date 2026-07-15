import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, description, children, footer, className }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, type: 'spring', bounce: 0 }}
              className={cn(
                "w-full max-w-lg bg-card rounded-[24px] border border-border shadow-2xl pointer-events-auto flex flex-col overflow-hidden max-h-[90vh]",
                className
              )}
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-xl font-bold">{title}</h2>
                  {description && <p className="text-sm text-text-secondary mt-1">{description}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted transition-colors text-text-secondary hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                {children}
              </div>
              {footer && (
                <div className="p-6 border-t border-border bg-muted/20 flex justify-end gap-3">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Pre-configured Confirm Dialog
interface ConfirmDialogProps extends Omit<ModalProps, 'children' | 'footer'> {
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
}

export function ConfirmDialog({ 
  onConfirm, 
  onClose, 
  confirmLabel = 'Confirm', 
  cancelLabel = 'Cancel', 
  variant = 'primary',
  ...props 
}: ConfirmDialogProps) {
  return (
    <Modal
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>{cancelLabel}</Button>
          <Button 
            variant={variant === 'danger' ? 'outline' : 'primary'} 
            className={variant === 'danger' ? 'bg-danger text-white hover:bg-danger/90 border-danger' : ''}
            onClick={() => { onConfirm(); onClose(); }}
          >
            {confirmLabel}
          </Button>
        </>
      }
      {...props}
    >
      <div className="py-2 text-text-secondary">
        Are you sure you want to proceed with this action? This cannot be undone.
      </div>
    </Modal>
  );
}
