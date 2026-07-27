import React, { useState, useEffect, useRef } from 'react';
import { X, AlertTriangle, AlertCircle, Loader2 } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import courseService from '../../../../services/courseService';

/**
 * UnpublishCourseModal
 * A confirmation dialog for administrators to unpublish a published course.
 * 
 * Enforces:
 * - Clear explanation of learner visibility and backend decision D-07
 * - Visually distinguished destructive Confirm button (variant="danger")
 * - Full accessibility (focus trapping, Escape to close, focus restoration)
 * - Clean error display of backend server messages (e.g. learners enrolled)
 */
export default function UnpublishCourseModal({ isOpen, onClose, course, onUnpublishSuccess }) {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Handle accessibility: Focus trapping, Escape key closing, and focus restoration
  useEffect(() => {
    if (!isOpen) return;

    // Save current active element to restore focus when modal closes
    previousFocusRef.current = document.activeElement;

    // Auto-focus first focusable element (Cancel button by default)
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (status !== 'loading') {
          handleClose();
        }
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, status]);

  if (!isOpen || !course) return null;

  const handleConfirm = async () => {
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await courseService.unpublishCourse(course.id);
      setStatus('idle');
      onUnpublishSuccess(course.id, response);
      onClose();
    } catch (error) {
      setStatus('error');
      // Display the server message exactly as intended by the backend (e.g. "Learners are still enrolled.")
      setErrorMsg(error?.message || 'Failed to unpublish course. Please try again.');
    }
  };

  const handleClose = () => {
    if (status === 'loading') return;
    setStatus('idle');
    setErrorMsg('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="unpublish-modal-title"
      aria-describedby="unpublish-modal-description"
    >
      <Card 
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-md p-6 shadow-xl animate-slide-up relative outline-none border-border"
        aria-busy={status === 'loading'}
      >
        <button 
          onClick={handleClose}
          disabled={status === 'loading'}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg p-1"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
        
        <div className="flex items-center gap-3 text-amber-600 mb-3">
          <div className="p-2.5 rounded-full bg-amber-50 border border-amber-200/60 shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-600" aria-hidden="true" />
          </div>
          <h2 id="unpublish-modal-title" className="text-xl font-bold text-foreground tracking-tight">
            Unpublish Course
          </h2>
        </div>
        
        <div id="unpublish-modal-description" className="mb-6 space-y-3 text-sm text-text-secondary leading-relaxed">
          <p>
            You are about to unpublish <strong className="text-foreground font-semibold">{course.title}</strong>.
          </p>
          <div className="p-3.5 bg-muted/50 rounded-xl border border-border space-y-2 text-xs sm:text-sm text-foreground/90">
            <p className="font-medium">Please note the following behavior:</p>
            <ul className="list-disc pl-4 space-y-1 text-text-secondary">
              <li>The course will no longer be visible to new learners in the catalog.</li>
              <li>Existing learner access and progress behavior is determined by backend decision <strong>D-07</strong>.</li>
              <li>The frontend will simply display the server response after submission.</li>
            </ul>
          </div>
        </div>

        {status === 'error' && (
          <div 
            role="alert" 
            aria-live="assertive" 
            className="mb-6 p-3.5 bg-red-50 text-red-700 border border-red-200/80 rounded-xl flex items-start gap-2.5 text-sm animate-fade-in"
          >
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" aria-hidden="true" />
            <div className="flex-1">
              <span className="font-semibold block mb-0.5">Cannot Unpublish Course</span>
              <span>{errorMsg || 'Operation failed. Please try again.'}</span>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2 border-t border-border/50">
          <Button 
            variant="ghost" 
            onClick={handleClose}
            disabled={status === 'loading'}
            className="min-w-[90px]"
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleConfirm}
            disabled={status === 'loading'}
            aria-busy={status === 'loading'}
            className="min-w-[140px]"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Unpublishing...
              </span>
            ) : (
              'Unpublish Course'
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
