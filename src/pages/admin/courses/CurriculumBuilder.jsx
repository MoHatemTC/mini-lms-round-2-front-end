import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  GripVertical,
  Video,
  FileText,
  Code,
  Settings,
  Trash2,
  ChevronDown,
  ChevronRight,
  Eye,
  Lock,
  Unlock,
  HelpCircle,
  FileDown,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

/* ============================================================
   MOCK DATA
   ============================================================ */
const initialCurriculum = [
  {
    id: "s1",
    title: "Module 1: Introduction to Advanced Patterns",
    description:
      "Core concepts and mental models for advanced React development.",
    expanded: true,
    lessons: [
      {
        id: "l1",
        title: "Welcome to the Course",
        type: "video",
        duration: "5:20",
        isFree: true,
        isPublished: true,
      },
      {
        id: "l2",
        title: "Course Prerequisites & Setup",
        type: "article",
        duration: "10 min read",
        isFree: true,
        isPublished: true,
      },
      {
        id: "l3",
        title: "Mental Models: Thinking in React",
        type: "video",
        duration: "18:45",
        isFree: false,
        isPublished: true,
      },
    ],
  },
  {
    id: "s2",
    title: "Module 2: Compound Components",
    description: "Building flexible and expressive component APIs.",
    expanded: true,
    lessons: [
      {
        id: "l4",
        title: "The Problem with Props Drilling",
        type: "video",
        duration: "12:30",
        isFree: false,
        isPublished: true,
      },
      {
        id: "l5",
        title: "Implementing Compound Components",
        type: "code",
        duration: "25 min",
        isFree: false,
        isPublished: true,
      },
      {
        id: "l6",
        title: "Context API Integration",
        type: "video",
        duration: "22:15",
        isFree: false,
        isPublished: true,
      },
      {
        id: "l7",
        title: "Module 2 Quiz",
        type: "quiz",
        duration: "15 min",
        isFree: false,
        isPublished: true,
      },
    ],
  },
  {
    id: "s3",
    title: "Module 3: Render Props & Custom Hooks",
    description: "Advanced state sharing techniques.",
    expanded: false,
    lessons: [
      {
        id: "l8",
        title: "Render Props Pattern",
        type: "video",
        duration: "15:20",
        isFree: false,
        isPublished: false,
      },
      {
        id: "l9",
        title: "Refactoring to Custom Hooks",
        type: "code",
        duration: "30 min",
        isFree: false,
        isPublished: false,
      },
    ],
  },
];

export default function CurriculumBuilder() {
  const [sections, setSections] = useState(initialCurriculum);

  const toggleSection = (sectionId) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId ? { ...s, expanded: !s.expanded } : s,
      ),
    );
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 text-blue-500" />;
      case "article":
        return <FileText className="h-4 w-4 text-emerald-500" />;
      case "code":
        return <Code className="h-4 w-4 text-purple-500" />;
      case "pdf":
        return <FileDown className="h-4 w-4 text-rose-500" />;
      case "quiz":
        return <HelpCircle className="h-4 w-4 text-amber-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin/courses/create">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Curriculum Builder
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Organize your course content into modules and lessons.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-10 px-4 rounded-xl border-border"
          >
            Preview
          </Button>
          <Button className="btn-gradient h-10 px-6 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Builder Area */}
      <div className="space-y-6">
        {sections.map((section, sIndex) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sIndex * 0.1 }}
          >
            <Card className="overflow-hidden border border-border shadow-sm rounded-[20px] bg-card">
              {/* Section Header */}
              <div className="p-4 bg-muted/30 border-b border-border flex items-center gap-4 group">
                <div className="cursor-grab p-1 text-border group-hover:text-text-secondary transition-colors">
                  <GripVertical className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="p-1 hover:bg-muted rounded-md transition-colors"
                    >
                      {section.expanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    <h3 className="font-bold text-foreground truncate">
                      {section.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-background border-border"
                    >
                      {section.lessons.length} lessons
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary ml-8 mt-1 truncate">
                    {section.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg text-danger hover:text-danger hover:bg-danger/10 border-danger/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Lessons List */}
              <AnimatePresence>
                {section.expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-2 bg-background">
                      {section.lessons.map((lesson, lIndex) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group"
                        >
                          <div className="cursor-grab p-1 text-border group-hover:text-text-secondary transition-colors">
                            <GripVertical className="h-4 w-4" />
                          </div>

                          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            {getLessonIcon(lesson.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                {lIndex + 1}. {lesson.title}
                              </span>
                              {!lesson.isPublished && (
                                <Badge
                                  variant="warning"
                                  className="text-[10px] px-1.5 py-0 border-0 bg-warning/10 h-5"
                                >
                                  Draft
                                </Badge>
                              )}
                              {lesson.isFree && (
                                <Badge
                                  variant="success"
                                  className="text-[10px] px-1.5 py-0 border-0 bg-success/10 h-5"
                                >
                                  Free Preview
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
                              <span className="capitalize">{lesson.type}</span>
                              <span className="w-1 h-1 rounded-full bg-border" />
                              <span>{lesson.duration}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                              title={
                                lesson.isPublished ? "Unpublish" : "Publish"
                              }
                            >
                              {lesson.isPublished ? (
                                <Eye className="h-4 w-4" />
                              ) : (
                                <EyeOff className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              className="p-1.5 text-text-secondary hover:text-success hover:bg-success/10 rounded-md transition-colors"
                              title={
                                lesson.isFree
                                  ? "Lock Lesson"
                                  : "Make Free Preview"
                              }
                            >
                              {lesson.isFree ? (
                                <Unlock className="h-4 w-4" />
                              ) : (
                                <Lock className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              className="p-1.5 text-text-secondary hover:text-blue-500 hover:bg-blue-500/10 rounded-md transition-colors"
                              title="Edit"
                            >
                              <Settings className="h-4 w-4" />
                            </button>
                            <button
                              className="p-1.5 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-md transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Add Lesson Button */}
                      <button className="w-full flex items-center justify-center gap-2 p-3 mt-2 rounded-xl border border-dashed border-border text-sm font-medium text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/5 transition-all">
                        <Plus className="h-4 w-4" /> Add Lesson
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}

        {/* Add Section Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="w-full flex items-center justify-center gap-2 p-6 rounded-[20px] border-2 border-dashed border-border text-base font-semibold text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/5 transition-all">
            <Plus className="h-5 w-5" /> Add New Module
          </button>
        </motion.div>
      </div>
    </div>
  );
}
