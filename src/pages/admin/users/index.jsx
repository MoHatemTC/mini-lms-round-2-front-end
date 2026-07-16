import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Shield,
  CheckCircle2,
  XCircle,
  ArrowUpDown,
  Download,
  UserPlus,
  Trash2,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

/* ============================================================
   MOCK DATA
   ============================================================ */
const mockUsers = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    role: "Learner",
    status: "Active",
    joined: "Oct 24, 2024",
    lastActive: "2 mins ago",
    courses: 4,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    role: "Instructor",
    status: "Active",
    joined: "Sep 12, 2024",
    lastActive: "1 hr ago",
    courses: 12,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella.n@email.com",
    role: "Learner",
    status: "Inactive",
    joined: "Aug 05, 2024",
    lastActive: "2 weeks ago",
    courses: 1,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "4",
    name: "William Chen",
    email: "william.c@email.com",
    role: "Admin",
    status: "Active",
    joined: "Jan 10, 2024",
    lastActive: "Now",
    courses: 0,
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: "5",
    name: "Sofia Davis",
    email: "sofia.d@email.com",
    role: "Learner",
    status: "Suspended",
    joined: "Nov 30, 2024",
    lastActive: "1 month ago",
    courses: 2,
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: "6",
    name: "Ethan Wilson",
    email: "ethan.w@email.com",
    role: "Instructor",
    status: "Active",
    joined: "Jul 22, 2024",
    lastActive: "5 hrs ago",
    courses: 8,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "7",
    name: "Emma Thompson",
    email: "emma.t@email.com",
    role: "Learner",
    status: "Active",
    joined: "Dec 05, 2024",
    lastActive: "1 day ago",
    courses: 3,
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "8",
    name: "James Rodriguez",
    email: "james.r@email.com",
    role: "Learner",
    status: "Active",
    joined: "Feb 14, 2024",
    lastActive: "3 days ago",
    courses: 6,
    avatar: "https://i.pravatar.cc/150?img=13",
  },
];

export default function UsersList() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSelectAll = () => {
    if (selectedUsers.length === mockUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(mockUsers.map((u) => u.id));
    }
  };

  const toggleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((uId) => uId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Suspended":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "Admin":
        return (
          <Badge
            variant="primary"
            className="bg-primary/10 text-primary border-0 font-medium"
          >
            Admin
          </Badge>
        );
      case "Instructor":
        return (
          <Badge
            variant="warning"
            className="bg-amber-500/10 text-amber-500 border-0 font-medium"
          >
            Instructor
          </Badge>
        );
      case "Learner":
        return (
          <Badge
            variant="secondary"
            className="bg-muted text-text-secondary border-0 font-medium"
          >
            Learner
          </Badge>
        );
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Users
          </h1>
          <p className="text-text-secondary mt-1">
            Manage learners, instructors, and platform administrators.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            className="hidden sm:flex h-10 px-4 rounded-xl border-border hover:bg-muted"
          >
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button className="btn-gradient w-full sm:w-auto h-10 px-5 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform">
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      {/* Toolbar & Bulk Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[20px] border border-border shadow-sm">
        <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 rounded-xl border-border bg-background shrink-0"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <AnimatePresence>
          {selectedUsers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <span className="text-sm font-medium text-primary mr-2">
                {selectedUsers.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 rounded-xl border-border hover:bg-muted text-text-secondary"
              >
                <Mail className="h-4 w-4 mr-2" /> Message
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 rounded-xl border-danger/20 text-danger hover:bg-danger/10"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Users Table */}
      <Card className="overflow-hidden shadow-sm border-border rounded-[24px]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-text-secondary uppercase text-[10px] font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-primary"
                    checked={
                      selectedUsers.length === mockUsers.length &&
                      mockUsers.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-foreground">
                  <div className="flex items-center gap-1">
                    User <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 cursor-pointer hover:text-foreground">
                  <div className="flex items-center gap-1">
                    Joined <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4">Activity</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockUsers.map((user) => (
                <tr
                  key={user.id}
                  className={cn(
                    "hover:bg-muted/30 transition-colors group",
                    selectedUsers.includes(user.id) ? "bg-primary/5" : "",
                  )}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-border text-primary focus:ring-primary"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 border border-border"
                      />
                      <div>
                        <p className="font-semibold text-foreground">
                          {user.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={getStatusColor(user.status)}
                      className="rounded-md font-medium border-0 bg-opacity-15"
                    >
                      {user.status === "Active" && (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      )}
                      {user.status === "Suspended" && (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-foreground font-medium">
                        {user.courses} courses
                      </span>
                      <span className="text-xs text-text-secondary">
                        Last seen: {user.lastActive}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 text-text-secondary hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-text-secondary hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        title="Change Role"
                      >
                        <Shield className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-text-secondary hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        title="More Actions"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border p-4 bg-muted/10">
          <p className="text-sm text-text-secondary">
            Showing <span className="font-medium text-foreground">1</span> to{" "}
            <span className="font-medium text-foreground">8</span> of{" "}
            <span className="font-medium text-foreground">15,240</span> users
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="h-8 rounded-lg"
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 rounded-lg">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
