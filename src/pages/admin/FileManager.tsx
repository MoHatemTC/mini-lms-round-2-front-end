import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, File, Image as ImageIcon, Video, 
  FileText, UploadCloud, Search, Filter, 
  MoreVertical, Grid, List as ListIcon, Trash2, 
  Download, Plus, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { cn } from '@/lib/utils';

/* ============================================================
   MOCK DATA
   ============================================================ */
const mockFolders = [
  { id: 'f1', name: 'Course Assets', files: 124, size: '2.4 GB', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'f2', name: 'Instructor Resources', files: 45, size: '850 MB', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 'f3', name: 'Student Submissions', files: 892, size: '4.2 GB', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'f4', name: 'Marketing Videos', files: 12, size: '8.1 GB', color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

const mockFiles = [
  { id: '1', name: 'react-fundamentals-v2.mp4', type: 'video', size: '1.2 GB', date: 'Oct 15, 2025', icon: Video, color: 'text-rose-500' },
  { id: '2', name: 'compound-components-diagram.png', type: 'image', size: '2.4 MB', date: 'Oct 14, 2025', icon: ImageIcon, color: 'text-blue-500' },
  { id: '3', name: 'course-syllabus-2026.pdf', type: 'document', size: '850 KB', date: 'Oct 12, 2025', icon: FileText, color: 'text-amber-500' },
  { id: '4', name: 'starter-code.zip', type: 'archive', size: '45 MB', date: 'Oct 10, 2025', icon: File, color: 'text-slate-500' },
  { id: '5', name: 'lesson-3-slides.pdf', type: 'document', size: '4.2 MB', date: 'Oct 09, 2025', icon: FileText, color: 'text-amber-500' },
  { id: '6', name: 'promo-banner-dark.jpg', type: 'image', size: '1.1 MB', date: 'Oct 08, 2025', icon: ImageIcon, color: 'text-blue-500' },
];

export default function FileManager() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
  };

  const filteredFiles = mockFiles.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 sm:space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">File Manager</h1>
          <p className="text-text-secondary mt-1">Manage global assets, course resources, and uploads.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 rounded-xl bg-background border-border">
            <Plus className="h-4 w-4 mr-2" /> New Folder
          </Button>
          <Button className="btn-gradient h-10 rounded-xl text-white shadow-sm font-semibold">
            <UploadCloud className="h-4 w-4 mr-2" /> Upload
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        
        {/* Left Sidebar: Storage & Filters */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 border-border bg-card shadow-sm">
            <h3 className="font-bold text-foreground mb-4">Storage Usage</h3>
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-black text-foreground">64.2 <span className="text-sm font-medium text-text-secondary">GB</span></span>
              <span className="text-sm font-medium text-text-secondary">of 100 GB</span>
            </div>
            <ProgressBar progress={64.2} className="h-2.5 mb-6" indicatorClassName="bg-primary" />
            
            <div className="space-y-3">
              {[
                { label: 'Images', size: '12.4 GB', color: 'bg-blue-500' },
                { label: 'Videos', size: '48.1 GB', color: 'bg-rose-500' },
                { label: 'Documents', size: '3.7 GB', color: 'bg-amber-500' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2.5 w-2.5 rounded-full", item.color)} />
                    <span className="text-text-secondary">{item.label}</span>
                  </div>
                  <span className="font-medium text-foreground">{item.size}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 border-border bg-card shadow-sm">
            <nav className="space-y-1">
              {[
                { label: 'All Files', icon: File },
                { label: 'Recent', icon: Clock },
                { label: 'Images', icon: ImageIcon },
                { label: 'Videos', icon: Video },
                { label: 'Documents', icon: FileText },
              ].map(item => (
                <button key={item.label} className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-muted text-sm font-medium text-text-secondary hover:text-foreground transition-colors">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" /> {item.label}
                  </div>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-2xl border border-border shadow-sm">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search files and folders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="h-9 px-3 rounded-xl border-border bg-background">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              <div className="flex items-center bg-muted p-1 rounded-xl border border-border ml-auto sm:ml-2">
                <button 
                  onClick={() => setView('grid')}
                  className={cn("p-1.5 rounded-lg transition-colors", view === 'grid' ? "bg-background shadow-sm text-foreground" : "text-text-secondary")}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={cn("p-1.5 rounded-lg transition-colors", view === 'list' ? "bg-background shadow-sm text-foreground" : "text-text-secondary")}
                >
                  <ListIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Folders */}
          {searchQuery === '' && (
            <div>
              <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Folders</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {mockFolders.map((folder, i) => (
                  <motion.div
                    key={folder.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-2xl border border-border bg-card hover:shadow-premium hover:-translate-y-1 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", folder.bg, folder.color)}>
                        <Folder className="h-5 w-5 fill-current opacity-20" />
                        <Folder className="h-5 w-5 absolute" />
                      </div>
                      <button className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                    <h3 className="font-bold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">{folder.name}</h3>
                    <p className="text-xs text-text-secondary">{folder.files} files • {folder.size}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Files Dropzone & List */}
          <div>
            <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Files</h2>
            
            <div 
              className={cn(
                "min-h-[400px] rounded-3xl border-2 border-dashed p-4 transition-all",
                isDragging ? "border-primary bg-primary/5" : "border-transparent bg-transparent"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {view === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredFiles.map((file, i) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-4 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="aspect-square rounded-xl bg-muted/50 mb-3 flex items-center justify-center relative overflow-hidden group-hover:bg-muted transition-colors">
                        {file.type === 'image' ? (
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20" />
                        ) : null}
                        <file.icon className={cn("h-10 w-10 z-10", file.color)} />
                        
                        {/* Hover Actions Overlay */}
                        <div className="absolute inset-0 z-20 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                          <button className="h-8 w-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors"><Download className="h-4 w-4" /></button>
                          <button className="h-8 w-8 rounded-full bg-danger/20 text-danger flex items-center justify-center hover:bg-danger/40 transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm text-foreground truncate mb-1" title={file.name}>{file.name}</h4>
                      <div className="flex items-center justify-between text-xs text-text-secondary">
                        <span>{file.size}</span>
                        <span>{file.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/30 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    <div className="col-span-6 sm:col-span-5">Name</div>
                    <div className="col-span-3 hidden sm:block">Date Modified</div>
                    <div className="col-span-3 hidden md:block">Size</div>
                    <div className="col-span-6 sm:col-span-4 md:col-span-1 text-right">Actions</div>
                  </div>
                  <div className="divide-y divide-border">
                    {filteredFiles.map((file) => (
                      <div key={file.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50 transition-colors group">
                        <div className="col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0">
                          <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0 bg-background border border-border", file.color)}>
                            <file.icon className="h-5 w-5" />
                          </div>
                          <span className="font-semibold text-sm text-foreground truncate">{file.name}</span>
                        </div>
                        <div className="col-span-3 hidden sm:block text-sm text-text-secondary">{file.date}</div>
                        <div className="col-span-3 hidden md:block text-sm text-text-secondary">{file.size}</div>
                        <div className="col-span-6 sm:col-span-4 md:col-span-1 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-text-secondary hover:text-foreground rounded-lg hover:bg-muted"><Download className="h-4 w-4" /></button>
                          <button className="p-1.5 text-text-secondary hover:text-danger rounded-lg hover:bg-danger/10"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {filteredFiles.length === 0 && (
                <div className="text-center py-20">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">No files found</h3>
                  <p className="text-sm text-text-secondary">Try adjusting your search or upload a new file.</p>
                </div>
              )}
            </div>
            {isDragging && (
              <div className="fixed inset-0 z-50 bg-primary/10 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                <div className="bg-card p-8 rounded-3xl border-2 border-primary shadow-2xl flex flex-col items-center">
                  <div className="h-20 w-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-4 animate-bounce">
                    <UploadCloud className="h-10 w-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Drop files to upload</h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
