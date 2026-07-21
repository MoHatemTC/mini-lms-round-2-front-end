import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LearnerSidebar } from "../components/layout/LearnerSidebar";
import { LearnerHeader } from "../components/layout/LearnerHeader";
import { cn } from "../lib/utils";

export default function LearnerLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);

  // Close mobile sidebar on route change
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setIsMobileOpen(false);
  }

  return (
    <div className="min-h-screen bg-background flex text-foreground selection:bg-primary/20">
      {/* Sidebar Navigation */}
      <LearnerSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300 min-w-0 min-h-screen",
          isCollapsed ? "lg:pl-[80px]" : "lg:pl-[280px]", // Premium wide sidebar
        )}
      >
        <LearnerHeader
          setIsMobileOpen={setIsMobileOpen}
          isCollapsed={isCollapsed}
        />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-x-hidden pt-16">
          {" "}
          {/* pt-16 for sticky header */}
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
            {/* Page Transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} // Smooth premium curve
                className="min-h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
