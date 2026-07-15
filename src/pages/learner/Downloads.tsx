import { useState } from 'react';
import { 
  DownloadCloud, Search, CheckCircle2, 
  Trash2, File, PlayCircle, HardDrive
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// Mock Data
const mockDownloads = [
  { id: 'd1', title: 'React Hooks Cheat Sheet.pdf', course: 'Advanced React Patterns', size: '2.4 MB', type: 'document', date: 'Oct 24, 2023' },
  { id: 'd2', title: 'Module 1: Introduction (Offline Video)', course: 'Figma for UI/UX Design', size: '156.8 MB', type: 'video', date: 'Oct 23, 2023' },
  { id: 'd3', title: 'Dataset_Marketing_Campaign.csv', course: 'Python Data Science Bootcamp', size: '45.1 MB', type: 'data', date: 'Oct 20, 2023' },
  { id: 'd4', title: 'Course Syllabus.pdf', course: 'Advanced React Patterns', size: '1.1 MB', type: 'document', date: 'Oct 18, 2023' },
];

export default function Downloads() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDownloads = mockDownloads.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="h-5 w-5 text-blue-500" />;
      case 'data': return <HardDrive className="h-5 w-5 text-amber-500" />;
      default: return <File className="h-5 w-5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1000px] mx-auto">
      <PageHeader 
        title="My Downloads" 
        description="Manage your offline resources and course materials."
      />

      {/* Storage Indicator */}
      <Card className="p-6 border-border bg-card">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h3 className="font-semibold text-foreground">Local Storage Used</h3>
            <p className="text-sm text-text-secondary mt-1">Files downloaded for offline access</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-foreground">205.4 MB</span>
          </div>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden mt-4">
          <div className="h-full bg-primary rounded-full" style={{ width: '15%' }} />
        </div>
      </Card>

      {/* List */}
      <Card className="overflow-hidden border-border bg-card">
        <div className="p-4 border-b border-border bg-background/50 flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <Input 
              placeholder="Search downloads..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 rounded-xl bg-background border-border"
            />
          </div>
          <Button variant="outline" className="border-danger/20 text-danger hover:bg-danger/10 bg-background hidden sm:flex">
            <Trash2 className="h-4 w-4 mr-2" /> Clear All
          </Button>
        </div>

        <div className="divide-y divide-border">
          {filteredDownloads.map(item => (
            <div key={item.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-muted/30 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-background border border-border shadow-sm flex items-center justify-center shrink-0">
                  {getIcon(item.type)}
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm sm:text-base">{item.title}</h4>
                  <p className="text-xs text-text-secondary mt-0.5">{item.course}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium">{item.size}</div>
                  <div className="text-xs text-text-secondary mt-0.5">{item.date}</div>
                </div>
                <Badge variant="success" className="hidden sm:inline-flex bg-success/10 text-success border-0 px-2 py-0.5">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Downloaded
                </Badge>
                <Button size="icon" variant="ghost" className="text-danger hover:bg-danger/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {filteredDownloads.length === 0 && (
            <div className="p-12 text-center text-text-secondary">
              <DownloadCloud className="h-8 w-8 mx-auto mb-3 opacity-20" />
              <p>No downloaded files found.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
