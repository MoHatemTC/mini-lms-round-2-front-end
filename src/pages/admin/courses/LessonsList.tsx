import { useState } from 'react';
import { 
  BookOpen, Search, Filter, MoreVertical, 
  PlayCircle, FileText, HelpCircle, Plus, DragHandleDots2
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

// Mock Data
const mockModules = [
  {
    id: 'm1',
    title: 'Module 1: Introduction to React',
    lessons: [
      { id: 'l1', title: 'Welcome to the Course', type: 'video', duration: '5:24', status: 'published', isPreview: true },
      { id: 'l2', title: 'What is React?', type: 'video', duration: '12:45', status: 'published', isPreview: true },
      { id: 'l3', title: 'Setting Up Your Environment', type: 'article', duration: '10 min read', status: 'published', isPreview: false },
      { id: 'l4', title: 'Module 1 Quiz', type: 'quiz', duration: '10 Questions', status: 'published', isPreview: false },
    ]
  },
  {
    id: 'm2',
    title: 'Module 2: Core Concepts',
    lessons: [
      { id: 'l5', title: 'JSX Deep Dive', type: 'video', duration: '18:20', status: 'published', isPreview: false },
      { id: 'l6', title: 'Components and Props', type: 'video', duration: '22:15', status: 'published', isPreview: false },
      { id: 'l7', title: 'State and Lifecycle', type: 'video', duration: '25:30', status: 'draft', isPreview: false },
      { id: 'l8', title: 'Component Exercise', type: 'article', duration: '20 min read', status: 'draft', isPreview: false },
    ]
  }
];

export default function LessonsList() {
  const [searchQuery, setSearchQuery] = useState('');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="h-4 w-4 text-blue-500" />;
      case 'article': return <FileText className="h-4 w-4 text-emerald-500" />;
      case 'quiz': return <HelpCircle className="h-4 w-4 text-amber-500" />;
      default: return <BookOpen className="h-4 w-4 text-text-secondary" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader 
        title="Curriculum Management" 
        description="Organize modules and manage lessons for your active courses."
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Courses', href: '/admin/courses' },
          { label: 'Lessons' }
        ]}
      >
        <Button className="btn-gradient shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </PageHeader>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-[20px] border border-border shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <Input 
            placeholder="Search lessons..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-background border-border"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="h-10 rounded-xl border-border bg-background">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <select className="h-10 rounded-xl border border-border bg-background text-sm px-3 outline-none focus:ring-2 focus:ring-primary/50">
            <option>Advanced React Patterns</option>
            <option>Figma for UI/UX Design</option>
            <option>Python Data Science Bootcamp</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {mockModules.map((module) => (
          <Card key={module.id} className="overflow-hidden border-border bg-card">
            <div className="p-4 sm:p-5 bg-muted/30 border-b border-border flex justify-between items-center group cursor-grab active:cursor-grabbing">
              <div className="flex items-center gap-3">
                <DragHandleDots2 className="h-5 w-5 text-text-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-semibold text-foreground text-base">{module.title}</h3>
                <Badge variant="secondary" className="h-5 text-xs px-1.5">{module.lessons.length} Items</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 border-border bg-background">
                  <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Lesson
                </Button>
                <button className="p-1.5 text-text-secondary hover:text-foreground rounded-lg hover:bg-muted transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-border">
              {module.lessons.filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase())).map((lesson) => (
                <div key={lesson.id} className="p-4 sm:px-5 flex items-center justify-between group hover:bg-muted/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                      <DragHandleDots2 className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-background border border-border shadow-sm shrink-0">
                      {getTypeIcon(lesson.type)}
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm flex items-center gap-2">
                        {lesson.title}
                        {lesson.isPreview && (
                          <Badge variant="outline" className="h-[18px] text-[10px] px-1 border-primary/30 text-primary">Preview</Badge>
                        )}
                      </div>
                      <div className="text-xs text-text-secondary mt-0.5 capitalize flex items-center gap-2">
                        <span>{lesson.type}</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {lesson.status === 'published' ? (
                      <Badge variant="success" className="h-[22px]">Published</Badge>
                    ) : (
                      <Badge variant="secondary" className="h-[22px]">Draft</Badge>
                    )}
                    <button className="p-1.5 text-text-secondary hover:text-foreground rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              {module.lessons.filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                <div className="p-8 text-center text-text-secondary text-sm">
                  No lessons match your search.
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
