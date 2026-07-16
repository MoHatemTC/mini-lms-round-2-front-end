import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  CheckCircle2,
  MessageSquare,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

/* ============================================================
   MOCK DATA
   ============================================================ */
const notifications = [
  {
    id: 1,
    type: "assignment",
    title: "Assignment Graded",
    message: "Sarah Chen has graded your Compound Components submission.",
    time: "10 mins ago",
    unread: true,
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
    link: "/learner/assignments",
  },
  {
    id: 2,
    type: "discussion",
    title: "New Reply",
    message: "Marcus replied to your question in React Rendering Pipeline.",
    time: "2 hours ago",
    unread: true,
    icon: MessageSquare,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    link: "/learner/courses/1/play",
  },
  {
    id: 3,
    type: "system",
    title: "Maintenance Update",
    message: "The platform will be down for 30 minutes tomorrow at 2AM UTC.",
    time: "1 day ago",
    unread: false,
    icon: ShieldCheck,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    link: "#",
  },
  {
    id: 4,
    type: "deadline",
    title: "Upcoming Deadline",
    message: "Quiz: Advanced Hooks is due in 24 hours.",
    time: "2 days ago",
    unread: false,
    icon: Clock,
    color: "text-danger",
    bg: "bg-danger/10",
    link: "/learner/quizzes",
  },
];

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative h-9 w-9 flex items-center justify-center rounded-xl text-text-secondary hover:text-foreground hover:bg-muted transition-colors"
      >
        <Bell className="h-[18px] w-[18px]" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-danger ring-2 ring-background" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-x-4 top-20 z-[101] mx-auto max-w-sm overflow-hidden rounded-[24px] border border-border bg-card shadow-premium sm:right-4 sm:left-auto sm:w-[380px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-4 bg-muted/30">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground">Notifications</h3>
                  {unreadCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-0 text-[10px]"
                    >
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                    Mark all read
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg hover:bg-muted text-text-secondary transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                      <Bell className="h-5 w-5 text-text-secondary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      All caught up!
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      Check back later for new updates.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {notifications.map((notification) => (
                      <Link
                        key={notification.id}
                        to={notification.link}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block p-4 transition-colors hover:bg-muted/50 relative",
                          notification.unread ? "bg-primary/5" : "bg-card",
                        )}
                      >
                        {notification.unread && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                        )}
                        <div className="flex gap-4">
                          <div
                            className={cn(
                              "h-10 w-10 shrink-0 rounded-xl flex items-center justify-center",
                              notification.bg,
                              notification.color,
                            )}
                          >
                            <notification.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p
                                className={cn(
                                  "text-sm font-bold truncate",
                                  notification.unread
                                    ? "text-foreground"
                                    : "text-foreground/80",
                                )}
                              >
                                {notification.title}
                              </p>
                              <span className="text-[10px] text-text-secondary whitespace-nowrap ml-2">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border p-2 bg-muted/30">
                <Button
                  variant="ghost"
                  className="w-full text-xs font-semibold text-text-secondary hover:text-foreground"
                >
                  View all notifications
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
