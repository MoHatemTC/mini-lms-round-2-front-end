import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Save,
  Image as ImageIcon,
  Video,
  BookOpen,
  FileQuestion,
  ClipboardCheck,
  Award,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const steps = [
  { id: "basic", title: "Basic Info", icon: BookOpen },
  { id: "media", title: "Media", icon: ImageIcon },
  { id: "curriculum", title: "Curriculum", icon: Video },
  { id: "quiz", title: "Quiz", icon: FileQuestion },
  { id: "assignments", title: "Assignments", icon: ClipboardCheck },
  { id: "certificates", title: "Certificates", icon: Award },
];

export default function CourseForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Mock autosave
  useEffect(() => {
    const timer = setInterval(() => {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setLastSaved(new Date());
      }, 800);
    }, 15000); // Autosave every 15s
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((curr) => curr + 1);
    } else {
      // Publish
      navigate("/admin/courses");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((curr) => curr - 1);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin/courses">
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
              Create New Course
            </h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-text-secondary">
              {isSaving ? (
                <span className="flex items-center gap-1.5 text-primary">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <Save className="h-3.5 w-3.5" />
                  </motion.div>
                  Autosaving...
                </span>
              ) : lastSaved ? (
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-success" />
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              ) : (
                <span>Unsaved changes</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-10 px-4 rounded-xl border-border"
          >
            Save Draft
          </Button>
          <Button
            className="btn-gradient h-10 px-6 rounded-xl text-white shadow-sm"
            onClick={() => navigate("/admin/courses")}
          >
            Publish Course
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Stepper */}
        <div className="lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-1 bg-card border border-border p-3 rounded-[20px] shadow-sm">
            {steps.map((step, index) => {
              const isCompleted = currentStep > index;
              const isActive = currentStep === index;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : isCompleted
                        ? "text-foreground hover:bg-muted"
                        : "text-text-secondary hover:text-foreground hover:bg-muted",
                  )}
                >
                  <div
                    className={cn(
                      "h-7 w-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : isCompleted
                          ? "bg-primary/20 text-primary"
                          : "bg-muted-foreground/10 text-text-secondary",
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <step.icon className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <span className="text-sm">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0">
          <Card className="p-0 border-border overflow-hidden bg-card shadow-sm rounded-[24px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-6 sm:p-8 min-h-[500px]"
              >
                {/* Step 1: Basic Info */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-1">
                        Basic Information
                      </h2>
                      <p className="text-sm text-text-secondary">
                        Provide the core details about your course.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="title">Course Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g. Advanced React Patterns & Architecture"
                          className="h-11 rounded-xl bg-background border-border"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="subtitle">
                          Subtitle (Short Description)
                        </Label>
                        <Input
                          id="subtitle"
                          placeholder="A brief summary that appears on the course card"
                          className="h-11 rounded-xl bg-background border-border"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label>Category</Label>
                          <select className="flex h-11 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="">Select category...</option>
                            <option value="dev">Development</option>
                            <option value="design">Design</option>
                            <option value="business">Business</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <Label>Difficulty Level</Label>
                          <select className="flex h-11 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="">Select level...</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <Label>Detailed Description</Label>
                        <div className="border border-border rounded-xl overflow-hidden bg-background">
                          {/* Rich text toolbar mock */}
                          <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30">
                            {["B", "I", "U"].map((format) => (
                              <button
                                key={format}
                                className="h-8 w-8 rounded flex items-center justify-center font-serif font-bold text-sm hover:bg-muted text-text-secondary hover:text-foreground"
                              >
                                {format}
                              </button>
                            ))}
                            <div className="w-px h-4 bg-border mx-1" />
                            <button className="h-8 px-2 rounded flex items-center justify-center text-sm hover:bg-muted text-text-secondary hover:text-foreground">
                              &lt;/&gt;
                            </button>
                          </div>
                          <textarea
                            rows={6}
                            placeholder="Describe what students will learn..."
                            className="w-full p-3 bg-transparent border-0 focus:ring-0 text-sm resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Media */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-1">Course Media</h2>
                      <p className="text-sm text-text-secondary">
                        Upload a cover image and promotional video.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label>Course Cover Image</Label>
                        <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center bg-background hover:bg-muted/30 transition-colors cursor-pointer group">
                          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <ImageIcon className="h-8 w-8 text-primary" />
                          </div>
                          <p className="text-sm font-medium mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-text-secondary">
                            SVG, PNG, JPG or GIF (max. 1920x1080px)
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Promotional Video (Optional)</Label>
                        <div className="border border-border rounded-2xl p-6 bg-background flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                            <Video className="h-6 w-6 text-text-secondary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              Add a promo video
                            </p>
                            <p className="text-xs text-text-secondary">
                              Students who watch a promo video are 5X more
                              likely to enroll.
                            </p>
                          </div>
                          <Button variant="outline" className="rounded-xl h-9">
                            Upload Video
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Steps 3-5 (Placeholder for builders) */}
                {currentStep > 1 && (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 animate-pulse-glow">
                      {steps[currentStep].icon({ className: "h-10 w-10" })}
                    </div>
                    <h2 className="text-2xl font-bold">
                      Launch {steps[currentStep].title} Builder
                    </h2>
                    <p className="text-text-secondary max-w-md">
                      This opens the advanced visual builder for{" "}
                      {steps[currentStep].title.toLowerCase()}. You'll be
                      redirected to a dedicated workspace.
                    </p>
                    <Link
                      to={`/admin/${steps[currentStep].title.toLowerCase().replace(" ", "-")}`}
                    >
                      <Button className="btn-gradient mt-4 h-11 px-8 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform">
                        Open Builder <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between p-6 border-t border-border bg-muted/10">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="h-10 px-5 rounded-xl border-border"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="btn-gradient h-10 px-6 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform"
              >
                {currentStep === steps.length - 1
                  ? "Finish & Review"
                  : "Continue"}
                {currentStep < steps.length - 1 && (
                  <ChevronRight className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
