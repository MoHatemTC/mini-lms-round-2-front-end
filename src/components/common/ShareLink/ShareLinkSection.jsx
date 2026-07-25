import React, { useState } from 'react';
import { Copy, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '../../ui/Button';

export default function ShareLinkSection({ url, title = 'Share Link', description }) {
  const [copied, setCopied] = useState(false);

  if (!url) return null;

  const copyToClipboard = async (text) => {
    // 1. Try modern Async Clipboard API first (requires secure context HTTPS/localhost)
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('navigator.clipboard.writeText failed, attempting fallback:', err);
        // Continue to fallback below
      }
    }

    // 2. Fallback using temporary textarea and document.execCommand('copy') (supports HTTP and legacy browsers)
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      // Ensure textarea is invisible and out of viewport to prevent page scroll or layout shift
      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      textArea.style.left = '-9999px';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (!successful) {
        throw new Error('document.execCommand returned false');
      }
      return true;
    } catch (err) {
      console.error('Failed to copy link to clipboard:', err);
      return false;
    }
  };

  const handleCopy = async () => {
    if (copied) return; // Prevent duplicate copy operations
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpen = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-3 relative w-full animate-fade-in">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-800">{title}</label>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        <div 
          tabIndex={0}
          aria-label="Share URL"
          className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-600 break-all overflow-wrap-anywhere shadow-inner focus-within:ring-2 focus-within:ring-primary/50 transition-shadow outline-none"
        >
          {url}
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <Button 
            variant={copied ? 'secondary' : 'outline'} 
            size="sm" 
            onClick={handleCopy} 
            disabled={copied}
            className="flex-1 sm:flex-none px-4 h-full"
            aria-label="Copy share link"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleOpen}
            className="px-3 h-full"
            title="Open in new tab"
            aria-label="Open share link in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {copied && (
        <div role="status" aria-live="polite" className="absolute -bottom-6 right-0 text-xs text-green-600 font-medium animate-fade-in">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
}
