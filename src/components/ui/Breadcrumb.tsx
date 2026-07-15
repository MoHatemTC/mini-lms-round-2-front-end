import { ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, className }: { items: BreadcrumbItem[], className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-text-secondary", className)}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
            {item.href ? (
              <Link to={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
