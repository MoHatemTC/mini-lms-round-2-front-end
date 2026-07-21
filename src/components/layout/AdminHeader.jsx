import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Menu, Search, Bell, Sun, Moon, Globe, 
  Command, ChevronRight, LayoutDashboard, LogOut
} from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { cn } from '../../lib/utils';
import { selectUser } from '../../store/authSelectors';
import { logout } from '../../store/authThunks';

export function AdminHeader({ setIsMobileOpen, isCollapsed }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  // Hardcode theme for now as context is missing
  const theme = 'light'; 

  // Generate breadcrumb from path
  const pathnames = location.pathname.split('/').filter(x => x);
  const breadcrumb = pathnames.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1));

  const handleLogout = async () => {
    const resultAction = await dispatch(logout());
    if (logout.fulfilled.match(resultAction)) {
      navigate('/login');
    }
  };

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
        <LayoutDashboard className="h-4 w-4" />
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
          <span className="text-foreground font-medium">Overview</span>
        )}
      </div>

      <div className="flex flex-1 items-center justify-end gap-x-4 self-stretch lg:gap-x-6">
        {/* Global Search / Command Palette */}
        <button
          className="relative flex items-center w-full max-w-md bg-muted/50 hover:bg-muted border border-border rounded-xl px-3 py-2 text-sm text-text-secondary transition-colors"
        >
          <Search className="h-4 w-4 mr-2 shrink-0" />
          <span className="truncate">Search everywhere...</span>
          <div className="ml-auto flex items-center gap-1 shrink-0">
            <kbd className="hidden sm:inline-flex items-center h-5 px-1.5 rounded bg-background border border-border text-[10px] font-medium text-text-secondary font-sans">
              <Command className="h-3 w-3 mr-0.5" /> K
            </kbd>
          </div>
        </button>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary hover:text-foreground hover:bg-muted transition-colors">
            <Globe className="h-[18px] w-[18px]" />
          </button>

          {/* Theme Toggle */}
          <button 
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
          <button className="relative h-9 w-9 flex items-center justify-center rounded-xl text-text-secondary hover:text-foreground hover:bg-muted transition-colors">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-background" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border mx-2" aria-hidden="true" />

          {/* Profile */}
          <div className="flex items-center gap-3 p-1 rounded-full transition-colors">
            <Avatar src={user?.avatar} alt={user?.name || "Admin"} className="h-8 w-8 rounded-full border border-border shadow-sm" />
            <div className="hidden lg:flex flex-col items-start mr-2">
              <span className="text-sm font-semibold leading-none text-foreground mb-1">
                {user?.name || 'Admin User'}
              </span>
              <span className="text-[10px] leading-none text-text-secondary uppercase tracking-wider font-medium">
                {user?.role || 'Admin'}
              </span>
            </div>
            
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="ml-2 h-9 w-9 flex items-center justify-center rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
