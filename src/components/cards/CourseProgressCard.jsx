import { Play, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function CourseProgressCard({ course }) {
  const isCompleted = course.progress === 100;

  return (
    <Card className="overflow-hidden group flex flex-col h-full hover:border-primary/30 transition-colors">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {isCompleted && (
          <div className="absolute inset-0 bg-success/20 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="secondary"
            className="text-[10px] uppercase px-2 py-0 h-5"
          >
            {course.category}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg line-clamp-2 mb-1 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-text-secondary mb-4 flex-1">
          by {course.instructor}
        </p>

        <div className="mt-auto pt-4 space-y-4 border-t border-border">
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-text-secondary">
                {course.completedLessons} / {course.totalLessons} lessons
              </span>
              <span className={isCompleted ? "text-success" : "text-primary"}>
                {course.progress}%
              </span>
            </div>
            <ProgressBar
              progress={course.progress}
              colorClass={isCompleted ? "bg-success" : "bg-primary"}
            />
          </div>

          <Button
            className="w-full"
            variant={isCompleted ? "outline" : "primary"}
          >
            {isCompleted ? (
              "Review Course"
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" fill="currentColor" /> Continue
                Learning
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
