import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  GripVertical,
  Settings,
  Trash2,
  CheckCircle2,
  Circle,
  Type,
  AlignLeft,
  ListOrdered,
  Clock,
  Award,
  Save,
  Play,
  ChevronDown,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

/* ============================================================
   MOCK DATA
   ============================================================ */
const initialQuestions = [
  {
    id: "q1",
    type: "multiple-choice",
    points: 10,
    question: "Which of the following is NOT a valid React Hook?",
    options: [
      { id: "o1", text: "useState", isCorrect: false },
      { id: "o2", text: "useEffect", isCorrect: false },
      { id: "o3", text: "useFetch", isCorrect: true },
      { id: "o4", text: "useContext", isCorrect: false },
    ],
  },
  {
    id: "q2",
    type: "true-false",
    points: 5,
    question:
      "Props in React are read-only and cannot be modified by the child component.",
    options: [
      { id: "o5", text: "True", isCorrect: true },
      { id: "o6", text: "False", isCorrect: false },
    ],
  },
  {
    id: "q3",
    type: "short-answer",
    points: 15,
    question: "Briefly explain the concept of Prop Drilling.",
    options: [],
  },
];

export default function QuizBuilder() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const getQuestionIcon = (type) => {
    switch (type) {
      case "multiple-choice":
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case "true-false":
        return <Circle className="h-4 w-4 text-emerald-500" />;
      case "short-answer":
        return <Type className="h-4 w-4 text-amber-500" />;
      case "essay":
        return <AlignLeft className="h-4 w-4 text-purple-500" />;
      case "ordering":
        return <ListOrdered className="h-4 w-4 text-rose-500" />;
      default:
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const getQuestionLabel = (type) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="max-w-[1200px] mx-auto pb-12 flex flex-col lg:flex-row gap-8">
      {/* Main Builder Area */}
      <div className="flex-1 min-w-0">
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
                Quiz Builder
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Create engaging assessments for your students.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-10 px-4 rounded-xl border-border"
            >
              <Play className="h-4 w-4 mr-2" /> Preview
            </Button>
            <Button className="btn-gradient h-10 px-6 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform">
              <Save className="h-4 w-4 mr-2" /> Save Quiz
            </Button>
          </div>
        </div>

        {/* Question List */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "overflow-hidden border transition-all duration-200 rounded-[20px]",
                  activeQuestion === q.id
                    ? "border-primary shadow-glow bg-card"
                    : "border-border shadow-sm bg-background hover:border-primary/50",
                )}
              >
                {/* Question Header */}
                <div
                  className="p-4 flex items-center gap-4 cursor-pointer"
                  onClick={() =>
                    setActiveQuestion(activeQuestion === q.id ? null : q.id)
                  }
                >
                  <div
                    className="cursor-grab p-1 text-border hover:text-text-secondary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GripVertical className="h-5 w-5" />
                  </div>

                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    {getQuestionIcon(q.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                        Question {index + 1}
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-muted text-[10px] py-0 px-1.5 h-5 font-medium border-0"
                      >
                        {getQuestionLabel(q.type)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-[10px] py-0 px-1.5 h-5 font-medium border-border"
                      >
                        {q.points} pts
                      </Badge>
                    </div>
                    <p className="font-medium text-foreground truncate">
                      {q.question}
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-lg text-danger hover:text-danger hover:bg-danger/10 border-danger/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <button className="p-1 hover:bg-muted rounded-md transition-colors ml-2">
                      {activeQuestion === q.id ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Question Editor (Expanded state) */}
                <AnimatePresence>
                  {activeQuestion === q.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-border"
                    >
                      <div className="p-6 bg-muted/10 space-y-6">
                        <div className="space-y-3">
                          <Label>Question Text</Label>
                          <textarea
                            value={q.question}
                            readOnly
                            rows={3}
                            className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                          />
                        </div>

                        {q.options.length > 0 && (
                          <div className="space-y-3">
                            <Label>Answers</Label>
                            <div className="space-y-3">
                              {q.options.map((opt, oIndex) => (
                                <div
                                  key={opt.id}
                                  className="flex items-center gap-3"
                                >
                                  <button
                                    className={cn(
                                      "h-6 w-6 rounded-full flex items-center justify-center shrink-0 border transition-colors",
                                      opt.isCorrect
                                        ? "bg-success border-success text-white"
                                        : "border-border bg-background hover:border-text-secondary",
                                    )}
                                  >
                                    {opt.isCorrect && (
                                      <Check className="h-3.5 w-3.5" />
                                    )}
                                  </button>
                                  <Input
                                    value={opt.text}
                                    readOnly
                                    className={cn(
                                      "flex-1 h-10 rounded-xl",
                                      opt.isCorrect
                                        ? "border-success/50 bg-success/5"
                                        : "border-border bg-background",
                                    )}
                                  />

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-10 w-10 p-0 rounded-xl border-border text-danger hover:text-danger hover:bg-danger/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}

                              {q.type !== "true-false" && (
                                <Button
                                  variant="outline"
                                  className="w-full h-10 rounded-xl border-dashed border-border text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/5"
                                >
                                  <Plus className="h-4 w-4 mr-2" /> Add Option
                                </Button>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-end pt-4 border-t border-border">
                          <Button className="h-9 px-4 rounded-lg bg-foreground text-background hover:bg-foreground/90">
                            Save Question
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}

          {/* Add Question Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button className="w-full flex items-center justify-center gap-2 p-6 rounded-[20px] border-2 border-dashed border-border text-base font-semibold text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/5 transition-all">
              <Plus className="h-5 w-5" /> Add New Question
            </button>
          </motion.div>
        </div>
      </div>

      {/* Right Sidebar - Quiz Settings */}
      <div className="lg:w-80 shrink-0">
        <div className="sticky top-24 space-y-6">
          <Card className="p-6 rounded-[24px] border-border shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" /> Settings
            </h3>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Time Limit</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <Input
                    type="number"
                    placeholder="Minutes (0 for no limit)"
                    className="pl-9 h-11 rounded-xl"
                    defaultValue="30"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Passing Score (%)</Label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <Input
                    type="number"
                    placeholder="80"
                    className="pl-9 h-11 rounded-xl"
                    defaultValue="80"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    Shuffle Questions
                  </span>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors">
                    <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition-transform" />
                  </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    Show Correct Answers
                  </span>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted border border-border transition-colors">
                    <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-text-secondary transition-transform" />
                  </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    Require Passing to Continue
                  </span>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors">
                    <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition-transform" />
                  </div>
                </label>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-[24px] border-border shadow-sm bg-gradient-to-br from-primary/5 to-secondary/5">
            <h3 className="font-bold mb-2">Quiz Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-text-secondary">
                <span>Total Questions</span>
                <span className="font-bold text-foreground">3</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Total Points</span>
                <span className="font-bold text-foreground">30</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
