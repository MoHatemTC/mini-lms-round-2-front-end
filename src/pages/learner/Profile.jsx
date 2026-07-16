import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Link as LinkIcon,
  Edit,
  Award,
  BookOpen,
  Clock,
  Zap,
  CheckCircle2,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

/* ============================================================
   MOCK DATA
   ============================================================ */
const userProfile = {
  name: "Alex Student",
  username: "@alexstudent",
  title: "Frontend Developer & UI Designer",
  bio: "Passionate about building accessible and performant web applications. Currently focused on mastering React and Next.js ecosystem.",
  location: "San Francisco, CA",
  joinedDate: "Joined March 2023",
  website: "github.com/alexstudent",
  avatar: "https://i.pravatar.cc/150?img=12",
  cover:
    "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop",
  stats: {
    coursesCompleted: 12,
    hoursLearned: 145,
    certificates: 4,
    xp: "12.4k",
  },
};

const activityTimeline = [
  {
    id: 1,
    type: "certificate",
    title: "Earned a Certificate",
    target: "Advanced React Patterns",
    date: "2 days ago",
    icon: Award,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    id: 2,
    type: "course_completed",
    title: "Completed Course",
    target: "UI/UX Masterclass",
    date: "1 week ago",
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    id: 3,
    type: "course_started",
    title: "Started Course",
    target: "Machine Learning A-Z",
    date: "2 weeks ago",
    icon: Play,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: 4,
    type: "badge",
    title: "Earned Badge",
    target: "7 Day Streak 🔥",
    date: "3 weeks ago",
    icon: Zap,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

export default function LearnerProfile() {
  return (
    <div className="max-w-[1000px] mx-auto pb-12">
      {/* Profile Header (Banner & Info) */}
      <Card className="overflow-hidden border-border bg-card shadow-sm mb-6 sm:mb-8">
        {/* Cover Image */}
        <div className="h-48 sm:h-64 w-full relative">
          <img
            src={userProfile.cover}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            <div className="relative">
              <Avatar
                src={userProfile.avatar}
                className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-card shadow-xl"
              />
              <div
                className="absolute bottom-2 right-2 h-6 w-6 bg-success rounded-full border-2 border-card"
                title="Online"
              />
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <Link to="/learner/settings" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full h-11 rounded-xl border-border bg-background hover:bg-muted font-semibold"
                >
                  <Edit className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {userProfile.name}
            </h1>
            <p className="text-text-secondary font-medium mb-3">
              {userProfile.username}
            </p>
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-0 mb-4"
            >
              {userProfile.title}
            </Badge>

            <p className="text-foreground max-w-2xl mx-auto sm:mx-0 leading-relaxed mb-6">
              {userProfile.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-sm text-text-secondary">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {userProfile.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {userProfile.joinedDate}
              </div>
              <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                <LinkIcon className="h-4 w-4" /> {userProfile.website}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: Stats & Skills */}
        <div className="md:col-span-4 space-y-6 sm:space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 border-border text-center bg-card shadow-sm hover:shadow-md transition-shadow">
              <BookOpen className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {userProfile.stats.coursesCompleted}
              </p>
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Courses
              </p>
            </Card>
            <Card className="p-4 border-border text-center bg-card shadow-sm hover:shadow-md transition-shadow">
              <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {userProfile.stats.hoursLearned}
              </p>
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Hours
              </p>
            </Card>
            <Card className="p-4 border-border text-center bg-card shadow-sm hover:shadow-md transition-shadow">
              <Award className="h-6 w-6 text-amber-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {userProfile.stats.certificates}
              </p>
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Certificates
              </p>
            </Card>
            <Card className="p-4 border-border text-center bg-card shadow-sm hover:shadow-md transition-shadow">
              <Zap className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {userProfile.stats.xp}
              </p>
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Total XP
              </p>
            </Card>
          </div>

          <Card className="p-6 border-border bg-card shadow-sm">
            <h3 className="font-bold text-lg text-foreground mb-4">
              Top Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "TypeScript",
                "Next.js",
                "UI Design",
                "Figma",
                "Node.js",
                "Tailwind CSS",
              ].map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-border bg-muted/30 text-foreground py-1 px-3"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Activity Timeline */}
        <div className="md:col-span-8 space-y-6 sm:space-y-8">
          <Card className="p-6 sm:p-8 border-border bg-card shadow-sm h-full">
            <h3 className="text-xl font-bold text-foreground mb-6">
              Recent Activity
            </h3>

            <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:to-transparent">
              {activityTimeline.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute left-[-32px] md:left-1/2 md:-ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-background border-2 border-border shadow-sm z-10 -mt-1">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        item.color.replace("text-", "bg-"),
                      )}
                    />
                  </div>

                  <div className="bg-muted/30 border border-border p-4 rounded-xl hover:border-primary/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                          item.bg,
                          item.color,
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary mb-0.5">
                          {item.title}
                        </p>
                        <p className="font-bold text-foreground">
                          {item.target}
                        </p>
                        <p className="text-xs text-text-secondary mt-2">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
