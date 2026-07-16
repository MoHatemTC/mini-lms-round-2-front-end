import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Play,
  Star,
  Users,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Bookmark,
  Share2,
  Award,
  Globe,
  MonitorPlay,
  FileText,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

/* ============================================================
   MOCK DATA
   ============================================================ */
const courseData = {
  title: "Advanced React Patterns & Architecture",
  subtitle:
    "Master the transition from Junior to Senior React Developer with enterprise patterns, performance tuning, and architectural decision making.",
  category: "Web Development",
  instructor: {
    name: "Sarah Chen",
    title: "Senior Staff Engineer at Vercel",
    avatar: "https://i.pravatar.cc/150?img=1",
    students: "125k",
    courses: 4,
    rating: 4.9,
    bio: "Sarah has over 10 years of experience building large-scale React applications and actively contributes to the React ecosystem.",
  },
  rating: 4.9,
  reviewsCount: "4,250",
  students: "12k",
  duration: "18h 30m",
  lessons: 42,
  level: "Advanced",
  language: "English",
  lastUpdated: "October 2024",
  price: 89.99,
  image:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
  skills: [
    "Compound Components API",
    "Render Props Pattern",
    "Custom Hook Architecture",
    "React Context optimization",
    "State Machines with XState",
    "Performance Profiling",
  ],
  curriculum: [
    {
      title: "Module 1: Mental Models for Advanced React",
      lessons: 5,
      duration: "1h 45m",
      items: [
        {
          title: "Welcome & Course Overview",
          type: "video",
          duration: "5:20",
          free: true,
        },
        {
          title: "Thinking in React: Re-evaluation",
          type: "video",
          duration: "18:45",
          free: true,
        },
        {
          title: "The Rendering Pipeline",
          type: "article",
          duration: "10 min",
          free: false,
        },
      ],
    },
    {
      title: "Module 2: Compound Components",
      lessons: 8,
      duration: "3h 20m",
      items: [
        {
          title: "The Props Drilling Problem",
          type: "video",
          duration: "12:30",
          free: false,
        },
        {
          title: "Building a Flexible API",
          type: "video",
          duration: "25:00",
          free: false,
        },
        {
          title: "Context & Compound Components",
          type: "video",
          duration: "22:15",
          free: false,
        },
      ],
    },
    {
      title: "Module 3: Custom Hooks Architecture",
      lessons: 6,
      duration: "2h 50m",
      items: [
        {
          title: "Extracting Stateful Logic",
          type: "video",
          duration: "15:20",
          free: false,
        },
        {
          title: "Testing Custom Hooks",
          type: "video",
          duration: "30:00",
          free: false,
        },
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      user: "Alex M.",
      rating: 5,
      date: "2 weeks ago",
      text: "This course completely changed how I write React components. The compound components module alone is worth the price.",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      user: "David S.",
      rating: 5,
      date: "1 month ago",
      text: "Sarah is an incredible teacher. The concepts are explained clearly and the exercises are very practical.",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
  ],
};

export default function CourseDetails() {
  const [expandedModules, setExpandedModules] = useState([0]);

  const toggleModule = (index) => {
    setExpandedModules((curr) =>
      curr.includes(index) ? curr.filter((i) => i !== index) : [...curr, index],
    );
  };

  return (
    <div className="pb-20">
      {/* Hero Banner */}
      <div className="relative bg-black text-white py-16 sm:py-24 overflow-hidden rounded-[32px] mx-4 sm:mx-8 mb-8 border border-border shadow-2xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={courseData.image}
            alt="Course Cover"
            className="w-full h-full object-cover opacity-40 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-primary/20 text-primary border-0 text-xs font-bold uppercase tracking-wider backdrop-blur-md"
              >
                {courseData.level}
              </Badge>
              <span className="text-white/60 text-sm">
                {courseData.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              {courseData.title}
            </h1>

            <p className="text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              {courseData.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/90">
              <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                <Star className="h-4 w-4 fill-current" />
                <span>{courseData.rating}</span>
                <span className="text-white/60">
                  ({courseData.reviewsCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-white/60" />
                <span>{courseData.students} students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-white/60" />
                <span>{courseData.language}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Avatar
                src={courseData.instructor.avatar}
                alt={courseData.instructor.name}
                className="h-12 w-12 border-2 border-white/20 shadow-lg"
              />
              <div>
                <p className="font-semibold">{courseData.instructor.name}</p>
                <p className="text-xs text-white/60">
                  {courseData.instructor.title}
                </p>
              </div>
            </div>
          </div>

          {/* Action Card (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <Card className="absolute top-0 right-0 w-full bg-card/95 backdrop-blur-xl border-border shadow-premium overflow-hidden sticky-card">
              <div className="relative aspect-video w-full group cursor-pointer">
                <img
                  src={courseData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 ml-1 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-0 right-0 text-center font-semibold text-white drop-shadow-md">
                  Preview Course
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-foreground">
                    ${courseData.price}
                  </span>
                </div>

                <Link to="/learner/courses/1/play" className="block w-full">
                  <Button className="w-full h-14 rounded-xl text-lg font-bold bg-foreground text-background hover:bg-foreground/90 shadow-xl hover:scale-[1.02] transition-transform">
                    Enroll Now
                  </Button>
                </Link>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="w-full h-11 rounded-xl border-border hover:bg-muted"
                  >
                    <Bookmark className="h-4 w-4 mr-2" /> Save
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-11 rounded-xl border-border hover:bg-muted"
                  >
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                </div>

                <div className="space-y-3 pt-6 border-t border-border text-sm text-text-secondary">
                  <h4 className="font-semibold text-foreground mb-4">
                    This course includes:
                  </h4>
                  <div className="flex items-center gap-3">
                    <MonitorPlay className="h-4 w-4" /> {courseData.duration} of
                    video
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4" /> 12 reading articles
                  </div>
                  <div className="flex items-center gap-3">
                    <Download className="h-4 w-4" /> 24 downloadable resources
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4" /> Certificate of completion
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* What you'll learn */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              What you'll learn
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 sm:p-8 rounded-[24px] border border-border bg-muted/10">
              {courseData.skills.map((skill, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum */}
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Course Curriculum
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  {courseData.lessons} lessons • {courseData.duration}
                </p>
              </div>
              <button
                onClick={() =>
                  setExpandedModules(
                    expandedModules.length === courseData.curriculum.length
                      ? []
                      : courseData.curriculum.map((_, i) => i),
                  )
                }
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {expandedModules.length === courseData.curriculum.length
                  ? "Collapse all"
                  : "Expand all"}
              </button>
            </div>

            <div className="border border-border rounded-[24px] overflow-hidden bg-card">
              {courseData.curriculum.map((module, mIndex) => {
                const isExpanded = expandedModules.includes(mIndex);
                return (
                  <div
                    key={mIndex}
                    className="border-b border-border last:border-0"
                  >
                    <button
                      onClick={() => toggleModule(mIndex)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 text-left">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-text-secondary" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-text-secondary" />
                        )}
                        <div>
                          <h3 className="font-bold text-foreground">
                            {module.title}
                          </h3>
                        </div>
                      </div>
                      <span className="hidden sm:block text-sm text-text-secondary">
                        {module.lessons} lessons • {module.duration}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-background"
                        >
                          <div className="py-2">
                            {module.items.map((item, iIndex) => (
                              <div
                                key={iIndex}
                                className="flex items-center justify-between py-3 px-5 sm:px-14 hover:bg-muted/20 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  {item.type === "video" ? (
                                    <MonitorPlay className="h-4 w-4 text-text-secondary" />
                                  ) : (
                                    <FileText className="h-4 w-4 text-text-secondary" />
                                  )}
                                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                    {item.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4">
                                  {item.free && (
                                    <Badge
                                      variant="secondary"
                                      className="hidden sm:inline-flex bg-primary/10 text-primary border-0 hover:bg-primary/20 cursor-pointer"
                                    >
                                      Preview
                                    </Badge>
                                  )}
                                  <span className="text-xs text-text-secondary w-12 text-right">
                                    {item.duration}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Instructor */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Your Instructor
            </h2>
            <div className="p-6 sm:p-8 rounded-[24px] border border-border bg-card">
              <div className="flex items-start gap-6">
                <Avatar
                  src={courseData.instructor.avatar}
                  className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border border-border"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                    {courseData.instructor.name}
                  </h3>
                  <p className="text-sm font-medium text-text-secondary mb-4">
                    {courseData.instructor.title}
                  </p>

                  <div className="flex gap-4 mb-4 text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 text-amber-400 fill-current" />{" "}
                      {courseData.instructor.rating} Rating
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-text-secondary" />{" "}
                      {courseData.instructor.students} Students
                    </span>
                  </div>

                  <p className="text-foreground leading-relaxed">
                    {courseData.instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Student Feedback
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="font-bold text-lg">4.9</span>
                  <span className="text-text-secondary">course rating</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courseData.reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-6 rounded-[24px] border border-border bg-card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar src={review.avatar} className="h-10 w-10" />
                    <div>
                      <h4 className="font-bold text-foreground">
                        {review.user}
                      </h4>
                      <p className="text-xs text-text-secondary">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Mobile Action Card */}
        <div className="block lg:hidden pt-8 border-t border-border">
          <Link to="/learner/courses/1/play" className="block w-full mb-4">
            <Button className="w-full h-14 rounded-xl text-lg font-bold bg-foreground text-background">
              Enroll for ${courseData.price}
            </Button>
          </Link>
          <div className="space-y-3 text-sm text-text-secondary text-center">
            <p>30-Day Money-Back Guarantee</p>
            <p>Full Lifetime Access</p>
          </div>
        </div>
      </div>
    </div>
  );
}
