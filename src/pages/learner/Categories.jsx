import { useState } from "react";
import {
  Tags,
  Search,
  Code,
  Palette,
  Database,
  LineChart,
  Briefcase,
  Camera,
  Music,
  Heart,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Mock Data
const mockCategories = [
  {
    id: "c1",
    name: "Web Development",
    icon: Code,
    count: 124,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "c2",
    name: "Design & UI/UX",
    icon: Palette,
    count: 86,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    id: "c3",
    name: "Data Science",
    icon: Database,
    count: 64,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: "c4",
    name: "Digital Marketing",
    icon: LineChart,
    count: 42,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    id: "c5",
    name: "Business",
    icon: Briefcase,
    count: 105,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    id: "c6",
    name: "Photography",
    icon: Camera,
    count: 38,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    id: "c7",
    name: "Music Production",
    icon: Music,
    count: 24,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    id: "c8",
    name: "Health & Fitness",
    icon: Heart,
    count: 56,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = mockCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8 pb-12 max-w-[1200px] mx-auto">
      <PageHeader
        title="Explore Categories"
        description="Browse our extensive catalog by topic."
      />

      <div className="relative w-full max-w-md mx-auto mb-10 text-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
        <Input
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-12 rounded-2xl bg-background border-border shadow-sm text-center"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="group cursor-pointer hover:shadow-premium border-border bg-card transition-all hover:-translate-y-1 overflow-hidden relative p-6 sm:p-8 flex flex-col items-center text-center h-full">
              <div
                className={cn(
                  "h-16 w-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300",
                  category.bg,
                )}
              >
                <category.icon className={cn("h-8 w-8", category.color)} />
              </div>
              <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm font-medium text-text-secondary">
                {category.count} Courses
              </p>
            </Card>
          </motion.div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="col-span-full py-12 text-center text-text-secondary">
            <Tags className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No categories found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
