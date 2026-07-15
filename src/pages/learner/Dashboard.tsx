import { motion } from 'framer-motion';
import { 
  Play, Flame, Trophy, Clock, BookOpen, 
  ChevronRight, Calendar, Target, Award,
  Sparkles, CheckCircle2, Zap
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { cn } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Link } from 'react-router-dom';

export default function LearnerDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 sm:space-y-8 pb-8 relative"
    >
      {/* Ambient background glow for dark mode */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Hero Welcome Section */}
      <motion.div variants={itemVariants}>
        <Card className="relative overflow-hidden border-border bg-card shadow-premium p-6 sm:p-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-background border border-border rounded-full text-xs font-bold uppercase tracking-wider text-text-secondary mb-4 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Level 12 Scholar
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-3">
                Welcome back, Alex!
              </h1>
              <p className="text-text-secondary text-base sm:text-lg mb-6 leading-relaxed">
                You're in the top 5% of active learners this week. Keep up the momentum! You have <strong className="text-foreground">2 assignments</strong> due soon.
              </p>
              
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-background border border-border rounded-xl shadow-sm hover:border-primary/30 transition-colors">
                  <Zap className="h-5 w-5 text-amber-500 fill-current" />
                  <div>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Total XP</p>
                    <AnimatedCounter value={12450} className="font-bold leading-none" />
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-background border border-border rounded-xl shadow-sm hover:border-primary/30 transition-colors">
                  <Flame className="h-5 w-5 text-orange-500 fill-current" />
                  <div>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Day Streak</p>
                    <AnimatedCounter value={14} className="font-bold leading-none" />
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-background border border-border rounded-xl shadow-sm hover:border-primary/30 transition-colors">
                  <Trophy className="h-5 w-5 text-rose-500" />
                  <div>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Ranking</p>
                    <p className="font-bold leading-none">Top 5%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Circular Progress (Continue Learning) */}
            <div className="relative shrink-0 hidden md:block">
              <svg className="w-32 h-32 transform -rotate-90 drop-shadow-xl">
                <circle cx="64" cy="64" r="60" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-muted" />
                <motion.circle 
                  initial={{ strokeDashoffset: 377 }}
                  animate={{ strokeDashoffset: 377 - (377 * 0.65) }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  cx="64" cy="64" r="60" fill="transparent" stroke="currentColor" strokeWidth="8" 
                  strokeDasharray={377}
                  className="text-primary drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold uppercase text-text-secondary tracking-widest">Progress</span>
                <span className="text-2xl font-black text-foreground">65%</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          
          {/* Continue Learning */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">Continue Learning</h2>
              <Link to="/learner/courses">
                <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">View Library</button>
              </Link>
            </div>
            
            <Card className="overflow-hidden group hover:shadow-premium transition-all border-border bg-card">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3 relative aspect-video sm:aspect-auto overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop" 
                    alt="Course thumbnail" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/20 group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 ml-1 fill-current" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col justify-center flex-1">
                  <Badge variant="secondary" className="w-fit mb-2">Advanced React Patterns</Badge>
                  <h3 className="font-bold text-lg text-foreground mb-1">Module 4: Concurrent Rendering</h3>
                  <p className="text-sm text-text-secondary line-clamp-1 mb-4">
                    Learn how useTransition and useDeferredValue work under the hood.
                  </p>
                  
                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      <span>Progress</span>
                      <span className="text-primary">65%</span>
                    </div>
                    <ProgressBar progress={65} className="h-1.5" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Recommended Courses */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">Recommended for You</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { title: 'Next.js 14 Masterclass', instructor: 'Vercel Team', duration: '8h 20m', rating: 4.9, img: 'https://images.unsplash.com/photo-1618477247222-accd0b1aa41d?w=400&h=250&fit=crop' },
                { title: 'Tailwind CSS Pro', instructor: 'Adam W.', duration: '5h 45m', rating: 4.8, img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop' }
              ].map((course, i) => (
                <Card key={i} className="overflow-hidden group hover:shadow-premium transition-all border-border bg-card flex flex-col">
                  <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                    <img src={course.img} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="text-xs text-text-secondary mb-4">{course.instructor}</p>
                    
                    <div className="mt-auto flex items-center justify-between text-xs font-semibold text-text-secondary">
                      <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</div>
                      <div className="flex items-center gap-1 text-amber-500"><Sparkles className="h-3.5 w-3.5 fill-current" /> {course.rating}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-1 space-y-6 sm:space-y-8">
          
          {/* Upcoming Deadlines */}
          <motion.div variants={itemVariants}>
            <Card className="p-5 border-border bg-card shadow-sm">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Upcoming Deadlines
              </h3>
              
              <div className="space-y-4">
                {[
                  { title: 'Compound Components Refactor', course: 'Advanced React', due: 'Tomorrow, 11:59 PM', type: 'Assignment', urgent: true },
                  { title: 'Module 3 Quiz', course: 'System Design', due: 'Oct 18, 11:59 PM', type: 'Quiz', urgent: false },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border cursor-pointer">
                    <div className={cn("mt-0.5 h-2 w-2 rounded-full shrink-0", item.urgent ? "bg-danger" : "bg-amber-500")} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{item.title}</p>
                      <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">{item.course} • {item.type}</p>
                      <p className={cn("text-xs font-medium", item.urgent ? "text-danger" : "text-text-secondary")}>Due: {item.due}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/learner/calendar">
                <Button variant="ghost" className="w-full mt-4 text-xs font-bold text-primary hover:text-primary hover:bg-primary/5">
                  View Calendar <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </Card>
          </motion.div>

          {/* Weekly Goal */}
          <motion.div variants={itemVariants}>
            <Card className="p-5 border-border bg-card shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" /> Weekly Goal
                </h3>
                <span className="text-sm font-bold text-primary">3 / 5 Hrs</span>
              </div>
              <p className="text-xs text-text-secondary mb-4">You're on track to hit your learning goal this week!</p>
              
              <ProgressBar progress={60} className="h-2 mb-4" />
              
              <div className="flex justify-between">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={cn(
                      "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors",
                      i < 3 ? "bg-primary text-white" : i === 3 ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted text-text-secondary"
                    )}>
                      {i < 3 ? <CheckCircle2 className="h-3.5 w-3.5" /> : day}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
