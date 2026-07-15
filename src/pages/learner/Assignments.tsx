import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, Clock, UploadCloud, File, 
  X, CheckCircle2, AlertCircle, FileText,
  Download, Calendar, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';

export default function Assignments() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="max-w-[1000px] mx-auto pb-12 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Badge variant="secondary" className="mb-2">Advanced React Patterns</Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Compound Components Refactor</h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 rounded-xl font-medium border border-amber-500/20 shadow-sm">
          <Clock className="h-4 w-4" /> Due in 2 days
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Left Column: Instructions */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 sm:p-8 border-border bg-card shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-4">Instructions</h2>
            
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/90">
              <p>In this assignment, you will refactor an existing monolithic component into a flexible Compound Component architecture.</p>
              
              <h3>Requirements:</h3>
              <ul>
                <li>Create the <code>Toggle</code> context and provider.</li>
                <li>Implement <code>Toggle.On</code> and <code>Toggle.Off</code> child components.</li>
                <li>Implement a <code>Toggle.Button</code> component that consumes context.</li>
                <li>Ensure all types are strictly defined using TypeScript.</li>
              </ul>
              
              <p>Download the starter code below, complete the implementation, and upload your final <code>.zip</code> file.</p>
            </div>

            {/* Resources */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Resources</h3>
              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">starter-code.zip</p>
                    <p className="text-xs text-text-secondary">245 KB • ZIP Archive</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Submission Area */}
        <div className="space-y-6">
          <Card className="p-6 border-border bg-card shadow-premium relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
            
            <h2 className="text-lg font-bold text-foreground mb-1">Your Submission</h2>
            
            {isSubmitted ? (
              <div className="mt-6 text-center py-8">
                <div className="h-16 w-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 text-success">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Submitted Successfully</h3>
                <p className="text-sm text-text-secondary mb-6">Your assignment has been sent for grading.</p>
                <div className="p-3 bg-muted/50 rounded-xl border border-border flex items-center justify-center gap-2 text-sm font-medium">
                  <File className="h-4 w-4" /> assignment-v1.zip
                </div>
                <Button variant="outline" className="w-full mt-6 h-11 rounded-xl" onClick={() => {setIsSubmitted(false); setUploadedFile(null)}}>
                  Resubmit Assignment
                </Button>
              </div>
            ) : (
              <>
                <p className="text-sm text-text-secondary mb-6">
                  Upload your completed code. Maximum file size: 50MB.
                </p>

                {!uploadedFile ? (
                  <div 
                    className={cn(
                      "border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group",
                      isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border bg-background hover:border-primary/50 hover:bg-muted/30"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input 
                      type="file" 
                      id="file-upload" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept=".zip,.rar,.tar.gz"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud className="h-7 w-7" />
                      </div>
                      <span className="font-semibold text-foreground mb-1">Click to upload or drag & drop</span>
                      <span className="text-xs text-text-secondary">ZIP, RAR up to 50MB</span>
                    </label>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <File className="h-5 w-5" />
                      </div>
                      <div className="truncate">
                        <p className="font-semibold text-sm text-foreground truncate">{uploadedFile.name}</p>
                        <p className="text-xs text-text-secondary">Ready to submit</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setUploadedFile(null)}
                      className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors text-text-secondary hover:text-danger"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <div className="mt-8 space-y-4">
                  <textarea 
                    placeholder="Add a comment for the instructor (optional)..."
                    rows={3}
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                  
                  <Button 
                    className="w-full btn-gradient h-12 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform font-bold"
                    disabled={!uploadedFile || isSubmitting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
                  </Button>
                </div>
              </>
            )}
          </Card>

          {/* Rubric Card */}
          <Card className="p-6 border-border bg-card shadow-sm">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" /> Grading Rubric
            </h3>
            <div className="space-y-4">
              {[
                { criteria: 'Context implementation', pts: 40 },
                { criteria: 'Component Architecture', pts: 40 },
                { criteria: 'Type Definitions', pts: 20 },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0 last:pb-0">
                  <span className="text-sm font-medium text-foreground/80">{item.criteria}</span>
                  <span className="text-sm font-bold text-foreground">{item.pts} pts</span>
                </div>
              ))}
              <div className="pt-2 flex justify-between items-center text-primary font-bold">
                <span>Total Possible</span>
                <span>100 pts</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
