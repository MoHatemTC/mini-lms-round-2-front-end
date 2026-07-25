import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Info } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import courseService from '../../../../services/courseService';
import { validateCourseForPublish } from '../../utils/courseValidation';
import ShareLinkSection from '../../../../components/common/ShareLink/ShareLinkSection';

export default function PublishCourseModal({ isOpen, onClose, course, onPublishSuccess }) {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [shareLink, setShareLink] = useState('');
  
  // Validation state
  const [fullCourse, setFullCourse] = useState(null);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [validation, setValidation] = useState({ isReady: true, missingRequirements: [] });

  useEffect(() => {
    if (!isOpen || !course) return;
    
    let isMounted = true;
    const fetchDetails = async () => {
      setIsFetchingDetails(true);
      try {
        const data = await courseService.getCourseById(course.id);
        if (isMounted) {
          setFullCourse(data);
          setValidation(validateCourseForPublish(data));
        }
      } catch (err) {
        if (isMounted) {
          // If we fail to fetch, fallback to validating what we have
          setFullCourse(course);
          setValidation(validateCourseForPublish(course));
        }
      } finally {
        if (isMounted) setIsFetchingDetails(false);
      }
    };
    
    fetchDetails();
    
    return () => { isMounted = false; };
  }, [isOpen, course]);

  if (!isOpen || !course) return null;

  const handlePublish = async () => {
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');
    setShareLink('');
    
    try {
      const response = await courseService.publishCourse(course.id);
      setStatus('success');
      
      const link = response?.shareLink || response?.course?.shareLink || '';
      
      if (link) {
        setShareLink(link);
        // Call onPublishSuccess to update the list, but don't close the modal yet
        onPublishSuccess(course.id);
      } else {
        // Auto-close if no link
        setTimeout(() => {
          onPublishSuccess(course.id);
          setStatus('idle');
          onClose();
        }, 1500);
      }
    } catch (error) {
      setStatus('error');
      setErrorMsg(error?.message || 'Failed to publish course. Please try again.');
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setShareLink('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
      <Card 
        className="w-full max-w-md p-6 shadow-xl animate-slide-up relative"
        aria-busy={isFetchingDetails || status === 'loading'}
      >
        <button 
          onClick={handleClose}
          disabled={status === 'loading'}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">Publish Course</h2>
        
        {isFetchingDetails && status !== 'success' && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        )}

        {!isFetchingDetails && status !== 'success' && (
          <div className="mb-6 text-sm text-gray-600">
            <p>
              You are about to publish <strong>{course.title}</strong>. 
            </p>
            
            {!validation.isReady ? (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-center gap-2 text-amber-800 font-semibold mb-2">
                  <Info className="w-5 h-5 shrink-0" />
                  Cannot Publish Yet
                </div>
                <p className="text-amber-700 mb-3">Please resolve the following issues before publishing:</p>
                <ul className="list-disc pl-5 space-y-1 text-amber-700/90">
                  {validation.missingRequirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-4 text-primary bg-primary/5 p-3 rounded-lg border border-primary/20 leading-relaxed">
                Publishing this course will make it instantly available to all enrolled learners. They will be able to access all uploaded materials.
              </p>
            )}
          </div>
        )}

        {status === 'error' && (
          <div role="alert" aria-live="assertive" className="mb-4 p-3 bg-red-50 text-red-700 border border-red-100 rounded-lg flex items-center gap-2 text-sm animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg || 'Failed to publish course. Please try again.'}</span>
          </div>
        )}

        {status === 'success' && !shareLink && (
          <div role="status" aria-live="polite" className="mb-4 p-3 bg-green-50 text-green-700 border border-green-100 rounded-lg flex items-center gap-2 text-sm animate-fade-in">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>Course published successfully!</span>
          </div>
        )}

        {status === 'success' && shareLink && (
          <div className="mb-6 animate-slide-up" role="status" aria-live="polite">
            <div className="mb-4 p-4 bg-green-50 text-green-800 border border-green-200 rounded-xl flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-base mb-1">Course published successfully!</h3>
                <p className="text-sm text-green-700">Share this link with your learners to grant them access.</p>
              </div>
            </div>
            
            <ShareLinkSection url={shareLink} />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          {(!shareLink || status !== 'success') && (
            <Button 
              variant="ghost" 
              onClick={handleClose}
              disabled={status === 'loading'}
            >
              Cancel
            </Button>
          )}
          {shareLink && status === 'success' ? (
            <Button variant="primary" onClick={handleClose} className="min-w-[120px]">
              Done
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={handlePublish}
              disabled={status === 'loading' || status === 'success' || !validation.isReady || isFetchingDetails}
              aria-busy={status === 'loading'}
              className="min-w-[140px]"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Publishing
                </span>
              ) : status === 'success' ? (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" aria-hidden="true" /> Published
                </span>
              ) : (
                'Publish Course'
              )}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
