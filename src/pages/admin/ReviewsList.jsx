import { useState } from "react";
import {
  Star,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Trash2,
  MessageSquare,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip as RechartsTooltip,
  Cell,
} from "recharts";

// Mock Data
const ratingDistribution = [
  { rating: "5 Star", count: 850, fill: "#0F766E" },
  { rating: "4 Star", count: 320, fill: "#14B8A6" },
  { rating: "3 Star", count: 120, fill: "#F59E0B" },
  { rating: "2 Star", count: 45, fill: "#F97316" },
  { rating: "1 Star", count: 12, fill: "#EF4444" },
];

const mockReviews = [
  {
    id: "rv1",
    student: {
      name: "Sarah Jenkins",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    course: "Advanced React Patterns",
    instructor: "Michael Chen",
    rating: 5,
    comment:
      "Absolutely phenomenal course. The instructor explains complex concepts with perfect clarity. The section on compound components blew my mind.",
    date: "Oct 24, 2023",
    status: "approved",
  },
  {
    id: "rv2",
    student: {
      name: "David Smith",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    course: "Figma for UI/UX Design",
    instructor: "Jessica Wong",
    rating: 4,
    comment:
      "Great overview of Figma. I wish there were more exercises on auto-layout, but overall very solid content.",
    date: "Oct 23, 2023",
    status: "pending",
  },
  {
    id: "rv3",
    student: {
      name: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    course: "Python Data Science Bootcamp",
    instructor: "Robert Fox",
    rating: 2,
    comment:
      "The audio quality in section 3 is terrible. I could barely hear the instructor over the background noise.",
    date: "Oct 22, 2023",
    status: "rejected",
  },
  {
    id: "rv4",
    student: {
      name: "James Wilson",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    course: "Advanced React Patterns",
    instructor: "Michael Chen",
    rating: 5,
    comment: "Exactly what I needed to take my React skills to the next level.",
    date: "Oct 21, 2023",
    status: "approved",
  },
  {
    id: "rv5",
    student: { name: "Ahmed Khan", avatar: "https://i.pravatar.cc/150?img=8" },
    course: "Fullstack Next.js",
    instructor: "Samira Ali",
    rating: 1,
    comment: "Course is outdated. Uses Next 12 instead of app router.",
    date: "Oct 20, 2023",
    status: "pending",
  },
];

export default function ReviewsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredReviews = mockReviews.filter((review) => {
    const matchesSearch =
      review.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || review.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge variant="success">Approved</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "rejected":
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-3.5 w-3.5",
              star <= rating
                ? "fill-amber-500 text-amber-500"
                : "fill-muted text-muted",
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Reviews Management"
        description="Monitor, moderate, and respond to student reviews across all courses."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reviews" }]}
      />

      {/* KPI & Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-8 flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-amber-500 fill-amber-500" />
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-2">4.7</h2>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="h-5 w-5 fill-amber-500 text-amber-500"
              />
            ))}
          </div>
          <p className="text-sm font-medium text-text-secondary">
            Based on 1,347 Reviews
          </p>
        </Card>

        <Card className="p-6 lg:col-span-2 flex flex-col justify-between">
          <h3 className="font-semibold text-foreground mb-4">
            Rating Distribution
          </h3>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ratingDistribution}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="rating"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "currentColor" }}
                />
                <RechartsTooltip
                  cursor={{ fill: "currentColor", opacity: 0.05 }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "12px",
                  }}
                />

                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                  {ratingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Table Section */}
      <Card className="overflow-hidden border-border bg-card">
        <div className="p-4 sm:p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-background/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <Input
              placeholder="Search by student or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 rounded-xl bg-background border-border"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex bg-muted p-1 rounded-xl border border-border">
              {["all", "pending", "approved", "rejected"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize",
                    filterStatus === status
                      ? "bg-background text-foreground shadow-sm"
                      : "text-text-secondary hover:text-foreground",
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              className="h-10 rounded-xl border-border bg-background"
            >
              <Filter className="h-4 w-4 mr-2" /> More Filters
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-secondary uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold rounded-tl-xl">
                  Review
                </th>
                <th className="px-6 py-4 font-semibold">Course & Instructor</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right rounded-tr-xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <tr
                    key={review.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-4 max-w-sm">
                        <Avatar
                          src={review.student.avatar}
                          className="h-10 w-10 border border-border shrink-0"
                        />
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-foreground">
                              {review.student.name}
                            </span>
                            {renderStars(review.rating)}
                          </div>
                          <p
                            className="text-text-secondary text-sm line-clamp-2"
                            title={review.comment}
                          >
                            "{review.comment}"
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">
                        {review.course}
                      </div>
                      <div className="text-text-secondary mt-0.5">
                        {review.instructor}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                      {review.date}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(review.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-lg text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10 border-border bg-background"
                          title="Approve"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-lg text-amber-500 hover:text-amber-600 hover:bg-amber-500/10 border-border bg-background"
                          title="Reject"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-500/10 border-border bg-background"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-text-secondary"
                  >
                    <MessageSquare className="h-8 w-8 mx-auto mb-3 opacity-20" />
                    <p>No reviews found matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border bg-background/50 flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            Showing {filteredReviews.length} reviews
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-lg border-border bg-background"
              disabled
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-lg border-border bg-background"
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
