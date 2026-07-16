import { useState } from "react";
import {
  Bookmark,
  LayoutGrid,
  List,
  Search,
  Filter,
  Clock,
  Star,
  Share2,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const mockBookmarks = [
  {
    id: "b1",
    type: "course",
    title: "Advanced React Patterns",
    instructor: "Michael Chen",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    rating: 4.9,
    duration: "12h 45m",
    category: "Development",
    savedAt: "2 days ago",
    progress: 45,
  },
  {
    id: "b2",
    type: "lesson",
    title: "Understanding Compound Components",
    instructor: "Advanced React Patterns",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    duration: "24m",
    category: "Video Lesson",
    savedAt: "1 week ago",
    progress: 0,
  },
  {
    id: "b3",
    type: "article",
    title: "The Future of CSS: CSS Nesting and Beyond",
    instructor: "Jessica Wong",
    thumbnail:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop&q=60",
    duration: "8 min read",
    category: "Article",
    savedAt: "3 weeks ago",
    progress: 0,
  },
  {
    id: "b4",
    type: "course",
    title: "Figma for UI/UX Design Masterclass",
    instructor: "Jessica Wong",
    thumbnail:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60",
    rating: 4.8,
    duration: "18h 20m",
    category: "Design",
    savedAt: "1 month ago",
    progress: 12,
  },
];

export default function Bookmarks() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredBookmarks = mockBookmarks.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 pb-12 max-w-[1400px] mx-auto">
      <PageHeader
        title="My Bookmarks"
        description="Access your saved courses, lessons, and articles."
      >
        <div className="flex bg-muted p-1 rounded-xl border border-border">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-lg transition-colors",
              viewMode === "grid"
                ? "bg-background text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground",
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-lg transition-colors",
              viewMode === "list"
                ? "bg-background text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground",
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </PageHeader>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-[20px] border border-border shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <Input
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-background border-border"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="flex bg-muted p-1 rounded-xl border border-border overflow-x-auto hide-scrollbar">
            {["all", "course", "lesson", "article"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize whitespace-nowrap",
                  filterType === type
                    ? "bg-background text-foreground shadow-sm"
                    : "text-text-secondary hover:text-foreground",
                )}
              >
                {type}s
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            className="h-10 rounded-xl border-border bg-background"
          >
            <Filter className="h-4 w-4 mr-2" /> Sort
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="popLayout">
        <div
          className={cn(
            "grid gap-6",
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1",
          )}
        >
          {filteredBookmarks.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={item.id}
            >
              <Card
                className={cn(
                  "overflow-hidden border-border bg-card hover:shadow-md transition-shadow group flex",
                  viewMode === "grid"
                    ? "flex-col h-full"
                    : "flex-row h-32 sm:h-40",
                )}
              >
                {/* Thumbnail */}
                <div
                  className={cn(
                    "relative overflow-hidden shrink-0",
                    viewMode === "grid"
                      ? "aspect-video w-full"
                      : "w-32 sm:w-48 h-full",
                  )}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Type Badge */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-background/90 text-foreground backdrop-blur-sm border-0 capitalize px-2 py-0.5"
                    >
                      {item.type}
                    </Badge>
                  </div>

                  <div className="absolute top-3 right-3">
                    <button className="h-8 w-8 rounded-full bg-background/90 text-primary backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors hover:scale-110 active:scale-95 shadow-sm">
                      <Bookmark className="h-4 w-4 fill-primary" />
                    </button>
                  </div>

                  {viewMode === "grid" && (
                    <div className="absolute bottom-3 right-3">
                      <Badge
                        variant="secondary"
                        className="bg-black/50 text-white border-0 backdrop-blur-sm"
                      >
                        <Clock className="h-3 w-3 mr-1" /> {item.duration}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "flex flex-col flex-1",
                    viewMode === "grid" ? "p-5" : "p-4 sm:p-5",
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="text-xs font-medium text-primary uppercase tracking-wider">
                      {item.category}
                    </div>
                    {viewMode === "list" && (
                      <Badge
                        variant="secondary"
                        className="bg-muted text-foreground border-0"
                      >
                        <Clock className="h-3 w-3 mr-1" /> {item.duration}
                      </Badge>
                    )}
                  </div>

                  <h3
                    className={cn(
                      "font-bold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors",
                      viewMode === "grid" ? "text-lg" : "text-lg sm:text-xl",
                    )}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm text-text-secondary mb-3">
                    {item.instructor}
                  </p>

                  <div className="mt-auto">
                    {/* Progress Bar for courses */}
                    {item.type === "course" && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-text-secondary">
                            {item.progress}% Complete
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      {item.type === "course" ? (
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span>{item.rating}</span>
                        </div>
                      ) : (
                        <div className="text-xs text-text-secondary">
                          Saved {item.savedAt}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-text-secondary hover:text-foreground"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="btn-gradient rounded-lg text-white shadow-sm h-8 px-3"
                        >
                          {item.type === "course" ? "Continue" : "View"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {filteredBookmarks.length === 0 && (
            <div
              className={cn(
                "flex flex-col items-center justify-center p-12 text-center bg-card rounded-[24px] border border-border border-dashed",
                viewMode === "grid" ? "col-span-full" : "",
              )}
            >
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Bookmark className="h-8 w-8 text-text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No bookmarks found</h3>
              <p className="text-text-secondary max-w-sm mb-6">
                You haven't saved any{" "}
                {filterType === "all" ? "items" : filterType + "s"} yet. Browse
                the catalog to find interesting content.
              </p>
              <Button variant="outline" className="bg-background border-border">
                Browse Catalog
              </Button>
            </div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
