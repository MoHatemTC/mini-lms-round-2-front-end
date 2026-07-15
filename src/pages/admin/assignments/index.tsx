import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, Clock, CheckCircle2, AlertCircle, 
  Search, Filter, ChevronRight, MessageSquare, 
  FileText, Download, Check
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';

/* ============================================================
   MOCK DATA
   ============================================================ */
const mockAssignments = [
  {
    id: 'a1',
    student: { name: 'David Smith', avatar: 'https://i.pravatar.cc/150?img=15' },
    course: 'Advanced React Patterns',
    assignment: 'Compound Components Implementation',
    submittedAt: '2 hours ago',
    status: 'Pending Review',
    grade: null,
    files: 2
  },
  {
    id: 'a2',
    student: { name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=9' },
    course: 'UI/UX Masterclass',
    assignment: 'Figma Prototype Submission',
    submittedAt: '5 hours ago',
    status: 'Graded',
    grade: '95/100',
    files: 1
  },
  {
    id: 'a3',
    student: { name: 'James Lee', avatar: 'https://i.pravatar.cc/150?img=11' },
    course: 'Machine Learning A-Z',
    assignment: 'Neural Network Model Tuning',
    submittedAt: '1 day ago',
    status: 'Needs Revision',
    grade: 'Needs Revision',
    files: 3
  },
  {
    id: 'a4',
    student: { name: 'Sophia Davis', avatar: 'https://i.pravatar.cc/150?img=5' },
    course: 'Cloud Architecture',
    assignment: 'AWS Deployment Script',
    submittedAt: '1 hour ago',
    status: 'Pending Review',
    grade: null,
    files: 1
  },
];

export default function Assignments() {
  const [activeTab, setActiveTab] = useState<'queue' | 'graded'>('queue');
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Pending Review': return <Badge variant="warning" className="bg-amber-500/10 text-amber-500 border-0">Needs Grading</Badge>;
      case 'Graded': return <Badge variant="success" className="bg-success/10 text-success border-0">Graded</Badge>;
      case 'Needs Revision': return <Badge variant="danger" className="bg-danger/10 text-danger border-0">Revision Req.</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-8 flex flex-col lg:flex-row gap-8">
      {/* Left Column: Queue & List */}
      <div className="flex-1 min-w-0 flex flex-col h-[calc(100vh-140px)]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 shrink-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Assignments</h1>
            <p className="text-text-secondary mt-1">Review and grade student submissions.</p>
          </div>
          <div className="flex bg-muted p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('queue')}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                activeTab === 'queue' ? "bg-background shadow-sm text-foreground" : "text-text-secondary hover:text-foreground"
              )}
            >
              Review Queue <Badge variant="warning" className="ml-2 bg-amber-500 text-white border-0 h-5 px-1.5">12</Badge>
            </button>
            <button
              onClick={() => setActiveTab('graded')}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                activeTab === 'graded' ? "bg-background shadow-sm text-foreground" : "text-text-secondary hover:text-foreground"
              )}
            >
              Graded
            </button>
          </div>
        </div>

        {/* List Container */}
        <Card className="flex-1 overflow-hidden border-border rounded-[24px] flex flex-col bg-card shadow-sm">
          {/* Toolbar */}
          <div className="p-4 border-b border-border flex items-center gap-4 shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search student or course..."
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 px-3 rounded-xl border-border bg-background">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {mockAssignments.filter(a => activeTab === 'queue' ? a.status === 'Pending Review' : a.status !== 'Pending Review').map((assignment) => (
              <div 
                key={assignment.id}
                onClick={() => setSelectedAssignment(assignment.id)}
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer group flex items-start gap-4",
                  selectedAssignment === assignment.id 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-border bg-background hover:border-primary/30"
                )}
              >
                <Avatar src={assignment.student.avatar} className="h-10 w-10 shrink-0 border border-border" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-foreground truncate">{assignment.student.name}</span>
                    <span className="text-xs text-text-secondary whitespace-nowrap ml-4 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {assignment.submittedAt}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-primary truncate">{assignment.course}</p>
                  <p className="text-sm text-text-secondary truncate">{assignment.assignment}</p>
                  <div className="flex items-center gap-3 mt-3">
                    {getStatusBadge(assignment.status)}
                    <span className="flex items-center gap-1 text-xs text-text-secondary">
                      <FileText className="h-3 w-3" /> {assignment.files} files attached
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Empty State Mock */}
            {mockAssignments.filter(a => activeTab === 'queue' ? a.status === 'Pending Review' : a.status !== 'Pending Review').length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-lg font-bold">You're all caught up!</h3>
                <p className="text-text-secondary mt-1 max-w-sm">There are no assignments waiting for review in your queue.</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Right Column: Grading Screen (Sidebar) */}
      <AnimatePresence>
        {selectedAssignment && (
          <motion.div 
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: '400px' }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            className="hidden lg:flex shrink-0 h-[calc(100vh-140px)]"
          >
            <Card className="flex-1 border-border rounded-[24px] shadow-premium overflow-hidden flex flex-col bg-card">
              {/* Header */}
              <div className="p-6 border-b border-border shrink-0 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                <h2 className="text-xl font-bold mb-1">Grading Workspace</h2>
                <p className="text-sm text-text-secondary">Compound Components Implementation</p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                  <Avatar src="https://i.pravatar.cc/150?img=15" className="h-8 w-8" />
                  <span className="text-sm font-medium">David Smith</span>
                  <Badge variant="secondary" className="ml-auto bg-muted">Attempt 1</Badge>
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Files */}
                <div>
                  <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Submitted Files</h3>
                  <div className="space-y-2">
                    {['App.tsx', 'ToggleComponent.tsx'].map((file) => (
                      <div key={file} className="flex items-center justify-between p-3 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <Code className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium">{file}</span>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rubric */}
                <div>
                  <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Rubric / Criteria</h3>
                  <div className="space-y-3">
                    {[
                      { criteria: 'Uses Context API correctly', max: 40, current: '' },
                      { criteria: 'Proper State Management', max: 40, current: '' },
                      { criteria: 'Clean Code & Comments', max: 20, current: '' },
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl border border-border bg-background">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium leading-snug">{item.criteria}</span>
                          <span className="text-xs text-text-secondary whitespace-nowrap ml-2">/ {item.max} pts</span>
                        </div>
                        <input 
                          type="number" 
                          placeholder="Score"
                          className="w-full h-9 rounded-lg border border-border bg-muted/50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20 flex justify-between items-center">
                    <span className="font-semibold text-primary">Total Score</span>
                    <span className="text-2xl font-bold text-primary">--/100</span>
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Instructor Feedback</h3>
                  <textarea 
                    rows={4} 
                    placeholder="Provide constructive feedback..."
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-border shrink-0 bg-muted/10 grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-11 rounded-xl border-danger/20 text-danger hover:bg-danger/10">
                  <AlertCircle className="mr-2 h-4 w-4" /> Request Revision
                </Button>
                <Button className="btn-gradient h-11 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform">
                  <Check className="mr-2 h-4 w-4" /> Submit Grade
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Temporary mock for Code icon since it wasn't imported at the top
import { Code } from 'lucide-react';
