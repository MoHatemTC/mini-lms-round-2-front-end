import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Grid,
  List as ListIcon,
  MoreHorizontal,
  Star,
  Clock,
  Users,
  BookOpen,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

/* ============================================================
   MOCK DATA
   ============================================================ */
const mockCourses = [
  {
    id: "1",
    title: "Advanced React Patterns & Architecture",
    instructor: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    category: "Development",
    difficulty: "Advanced",
    status: "Published",
    students: 1240,
    rating: 4.9,
    price: 89.99,
    lessons: 42,
    duration: "18h 30m",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop",
    updatedAt: "2 days ago",
  },
  {
    id: "2",
    title: "UI/UX Masterclass: From Figma to Framer",
    instructor: {
      name: "Marcus Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    category: "Design",
    difficulty: "Intermediate",
    status: "Draft",
    students: 0,
    rating: 0,
    price: 69.99,
    lessons: 28,
    duration: "12h 15m",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop",
    updatedAt: "4 hours ago",
  },
  {
    id: "3",
    title: "Machine Learning with Python",
    instructor: {
      name: "Dr. Alex Rivera",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    category: "Data Science",
    difficulty: "Advanced",
    status: "Published",
    students: 3450,
    rating: 4.8,
    price: 129.99,
    lessons: 65,
    duration: "32h 45m",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=340&fit=crop",
    updatedAt: "1 week ago",
  },
  {
    id: "4",
    title: "Full-Stack Next.js 14 Development",
    instructor: {
      name: "William Chen",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    category: "Development",
    difficulty: "Intermediate",
    status: "Review",
    students: 0,
    rating: 0,
    price: 99.99,
    lessons: 54,
    duration: "24h 0m",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=340&fit=crop",
    updatedAt: "1 day ago",
  },
  {
    id: "5",
    title: "Cloud Architecture on AWS",
    instructor: {
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    category: "IT & Software",
    difficulty: "Advanced",
    status: "Published",
    students: 2100,
    rating: 4.7,
    price: 149.99,
    lessons: 82,
    duration: "45h 20m",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop",
    updatedAt: "3 weeks ago",
  },
  {
    id: "6",
    title: "Digital Marketing Fundamentals",
    instructor: {
      name: "Sophia Davis",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    category: "Marketing",
    difficulty: "Beginner",
    status: "Published",
    students: 5600,
    rating: 4.6,
    price: 49.99,
    lessons: 22,
    duration: "8h 10m",
    image:
      "https://images.unsplash.com/photo-1432888117426-1482f5f246bb?w=600&h=340&fit=crop",
    updatedAt: "1 month ago",
  },
];

export default function CoursesList() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "success";
      case "Draft":
        return "secondary";
      case "Review":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Courses
          </h1>
          <p className="text-text-secondary mt-1">
            Manage your course catalog, curriculum, and settings.
          </p>
        </div>
        <Link to="/admin/courses/create">
          <Button className="btn-gradient w-full sm:w-auto h-10 px-5 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform">
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[20px] border border-border shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 rounded-xl border-border bg-background"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <div className="h-6 w-px bg-border mx-1" />
          <div className="flex bg-muted p-1 rounded-xl">
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
              onClick={() => setViewMode("table")}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                viewMode === "table"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-text-secondary hover:text-foreground",
              )}
            >
              <ListIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {mockCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden group hover:shadow-premium transition-all duration-300 h-full flex flex-col">
                  {/* Image & Badges */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge
                        variant={getStatusColor(course.status)}
                        className="shadow-sm border-0 font-medium"
                      >
                        {course.status}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="shadow-sm border-0 font-medium bg-black/50 text-white hover:bg-black/50 backdrop-blur-md"
                      >
                        {course.difficulty}
                      </Badge>
                    </div>

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="h-8 w-8 rounded-full bg-white/90 dark:bg-black/60 flex items-center justify-center hover:bg-white dark:hover:bg-black transition-colors shadow-sm">
                        <MoreHorizontal className="h-4 w-4 text-foreground" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 right-3 text-white font-bold text-lg drop-shadow-md">
                      ${course.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {course.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-base line-clamp-2 mb-4 group-hover:text-primary transition-colors flex-1">
                      {course.title}
                    </h3>

                    <div className="flex flex-col gap-3 mt-auto">
                      {/* Instructor */}
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="h-6 w-6"
                        />
                        <span className="text-xs text-text-secondary">
                          {course.instructor.name}
                        </span>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <Users className="h-3.5 w-3.5" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <Star className="h-3.5 w-3.5 text-amber-400" />
                          <span>
                            {course.rating > 0 ? course.rating : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <BookOpen className="h-3.5 w-3.5" />
                          <span>{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden shadow-sm hover:shadow-premium transition-shadow duration-300">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-text-secondary uppercase text-[10px] font-semibold tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Course Info</th>
                      <th className="px-6 py-4 cursor-pointer hover:text-foreground">
                        <div className="flex items-center gap-1">
                          Status <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4 cursor-pointer hover:text-foreground">
                        <div className="flex items-center gap-1">
                          Enrollments <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th className="px-6 py-4">Rating</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockCourses.map((course) => (
                      <tr
                        key={course.id}
                        className="hover:bg-muted/30 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-16 rounded-md overflow-hidden shrink-0 border border-border">
                              <img
                                src={course.image}
                                alt={course.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="max-w-[300px]">
                              <p className="font-semibold text-foreground truncate">
                                {course.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-primary">
                                  {course.category}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-border" />
                                <span className="text-xs text-text-secondary">
                                  {course.instructor.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={getStatusColor(course.status)}
                            className="rounded-md font-medium border-0 bg-opacity-15"
                          >
                            {course.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">
                          ${course.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                          {course.students.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-foreground">
                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                            <span className="font-medium">
                              {course.rating > 0 ? course.rating : "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                              title="Preview"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <Link to={`/admin/courses/${course.id}/edit`}>
                              <button
                                className="p-2 text-text-secondary hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                            </Link>
                            <button
                              className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination (Mock) */}
      <div className="flex items-center justify-between border-t border-border pt-6">
        <p className="text-sm text-text-secondary">
          Showing <span className="font-medium text-foreground">1</span> to{" "}
          <span className="font-medium text-foreground">6</span> of{" "}
          <span className="font-medium text-foreground">24</span> results
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled
            className="h-8 rounded-lg"
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" className="h-8 rounded-lg">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
