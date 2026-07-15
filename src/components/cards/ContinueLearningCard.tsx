import { PlayCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { EnrolledCourse } from '@/data/mockLearnerData';

interface ContinueLearningCardProps {
  course: EnrolledCourse;
}

export function ContinueLearningCard({ course }: ContinueLearningCardProps) {
  return (
    <Card className="overflow-hidden bg-gradient-to-r from-sidebar to-sidebar-hover text-white border-none shadow-lg">
      <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden shrink-0 shadow-2xl relative">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <button className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
              <PlayCircle className="h-8 w-8 text-white" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 w-full space-y-4">
          <div>
            <p className="text-accent text-sm font-semibold mb-1">Jump back in</p>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">{course.title}</h2>
            <p className="text-white/70 text-sm mt-2">Next Lesson: Component Lifecycle Methods</p>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-white/80">{course.progress}% Completed</span>
              <span className="text-white/80">{course.completedLessons}/{course.totalLessons} Lessons</span>
            </div>
            <ProgressBar progress={course.progress} colorClass="bg-accent" className="bg-white/20" />
          </div>
          
          <div className="pt-2 flex items-center gap-4">
            <Button className="bg-accent text-sidebar hover:bg-accent/90 border-none">
              Resume Course
            </Button>
            <span className="text-xs text-white/50">Last accessed {course.lastAccessed}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
