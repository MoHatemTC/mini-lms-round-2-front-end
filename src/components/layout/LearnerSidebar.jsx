import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import { cn } from "@/lib/utils";

const navigation = [
  {
    group: "Learning",
    items: [
      { name: "Dashboard", href: "/learner", icon: LayoutDashboard },
      {
        name: "Continue Learning",
        href: "/learner/courses/1/play",
        icon: PlayCircle,
      },
      { name: "My Courses", href: "/learner/courses", icon: BookOpen },
      { name: "Learning Paths", href: "/learner/paths", icon: Map },
      { name: "Categories", href: "/learner/categories", icon: Tags },
    ],
  },
  {
    group: "Assessments & Rewards",
    items: [
      {
        name: "Assignments",
        href: "/learner/assignments",
        icon: ClipboardCheck,
      },
      { name: "Quizzes", href: "/learner/quizzes", icon: FileQuestion },
      { name: "Certificates", href: "/learner/certificates", icon: Award },
      { name: "Achievements", href: "/learner/achievements", icon: Trophy },
    ],
  },
  {
    group: "My Library",
    items: [
      { name: "Bookmarks", href: "/learner/bookmarks", icon: Bookmark },
      { name: "Downloads", href: "/learner/downloads", icon: DownloadCloud },
      { name: "Calendar", href: "/learner/calendar", icon: Calendar },
    ],
  },
  {
    group: "Account",
    items: [
      { name: "Notifications", href: "/learner/notifications", icon: Bell },
      { name: "Profile", href: "/learner/profile", icon: User },
      { name: "Settings", href: "/learner/settings", icon: Settings },
      { name: "Help Center", href: "/help", icon: HelpCircle },
    ],
  },
];

export function LearnerSidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-[#042F2E] dark:bg-[#020617] text-white">
      {/* Branding */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-white/10">
        <Link to="/learner" className="flex items-center gap-3">
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

      {/* Daily Progress / Streak (Mock) */}
      {!isCollapsed && (
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Weekly Goal
            </span>
            <span className="text-xs font-bold text-teal-400">3/5 Days</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full"
              style={{ width: "60%" }}
            />
          </div>
        </div>
      )}

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
                const isActive = location.pathname === item.href;
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
        <Link
          to="/auth/login"
          className={cn(
            "group flex items-center rounded-xl transition-colors text-white/60 hover:text-white hover:bg-white/5",
            isCollapsed ? "justify-center p-3" : "px-3 py-2.5",
          )}
          title={isCollapsed ? "Log out" : undefined}
        >
          <LogOut
            className={cn("shrink-0", isCollapsed ? "h-5 w-5" : "h-5 w-5 mr-3")}
          />
          {!isCollapsed && <span className="text-sm font-medium">Log out</span>}
        </Link>
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
        <SidebarContent />

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
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
