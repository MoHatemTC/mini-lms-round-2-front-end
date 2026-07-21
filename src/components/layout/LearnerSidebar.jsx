import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from '../../store/authThunks';
import {
  LayoutDashboard,
  PlayCircle,
  BookOpen,
  Map,
  Tags,
  ClipboardCheck,
  FileQuestion,
  Award,
  Trophy,
  Bookmark,
  DownloadCloud,
  Calendar,
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { cn } from "../../lib/utils";

const navigation = [
  {
    group: "Learning",
    items: [
      { name: "My Courses", href: "/learner/courses", icon: BookOpen },
    ],
  }
];

export function LearnerSidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(logout());
    if (logout.fulfilled.match(resultAction)) {
      navigate('/login');
    }
  };

  const renderSidebarContent = () => (
    <div className="flex h-full flex-col bg-[#042F2E] dark:bg-[#020617] text-white">
      {/* Branding */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-white/10">
        <Link to="/learner/dashboard" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shrink-0 shadow-lg">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold tracking-tight text-white">
              Learnify
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide py-6 px-3 space-y-8">
        {navigation.map((group) => (
          <div key={group.group}>
            {!isCollapsed && (
              <h3 className="px-3 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                {group.group}
              </h3>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
                // Highlight "Continue Learning" with a special gradient style when active
                const isSpecialActive =
                  isActive && item.name === "Continue Learning";
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "group flex items-center rounded-xl transition-all duration-200 relative overflow-hidden",
                        isCollapsed ? "justify-center p-3" : "px-3 py-2.5",
                        isSpecialActive
                          ? "bg-gradient-to-r from-teal-500/20 to-transparent text-teal-400 font-medium"
                          : isActive
                            ? "bg-white/10 text-white font-medium"
                            : "text-white/60 hover:text-white hover:bg-white/5",
                      )}
                      title={isCollapsed ? item.name : undefined}
                    >
                      {/* Active Indicator Line */}
                      {isActive && !isSpecialActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-teal-400 rounded-r-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}

                      {isSpecialActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-emerald-500" />
                      )}

                      <item.icon
                        className={cn(
                          "shrink-0 transition-colors duration-200",
                          isCollapsed ? "h-5 w-5" : "h-5 w-5 mr-3",
                          isActive
                            ? isSpecialActive
                              ? "text-teal-400"
                              : "text-teal-400"
                            : "text-white/40 group-hover:text-white/80",
                        )}
                      />

                      {!isCollapsed && (
                        <span className="truncate text-sm">{item.name}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / User Area */}
      <div className="shrink-0 border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className={cn(
            "w-full group flex items-center rounded-xl transition-colors text-white/60 hover:text-white hover:bg-white/5",
            isCollapsed ? "justify-center p-3" : "px-3 py-2.5",
          )}
          title={isCollapsed ? "Log out" : undefined}
        >
          <LogOut
            className={cn("shrink-0", isCollapsed ? "h-5 w-5" : "h-5 w-5 mr-3")}
          />
          {!isCollapsed && <span className="text-sm font-medium">Log out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden lg:block transition-all duration-300 shadow-2xl",
          isCollapsed ? "w-[80px]" : "w-[280px]",
        )}
      >
        {renderSidebarContent()}

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3.5 top-20 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm hover:bg-accent transition-colors z-50 focus:outline-none"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden shadow-2xl"
          >
            {renderSidebarContent()}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
