import { Card, CardContent } from "@/components/ui/Card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: number
  className?: string
}

export function StatCard({ title, value, icon: Icon, description, trend, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-3xl font-bold">{value}</div>
          {(description || trend !== undefined) && (
            <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
              {trend !== undefined && (
                <span className={trend >= 0 ? "text-success" : "text-danger"}>
                  {trend > 0 ? "+" : ""}{trend}%
                </span>
              )}
              {description && <span>{description}</span>}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
