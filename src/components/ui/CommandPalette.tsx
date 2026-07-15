import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, BookOpen, Users, Settings, 
  FileText, Play, Command, ChevronRight,
  MonitorPlay, Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const groups = [
  {
    title: 'Trending Courses',
    items: [
      { id: '1', title: 'Advanced React Patterns', icon: MonitorPlay, href: '/learner/courses/1' },
      { id: '2', title: 'UI/UX Masterclass', icon: MonitorPlay, href: '/learner/courses/2' },
    ]
  },
  {
    title: 'Pages',
    items: [
      { id: '3', title: 'Dashboard', icon: BookOpen, href: '/learner' },
      { id: '4', title: 'My Certificates', icon: Award, href: '/learner/certificates' },
      { id: '5', title: 'Account Settings', icon: Settings, href: '/learner/settings' },
    ]
  },
  {
    title: 'Instructors',
    items: [
      { id: '6', title: 'Sarah Chen', icon: Users, href: '/learner/instructors/1' },
      { id: '7', title: 'Marcus Johnson', icon: Users, href: '/learner/instructors/2' },
    ]
  }
];

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Flatten items for keyboard navigation
  const flatItems = groups.flatMap(group => group.items).filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % (flatItems.length || 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + (flatItems.length || 1)) % (flatItems.length || 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (flatItems[selectedIndex]) {
            navigate(flatItems[selectedIndex].href);
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, flatItems, selectedIndex, navigate, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-4 top-[10%] z-[101] mx-auto max-w-2xl overflow-hidden rounded-[24px] border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center border-b border-border px-4 py-4">
              <Search className="h-5 w-5 text-text-secondary mr-3" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="flex-1 bg-transparent text-lg text-foreground placeholder-text-secondary outline-none"
                placeholder="Search courses, lessons, settings..."
              />
              <kbd className="hidden sm:inline-flex items-center h-6 px-2 rounded bg-muted border border-border text-[10px] font-medium text-text-secondary font-sans">
                ESC
              </kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
              {flatItems.length === 0 ? (
                <div className="py-14 text-center text-sm text-text-secondary">
                  No results found for "{query}"
                </div>
              ) : (
                groups.map((group) => {
                  const filteredItems = group.items.filter(item => 
                    item.title.toLowerCase().includes(query.toLowerCase())
                  );
                  
                  if (filteredItems.length === 0) return null;

                  return (
                    <div key={group.title} className="mb-4 last:mb-0">
                      <div className="px-3 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        {group.title}
                      </div>
                      <div className="space-y-1">
                        {filteredItems.map((item) => {
                          const isSelected = flatItems[selectedIndex]?.id === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                navigate(item.href);
                                onClose();
                              }}
                              onMouseEnter={() => setSelectedIndex(flatItems.findIndex(i => i.id === item.id))}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors",
                                isSelected ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
                              )}
                            >
                              <div className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-lg bg-background border transition-colors",
                                isSelected ? "border-primary/30 text-primary" : "border-border text-text-secondary"
                              )}>
                                <item.icon className="h-4 w-4" />
                              </div>
                              <span className="flex-1 font-medium">{item.title}</span>
                              {isSelected && <ChevronRight className="h-4 w-4" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            
            {/* Footer */}
            <div className="border-t border-border bg-muted/30 px-4 py-3 flex items-center justify-between text-[11px] text-text-secondary">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><kbd className="bg-background border border-border px-1.5 rounded">↑↓</kbd> to navigate</span>
                <span className="flex items-center gap-1"><kbd className="bg-background border border-border px-1.5 rounded">↵</kbd> to select</span>
              </div>
              <div className="flex items-center gap-1">
                <Command className="h-3 w-3" /> Linear Style Search
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
