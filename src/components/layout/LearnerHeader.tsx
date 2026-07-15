import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, Search, Sun, Moon, 
  Command, ChevronRight, GraduationCap, Flame 
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { useSearch } from '@/contexts/SearchContext';
import { useTheme } from '@/contexts/ThemeContext';
import { NotificationCenter } from '@/components/layout/NotificationCenter';
import { cn } from '@/lib/utils';

interface LearnerHeaderProps {
  setIsMobileOpen: (value: boolean) => void;
  isCollapsed: boolean;
}

export function LearnerHeader({ setIsMobileOpen, isCollapsed }: LearnerHeaderProps) {
  const { openSearch } = useSearch();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Generate breadcrumb from path
  const pathnames = location.pathname.split('/').filter(x => x);
  const breadcrumb = pathnames.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1));

  return (
    <header className={cn(
      "fixed top-0 right-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background/80 backdrop-blur-md px-4 sm:gap-x-6 sm:px-6 lg:px-8 transition-all duration-300",
      isCollapsed ? "lg:left-[80px]" : "lg:left-[280px]",
      "left-0" // for mobile
    )}>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-text-secondary hover:text-foreground transition-colors lg:hidden"
        onClick={() => setIsMobileOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Breadcrumb (Desktop) */}
      <div className="hidden lg:flex items-center gap-2 text-sm text-text-secondary">
        <GraduationCap className="h-4 w-4" />
        {breadcrumb.length > 0 && <ChevronRight className="h-4 w-4" />}
        {breadcrumb.map((crumb, index) => (
          <div key={crumb} className="flex items-center gap-2">
            <span className={index === breadcrumb.length - 1 ? "text-foreground font-medium" : ""}>
              {crumb.replace('-', ' ')}
            </span>
            {index < breadcrumb.length - 1 && <ChevronRight className="h-4 w-4" />}
          </div>
        ))}
        {breadcrumb.length === 0 && (
          <span className="text-foreground font-medium">Dashboard</span>
        )}
      </div>

      <div className="flex flex-1 items-center justify-end gap-x-4 self-stretch lg:gap-x-6">
        {/* Global Search / Command Palette */}
        <button
          onClick={openSearch}
          className="relative flex items-center w-full max-w-md bg-muted/50 hover:bg-muted border border-border rounded-xl px-3 py-2 text-sm text-text-secondary transition-colors"
        >
          <Search className="h-4 w-4 mr-2 shrink-0" />
          <span className="truncate">Search courses, topics, or skills...</span>
          <div className="ml-auto flex items-center gap-1 shrink-0">
            <kbd className="hidden sm:inline-flex items-center h-5 px-1.5 rounded bg-background border border-border text-[10px] font-medium text-text-secondary font-sans">
              <Command className="h-3 w-3 mr-0.5" /> K
            </kbd>
          </div>
        </button>

        <div className="flex items-center gap-2">
          {/* Gamification Streak */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 text-orange-500 rounded-xl font-bold text-sm">
            <Flame className="h-4 w-4" fill="currentColor" />
            14
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="h-9 w-9 flex items-center justify-center rounded-xl text-text-secondary hover:text-foreground hover:bg-muted transition-colors relative overflow-hidden"
          >
            <motion.div
              initial={false}
              animate={{ y: theme === 'dark' ? 24 : 0, opacity: theme === 'dark' ? 0 : 1 }}
              className="absolute"
            >
              <Sun className="h-[18px] w-[18px]" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ y: theme === 'light' ? -24 : 0, opacity: theme === 'light' ? 0 : 1 }}
              className="absolute"
            >
              <Moon className="h-[18px] w-[18px]" />
            </motion.div>
          </button>

          {/* Notifications */}
          <NotificationCenter />

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border mx-2" aria-hidden="true" />

          {/* Profile dropdown */}
          <button className="flex items-center gap-3 p-1 rounded-full hover:bg-muted transition-colors">
            <Avatar src="https://i.pravatar.cc/150?img=12" alt="Student" className="h-8 w-8 rounded-full border border-border shadow-sm" />
            <div className="hidden lg:flex flex-col items-start mr-2">
              <span className="text-sm font-semibold leading-none text-foreground mb-1">
                Alex Student
              </span>
              <span className="text-[10px] leading-none text-primary font-bold uppercase tracking-wider">
                Level 12 Scholar
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
