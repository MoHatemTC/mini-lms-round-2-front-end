import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Play,
  CheckCircle2,
  Search,
  Grid,
  List as ListIcon,
  BookOpen,
  Award,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

/* ============================================================
   MOCK DATA
   ============================================================ */
const myCourses = [
  {
    id: "1",
    title: "Advanced React Patterns & Architecture",
    instructor: "Sarah Chen",
    category: "Development",
    progress: 68,
    status: "in-progress",
    lastAccessed: "2 mins ago",
    lessonsCompleted: 28,
    totalLessons: 42,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
  },
  {
    id: "2",
    title: "UI/UX Masterclass: From Figma to Framer",
    instructor: "Marcus Johnson",
    category: "Design",
    progress: 100,
    status: "completed",
    lastAccessed: "2 weeks ago",
    lessonsCompleted: 28,
    totalLessons: 28,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
  },
  {
    id: "3",
    title: "Machine Learning with Python",
    instructor: "Dr. Alex Rivera",
    category: "Data Science",
    progress: 15,
    status: "in-progress",
    lastAccessed: "3 days ago",
    lessonsCompleted: 10,
    totalLessons: 65,
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
  },
  {
    id: "4",
    title: "Full-Stack Next.js 14 Development",
    instructor: "William Chen",
    category: "Development",
    progress: 0,
    status: "not-started",
    lastAccessed: "Never",
    lessonsCompleted: 0,
    totalLessons: 54,
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop",
  },
];

export default function MyCourses() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = myCourses.filter((course) => {
    if (activeFilter !== "all" && course.status !== activeFilter) return false;
    if (
      searchQuery &&
      !course.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            My Learning
          </h1>
          <p className="text-text-secondary mt-1">
            Pick up where you left off or review completed courses.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[20px] border border-border shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search your courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Filters & View Toggle */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex bg-muted p-1 rounded-xl">
            {["all", "in-progress", "completed"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-lg transition-all capitalize",
                  activeFilter === filter
                    ? "bg-background shadow-sm text-foreground"
                    : "text-text-secondary hover:text-foreground",
                )}
              >
                {filter.replace("-", " ")}
              </button>
            ))}
          </div>

          <div className="hidden sm:block h-6 w-px bg-border" />

          <div className="hidden sm:flex bg-muted p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                viewMode === "grid"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-text-secondary hover:text-foreground",
              )}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                viewMode === "list"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-text-secondary hover:text-foreground",
              )}
            >
              <ListIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Course Grid (Netflix Style) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode + activeFilter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "grid gap-6 sm:gap-8",
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1",
          )}
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={cn(
                  "overflow-hidden group hover:shadow-premium transition-all duration-300 border-border bg-card flex",
                  viewMode === "grid" ? "flex-col h-full" : "flex-row h-48",
                )}
              >
                {/* Image Section */}
                <div
                  className={cn(
                    "relative overflow-hidden shrink-0",
                    viewMode === "grid" ? "aspect-video w-full" : "w-72 h-full",
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Status Badge Over Image */}
                  <div className="absolute top-3 left-3 z-20">
                    {course.status === "completed" ? (
                      <Badge
                        variant="success"
                        className="bg-success text-white border-0 shadow-sm"
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-black/50 text-white backdrop-blur-md border-0 shadow-sm"
                      >
                        {course.category}
                      </Badge>
                    )}
                  </div>

                  {/* Play Button Overlay (Hover) */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/learner/courses/${course.id}/play`}>
                      <button className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 ml-1 fill-current" />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Content Section */}
                <div
                  className={cn(
                    "p-5 flex flex-col flex-1",
                    viewMode === "list" && "justify-center",
                  )}
                >
                  <h3 className="font-bold text-lg sm:text-xl line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    {course.instructor}
                  </p>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span
                        className={
                          course.progress === 100
                            ? "text-success"
                            : "text-text-secondary"
                        }
                      >
                        {course.progress}% Completed
                      </span>
                      <span className="text-text-secondary">
                        {course.lessonsCompleted} / {course.totalLessons}{" "}
                        Lessons
                      </span>
                    </div>

                    <ProgressBar
                      progress={course.progress}
                      className="h-1.5"
                      indicatorClassName={
                        course.progress === 100 ? "bg-success" : "bg-primary"
                      }
                    />

                    {viewMode === "grid" && (
                      <div className="pt-3 flex items-center justify-between">
                        <Link
                          to={`/learner/courses/${course.id}`}
                          className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                        >
                          View Details
                        </Link>
                        {course.progress === 100 && (
                          <span className="flex items-center gap-1 text-xs font-medium text-amber-500">
                            <Award className="h-4 w-4" /> Earned Certificate
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <BookOpen className="h-10 w-10 text-text-secondary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No courses found</h2>
          <p className="text-text-secondary max-w-md mb-6">
            You haven't started any courses that match your current filters.
          </p>
          <Button className="btn-gradient px-6 rounded-xl text-white shadow-sm">
            Browse Catalog
          </Button>
        </div>
      )}
    </div>
  );
}
