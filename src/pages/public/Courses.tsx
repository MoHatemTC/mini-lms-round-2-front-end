import { BookOpen, Search, Filter, Star, Clock, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';

// Mock Public Courses
const mockCourses = [
  { id: 1, title: 'Advanced React Patterns', instructor: 'Michael Chen', category: 'Development', rating: 4.9, students: 15420, price: '$89.99', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80' },
  { id: 2, title: 'UI/UX Masterclass', instructor: 'Jessica Wong', category: 'Design', rating: 4.8, students: 8230, price: '$79.99', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80' },
  { id: 3, title: 'Python Data Science', instructor: 'Robert Fox', category: 'Data Science', rating: 4.7, students: 12100, price: '$99.99', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80' },
  { id: 4, title: 'Fullstack Next.js', instructor: 'Samira Ali', category: 'Development', rating: 4.9, students: 5400, price: '$129.99', img: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80' },
];

export default function Courses() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">Our Catalog</Badge>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground mb-6">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Premium</span> Courses
          </h1>
          <p className="text-lg text-text-secondary">
            Level up your skills with world-class instructors. Find the perfect course to advance your career today.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-2xl border border-border shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <Input placeholder="Search courses..." className="pl-9 bg-background h-11 rounded-xl" />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
            {['All', 'Development', 'Design', 'Data Science', 'Marketing'].map(cat => (
              <Button key={cat} variant={cat === 'All' ? 'default' : 'outline'} className={cat === 'All' ? "bg-primary text-white" : "bg-background"}>
                {cat}
              </Button>
            ))}
            <Button variant="outline" className="bg-background"><Filter className="h-4 w-4 mr-2"/> Filters</Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCourses.map((course, i) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="overflow-hidden h-full flex flex-col group hover:shadow-premium transition-all border-border bg-card">
                <div className="relative aspect-video overflow-hidden">
                  <img src={course.img} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-sm border-0">{course.category}</Badge>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-sm text-text-secondary mb-4">{course.instructor}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                      <span className="flex items-center gap-1 text-amber-500 font-medium"><Star className="h-4 w-4 fill-current"/> {course.rating}</span>
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="font-bold text-lg text-foreground">{course.price}</span>
                      <Button size="sm" className="btn-gradient rounded-lg text-white">View Details</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
