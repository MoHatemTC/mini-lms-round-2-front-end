import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Play, Pause, Volume2, Maximize, Settings, 
  ChevronLeft, Menu, CheckCircle2, Circle, 
  Lock, MessageSquare, FileText, Bookmark, 
  Share2, MoreVertical, SkipBack, SkipForward, 
  ChevronDown, ChevronUp, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/ProgressBar';

/* ============================================================
   MOCK DATA
   ============================================================ */
const courseData = {
  title: 'Advanced React Patterns',
  progress: 25,
  instructor: 'Sarah Chen',
  curriculum: [
    {
      title: 'Module 1: Foundation',
      duration: '45m',
      items: [
        { id: 1, title: 'Welcome & Setup', type: 'video', duration: '5:00', status: 'completed' },
        { id: 2, title: 'Mental Models', type: 'video', duration: '15:20', status: 'completed' },
        { id: 3, title: 'React Rendering Pipeline', type: 'article', duration: '10m read', status: 'current' },
        { id: 4, title: 'Knowledge Check', type: 'quiz', duration: '5 Qs', status: 'locked' },
      ]
    },
    {
      title: 'Module 2: Compound Components',
      duration: '1h 20m',
      items: [
        { id: 5, title: 'The Problem with Props', type: 'video', duration: '12:30', status: 'locked' },
        { id: 6, title: 'Building the API', type: 'video', duration: '25:00', status: 'locked' },
        { id: 7, title: 'Context Integration', type: 'video', duration: '22:15', status: 'locked' },
        { id: 8, title: 'Refactoring Exercise', type: 'assignment', duration: 'Submission', status: 'locked' },
      ]
    }
  ]
};

const notes = [
  { time: '02:15', text: 'Important: The render phase is pure and has no side effects.' },
  { time: '08:40', text: 'Commit phase is where DOM mutations happen.' }
];

