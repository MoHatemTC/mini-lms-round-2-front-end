import { Calendar, User, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const mockPosts = [
  {
    id: 1,
    title: "The Future of CSS: CSS Nesting and Beyond",
    excerpt:
      "Explore the new features coming to CSS and how they will revolutionize web development...",
    author: "Jessica Wong",
    date: "Oct 24, 2023",
    category: "Frontend",
    img: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
  },
  {
    id: 2,
    title: "Mastering React Server Components",
    excerpt:
      "A deep dive into how React Server Components work and when to use them in your next project.",
    author: "Michael Chen",
    date: "Oct 20, 2023",
    category: "React",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    id: 3,
    title: "UI/UX Design Trends for 2024",
    excerpt:
      "Discover the design trends that will dominate the industry next year, from glassmorphism to neubrutalism.",
    author: "Sarah Jenkins",
    date: "Oct 15, 2023",
    category: "Design",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
];

export default function Blog() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Insights & News
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground mb-6">
            Learnify{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Blog
            </span>
          </h1>
          <p className="text-lg text-text-secondary">
            Stay up to date with the latest trends in technology, design, and
            education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden group hover:shadow-premium transition-all border-border bg-card flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-white border-0">
                  {post.category}
                </Badge>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" /> {post.author}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-text-secondary mb-6 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                <Button
                  variant="ghost"
                  className="w-fit p-0 hover:bg-transparent text-primary hover:text-primary/80 font-semibold group/btn"
                >
                  Read Article{" "}
                  <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
