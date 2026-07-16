import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Video,
  ClipboardCheck,
  BookOpen,
  User,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

/* ============================================================
   MOCK DATA
   ============================================================ */
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const mockEvents = [
  {
    id: 1,
    title: "Live Q&A: React Hooks",
    type: "event",
    time: "10:00 AM - 11:30 AM",
    instructor: "Sarah Chen",
    date: 15,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: Video,
  },
  {
    id: 2,
    title: "Compound Components Quiz",
    type: "quiz",
    time: "Due 11:59 PM",
    instructor: null,
    date: 18,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    icon: ClipboardCheck,
  },
  {
    id: 3,
    title: "Final Project Submission",
    type: "assignment",
    time: "Due 11:59 PM",
    instructor: null,
    date: 22,
    color: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "1-on-1 Mentoring",
    type: "event",
    time: "2:00 PM - 2:30 PM",
    instructor: "Marcus Johnson",
    date: 25,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    icon: User,
  },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025
  const [view, setView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(15);

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );
  const firstDay = getFirstDayOfMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="max-w-[1200px] mx-auto pb-12 flex flex-col lg:flex-row gap-8">
      {/* Left Column: Calendar Grid */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex bg-muted p-1 rounded-xl">
              <button
                onClick={() => setView("month")}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-lg transition-all",
                  view === "month"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-text-secondary",
                )}
              >
                Month
              </button>
              <button
                onClick={() => setView("week")}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-lg transition-all",
                  view === "week"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-text-secondary",
                )}
              >
                Week
              </button>
            </div>
            <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1 shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevMonth}
                className="h-8 w-8 p-0 rounded-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextMonth}
                className="h-8 w-8 p-0 rounded-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <Card className="border-border bg-card shadow-premium overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-border bg-muted/30">
            {days.map((day) => (
              <div
                key={day}
                className="py-3 text-center text-xs font-semibold text-text-secondary uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Grid Cells */}
          <div className="grid grid-cols-7 auto-rows-[120px] bg-border gap-px">
            {/* Empty cells before start of month */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-muted/10 p-2" />
            ))}

            {/* Days of month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === 15; // mock today
              const isSelected = day === selectedDate;
              const dayEvents = mockEvents.filter((e) => e.date === day);
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "bg-card p-2 transition-colors cursor-pointer relative group hover:bg-muted/30",
                    isSelected && "bg-primary/5 ring-1 ring-inset ring-primary",
                  )}
                >
                  <div
                    className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center text-sm font-medium mb-1",
                      isToday
                        ? "bg-primary text-white shadow-md"
                        : isSelected
                          ? "text-primary font-bold"
                          : "text-foreground",
                    )}
                  >
                    {day}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "text-[10px] px-1.5 py-1 rounded border truncate font-medium flex items-center gap-1",
                          event.color,
                        )}
                      >
                        <event.icon className="h-3 w-3 shrink-0" />
                        <span className="truncate">{event.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Add Button */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-text-secondary hover:text-foreground">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Empty cells after end of month */}
            {Array.from({ length: 42 - (firstDay + daysInMonth) }).map(
              (_, i) => (
                <div key={`empty-end-${i}`} className="bg-muted/10 p-2" />
              ),
            )}
          </div>
        </Card>
      </div>

      {/* Right Column: Day Details */}
      <div className="lg:w-80 shrink-0 space-y-6">
        <Card className="p-6 border-border bg-card shadow-sm sticky top-24">
          <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {selectedDate}
              </h3>
              <p className="text-sm font-medium text-text-secondary">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <CalendarIcon className="h-6 w-6" />
            </div>
          </div>

          <div className="space-y-4">
            {mockEvents.filter((e) => e.date === selectedDate).length > 0 ? (
              mockEvents
                .filter((e) => e.date === selectedDate)
                .map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "p-4 rounded-xl border border-border bg-background relative overflow-hidden group hover:border-primary/30 transition-colors",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute left-0 top-0 bottom-0 w-1",
                        event.color.split(" ")[0].replace("/10", ""),
                      )}
                    />

                    <div className="flex items-start justify-between mb-2 pl-2">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "border-0 text-[10px] uppercase tracking-wider",
                          event.color,
                        )}
                      >
                        {event.type}
                      </Badge>
                      <button className="text-text-secondary hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    <h4 className="font-bold text-sm text-foreground mb-1 pl-2">
                      {event.title}
                    </h4>

                    <div className="space-y-1.5 pl-2 mt-3">
                      <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <Clock className="h-3.5 w-3.5" /> {event.time}
                      </div>
                      {event.instructor && (
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                          <Avatar
                            src={`https://i.pravatar.cc/150?u=${event.instructor}`}
                            className="h-4 w-4"
                          />
                          {event.instructor}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
            ) : (
              <div className="text-center py-8">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                  <CalendarIcon className="h-5 w-5 text-text-secondary" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  No events scheduled
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  You have a free day! Keep learning.
                </p>
              </div>
            )}
          </div>

          <Button className="w-full mt-6 btn-gradient text-white shadow-sm font-semibold rounded-xl">
            Join Live Session
          </Button>
        </Card>
      </div>
    </div>
  );
}