export default function CoursePlayer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'discussion' | 'resources'>('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);

  const toggleModule = (index: number) => {
    setExpandedModules(curr => 
      curr.includes(index) ? curr.filter(i => i !== index) : [...curr, index]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] -mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 lg:-mt-8 overflow-hidden bg-background">
      
      {/* Main Content Area (Video & Tabs) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Navigation Bar */}
        <div className="h-14 shrink-0 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Link to="/learner/courses/1" className="p-2 -ml-2 rounded-lg hover:bg-muted text-text-secondary hover:text-foreground transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="h-4 w-px bg-border mx-1" />
            <span className="text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-md tracking-tight">
              {courseData.title}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex h-8 rounded-lg border-border">
              <Share2 className="h-3.5 w-3.5 mr-2" /> Share
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 rounded-lg border-border lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Video Player Area (Glassmorphic Mock) */}
        <div className="relative w-full bg-black aspect-video shrink-0 flex flex-col group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=675&fit=crop" 
            alt="Video Poster"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          
          {/* Mock Video Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50 flex flex-col justify-between p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex justify-between items-start transform translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-300">
              <Badge variant="secondary" className="bg-white/10 text-white backdrop-blur-md border border-white/20">
                1080p HD
              </Badge>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 backdrop-blur-sm rounded-xl">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-4 mt-auto transform translate-y-[10px] group-hover:translate-y-0 transition-transform duration-300">
              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-6 mb-4">
                <button className="text-white/80 hover:text-white transition-colors hover:scale-110"><SkipBack className="h-6 w-6" /></button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-primary/50 transition-all border border-white/10"
                >
                  {isPlaying ? <Pause className="h-7 w-7 fill-current" /> : <Play className="h-7 w-7 ml-1 fill-current" />}
                </button>
                <button className="text-white/80 hover:text-white transition-colors hover:scale-110"><SkipForward className="h-6 w-6" /></button>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-3 px-2">
                <span className="text-xs text-white/80 font-medium font-mono">08:45</span>
                <div className="h-1.5 flex-1 bg-white/20 rounded-full cursor-pointer relative group/bar">
                  <div className="absolute top-0 left-0 h-full bg-primary rounded-full w-[45%] shadow-[0_0_10px_rgba(20,184,166,0.8)]" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[45%] h-4 w-4 bg-white rounded-full shadow border border-primary opacity-0 group-hover/bar:opacity-100 transition-all scale-75 group-hover/bar:scale-100" />
                </div>
                <span className="text-xs text-white/80 font-medium font-mono">18:45</span>
              </div>
              
              {/* Bottom Toolbar */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                  <button className="text-white/80 hover:text-white transition-colors"><Volume2 className="h-5 w-5" /></button>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-white/80 hover:text-white text-xs font-bold bg-white/10 backdrop-blur-sm px-2 py-1 rounded">1x</button>
                  <button className="text-white/80 hover:text-white transition-colors"><Settings className="h-5 w-5" /></button>
                  <button className="text-white/80 hover:text-white transition-colors"><Maximize className="h-5 w-5" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs Area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto relative">
          
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-6">
            React Rendering Pipeline
          </h1>
          
          {/* Tabs Navigation */}
          <div className="flex items-center gap-6 border-b border-border overflow-x-auto scrollbar-hide mb-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'notes', label: 'My Notes' },
              { id: 'discussion', label: 'Discussion' },
              { id: 'resources', label: 'Resources' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "pb-3 text-sm font-bold whitespace-nowrap transition-colors relative uppercase tracking-wider",
                  activeTab === tab.id ? "text-primary" : "text-text-secondary hover:text-foreground"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="playerTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full shadow-[0_-2px_10px_rgba(20,184,166,0.5)]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/90">
                      <p className="text-lg leading-relaxed">In this lesson, we will dive deep into how React processes updates and renders them to the screen. Understanding this pipeline is crucial for writing performant React applications.</p>
                      <h3 className="text-xl font-bold mt-6 mb-3 text-foreground">Key Concepts</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> The Render Phase vs The Commit Phase</li>
                        <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> How reconciliation works under the hood</li>
                        <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Fiber architecture overview</li>
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-[20px] border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <Avatar src="https://i.pravatar.cc/150?img=1" className="h-12 w-12 border-2 border-primary/20" />
                        <div>
                          <p className="font-bold text-foreground">{courseData.instructor}</p>
                          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Instructor</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl border-border font-semibold">Follow</Button>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-6">
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        placeholder="Add a note at 08:45..."
                        className="flex-1 h-12 px-4 rounded-[16px] border border-border bg-card shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
                      />
                      <Button className="btn-gradient h-12 rounded-[16px] px-6 text-white shadow-sm font-bold">Save Note</Button>
                    </div>
                    
                    <div className="space-y-3">
                      {notes.map((note, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 rounded-[16px] border border-border bg-card shadow-sm group hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-mono text-[10px] mt-0.5 shadow-sm">
                                {note.time}
                              </Badge>
                              <p className="text-sm font-medium text-foreground">{note.text}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-danger hover:text-danger hover:bg-danger/10">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Other tabs omitted for brevity, UI remains consistent */}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Curriculum Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="hidden lg:flex flex-col shrink-0 border-l border-border bg-card shadow-2xl relative z-10"
          >
            {/* Sidebar Header */}
            <div className="h-14 shrink-0 border-b border-border flex items-center justify-between px-5 bg-background/50 backdrop-blur-md">
              <h2 className="font-bold tracking-tight text-foreground">Course Content</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-muted text-text-secondary transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Area */}
            <div className="p-5 border-b border-border bg-card">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Your Progress</span>
                <span className="text-xs font-black text-primary">{courseData.progress}%</span>
              </div>
              <ProgressBar progress={courseData.progress} className="h-2" indicatorClassName="bg-primary shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
            </div>

            {/* Curriculum List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {courseData.curriculum.map((module, mIndex) => {
                const isExpanded = expandedModules.includes(mIndex);
                return (
                  <div key={mIndex} className="border-b border-border last:border-0 bg-background">
                    <button 
                      onClick={() => toggleModule(mIndex)}
                      className="w-full flex items-center justify-between p-4 hover:bg-card transition-colors bg-background"
                    >
                      <div className="flex flex-col items-start gap-1">
                        <h3 className="font-bold text-sm text-foreground text-left tracking-tight">{module.title}</h3>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                          {module.items.length} items • {module.duration}
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp className="h-4 w-4 text-text-secondary shrink-0" /> : <ChevronDown className="h-4 w-4 text-text-secondary shrink-0" />}
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-card"
                        >
                          <div className="py-2 border-t border-border/50">
                            {module.items.map((item) => (
                              <button 
                                key={item.id} 
                                disabled={item.status === 'locked'}
                                className={cn(
                                  "w-full flex items-start gap-3 py-3 px-4 transition-all duration-200 group relative",
                                  item.status === 'current' ? "bg-primary/10" : "hover:bg-muted/50",
                                  item.status === 'locked' && "opacity-50 cursor-not-allowed"
                                )}
                              >
                                {item.status === 'current' && (
                                  <motion.div layoutId="activeLesson" className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                                )}
                                
                                {/* Icon / Status */}
                                <div className="mt-0.5 shrink-0 z-10">
                                  {item.status === 'completed' ? <CheckCircle2 className="h-4 w-4 text-success" /> :
                                   item.status === 'locked' ? <Lock className="h-4 w-4 text-text-secondary" /> :
                                   item.status === 'current' ? <Play className="h-4 w-4 text-primary fill-current" /> :
                                   <Circle className="h-4 w-4 text-text-secondary" />}
                                </div>
                                
                                {/* Info */}
                                <div className="flex flex-col items-start min-w-0 flex-1 z-10">
                                  <span className={cn(
                                    "text-sm text-left line-clamp-2",
                                    item.status === 'current' ? "font-bold text-primary" : "font-semibold text-foreground",
                                    item.status !== 'locked' && "group-hover:text-primary transition-colors"
                                  )}>
                                    {item.title}
                                  </span>
                                  <div className="flex items-center gap-1.5 mt-1">
                                    {item.type === 'video' ? <Play className="h-3 w-3 text-text-secondary" /> : 
                                     item.type === 'article' ? <FileText className="h-3 w-3 text-text-secondary" /> :
                                     <MessageSquare className="h-3 w-3 text-text-secondary" />}
                                    <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">{item.duration}</span>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Curriculum Overlay Toggle */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 bg-card border border-r-0 border-border shadow-premium h-24 w-8 items-center justify-center rounded-l-2xl hover:bg-muted transition-colors z-20 group"
        >
          <ChevronLeft className="h-5 w-5 text-text-secondary group-hover:text-foreground transition-colors" />
        </button>
      )}
    </div>
  );
}
