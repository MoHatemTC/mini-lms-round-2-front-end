import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  Search,
  Filter,
  ShieldAlert,
  User,
  Edit,
  Trash,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockLogs = [
  {
    id: 1,
    user: "Admin User",
    action: "Deleted Course",
    target: "Intro to jQuery",
    ip: "192.168.1.1",
    time: "10 mins ago",
    type: "danger",
    icon: Trash,
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Modified Role",
    target: "Instructor Permissions",
    ip: "10.0.0.4",
    time: "1 hour ago",
    type: "warning",
    icon: Edit,
  },
  {
    id: 3,
    user: "System",
    action: "Automated Backup",
    target: "Database",
    ip: "localhost",
    time: "3 hours ago",
    type: "info",
    icon: Settings,
  },
  {
    id: 4,
    user: "Admin User",
    action: "Created User",
    target: "michael.c@learnify.com",
    ip: "192.168.1.1",
    time: "1 day ago",
    type: "success",
    icon: User,
  },
  {
    id: 5,
    user: "Unknown",
    action: "Failed Login",
    target: "admin@learnify.com",
    ip: "203.0.113.42",
    time: "2 days ago",
    type: "danger",
    icon: ShieldAlert,
  },
];

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Audit Logs"
        description="Track all administrative and system actions across the platform."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Audit Logs" },
        ]}
      />

      <Card className="overflow-hidden border-border bg-card shadow-sm">
        <div className="p-4 sm:p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-background/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 rounded-xl bg-background border-border"
            />
          </div>
          <Button
            variant="outline"
            className="h-10 rounded-xl border-border bg-background"
          >
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-secondary uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Action</th>
                <th className="px-6 py-4 font-semibold">Target</th>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">IP Address</th>
                <th className="px-6 py-4 font-semibold text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                          log.type === "danger"
                            ? "bg-red-500/10 text-red-500"
                            : log.type === "warning"
                              ? "bg-amber-500/10 text-amber-500"
                              : log.type === "success"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : "bg-blue-500/10 text-blue-500",
                        )}
                      >
                        <log.icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-foreground">
                        {log.action}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{log.target}</td>
                  <td className="px-6 py-4 text-text-secondary">{log.user}</td>
                  <td className="px-6 py-4 text-text-secondary font-mono text-xs">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4 text-right text-text-secondary whitespace-nowrap">
                    {log.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// Temporary Button import since I forgot it at top
import { Button } from "@/components/ui/Button";
