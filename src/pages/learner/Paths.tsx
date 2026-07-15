import { useState } from 'react';
import { 
  Map, Search, Clock, Target, ArrowRight,
  Code, Palette, Database, LineChart
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Mock Data
const mockPaths = [
  {
    id: 'p1',
    title: 'Frontend Developer Path',
    description: 'Master HTML, CSS, JavaScript, and modern frameworks like React to build interactive web applications.',
    icon: Code,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    courses: 8,
    duration: '42h',
    level: 'Beginner to Advanced',
    progress: 35
  },
  {
    id: 'p2',
    title: 'UI/UX Design Masterclass',
    description: 'Learn design principles, wireframing, prototyping, and master Figma for professional product design.',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10',
    iconColor: 'text-pink-500',
    courses: 5,
    duration: '28h',
    level: 'Beginner',
    progress: 0
  },
  {
    id: 'p3',
    title: 'Data Science & Machine Learning',
    description: 'From Python basics to advanced neural networks and deep learning models.',
    icon: Database,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    courses: 12,
    duration: '85h',
    level: 'Intermediate',
    progress: 0
  },
  {
    id: 'p4',
    title: 'Digital Marketing Professional',
    description: 'SEO, SEM, Social Media, and Analytics. Everything you need to grow a business online.',
    icon: LineChart,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
    courses: 6,
    duration: '34h',
    level: 'All Levels',
    progress: 100
  },
];

export default function Paths() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPaths = mockPaths.filter(path => 
    path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    path.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12 max-w-[1200px] mx-auto">
      <PageHeader 
        title="Learning Paths" 
        description="Curated sequences of courses designed to help you achieve specific career goals."
      />

      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
        <Input 
          placeholder="Search paths..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-11 rounded-xl bg-background border-border shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPaths.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-border bg-card hover:shadow-md transition-shadow flex flex-col overflow-hidden relative group">
              {/* Top Gradient Banner */}
              <div className={cn("absolute top-0 left-0 right-0 h-2 bg-gradient-to-r opacity-80", path.color)} />
              
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-2", path.bgColor)}>
                    <path.icon className={cn("h-7 w-7", path.iconColor)} />
                  </div>
                  {path.progress > 0 && path.progress < 100 && (
                    <Badge variant="outline" className="bg-background/80 border-primary/30 text-primary">In Progress</Badge>
                  )}
                  {path.progress === 100 && (
                    <Badge variant="success" className="bg-success/10 text-success border-0">Completed</Badge>
                  )}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{path.title}</h3>
                <p className="text-text-secondary text-sm mb-6 flex-1">{path.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-text-secondary mb-6">
                  <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                    <Target className="h-3.5 w-3.5" /> {path.courses} Courses
                  </span>
                  <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                    <Clock className="h-3.5 w-3.5" /> {path.duration}
                  </span>
                  <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                    <Map className="h-3.5 w-3.5" /> {path.level}
                  </span>
                </div>

                {path.progress > 0 ? (
                  <div className="mt-auto pt-6 border-t border-border">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-foreground">{path.progress}% Complete</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-4">
                      <div className={cn("h-full rounded-full bg-gradient-to-r", path.color)} style={{ width: `${path.progress}%` }} />
                    </div>
                    <Button className="w-full h-11 btn-gradient rounded-xl shadow-sm group-hover:scale-[1.01] transition-transform">
                      {path.progress === 100 ? 'View Certificate' : 'Continue Path'} <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                ) : (
                  <div className="mt-auto pt-6 border-t border-border">
                    <Button variant="outline" className="w-full h-11 bg-background border-border hover:bg-muted/50 transition-colors">
                      Start Path
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}

        {filteredPaths.length === 0 && (
          <div className="col-span-full py-12 text-center text-text-secondary">
            <Map className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No learning paths found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
