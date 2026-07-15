import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, BookOpen, DollarSign, Activity, TrendingUp, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Download,
  Calendar as CalendarIcon, CheckCircle2, Clock
} from 'lucide-react';
import { 
  Area, AreaChart, Bar, BarChart, CartesianGrid, 
  ResponsiveContainer, Tooltip, XAxis, YAxis 
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

/* ============================================================
   MOCK DATA
   ============================================================ */
const revenueData = [
  { name: 'Jan', total: 45000 }, { name: 'Feb', total: 52000 },
  { name: 'Mar', total: 48000 }, { name: 'Apr', total: 61000 },
  { name: 'May', total: 59000 }, { name: 'Jun', total: 67000 },
  { name: 'Jul', total: 72000 }, { name: 'Aug', total: 68000 },
  { name: 'Sep', total: 81000 }, { name: 'Oct', total: 85000 },
  { name: 'Nov', total: 92000 }, { name: 'Dec', total: 105000 },
];

const enrollmentData = [
  { name: 'Mon', count: 120 }, { name: 'Tue', count: 145 },
  { name: 'Wed', count: 130 }, { name: 'Thu', count: 165 },
  { name: 'Fri', count: 180 }, { name: 'Sat', count: 210 },
  { name: 'Sun', count: 190 },
];

const recentEnrollments = [
  { id: 1, user: 'Olivia Martin', email: 'olivia.martin@email.com', course: 'Advanced React Patterns', amount: '$89.99', status: 'Completed', date: '2 mins ago', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, user: 'Jackson Lee', email: 'jackson.lee@email.com', course: 'Machine Learning A-Z', amount: '$129.99', status: 'Processing', date: '15 mins ago', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 3, user: 'Isabella Nguyen', email: 'isabella.n@email.com', course: 'UI/UX Masterclass', amount: '$69.99', status: 'Completed', date: '1 hour ago', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 4, user: 'William Chen', email: 'william.c@email.com', course: 'Full-Stack Next.js', amount: '$99.99', status: 'Completed', date: '3 hours ago', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 5, user: 'Sofia Davis', email: 'sofia.d@email.com', course: 'Python for Finance', amount: '$79.99', status: 'Failed', date: '5 hours ago', avatar: 'https://i.pravatar.cc/150?img=9' },
];

const upcomingTasks = [
  { id: 1, title: 'Review new course submissions', time: '10:00 AM', priority: 'High', type: 'Review' },
  { id: 2, title: 'Weekly instructor payouts', time: '2:00 PM', priority: 'High', type: 'Finance' },
  { id: 3, title: 'Platform maintenance window', time: '11:00 PM', priority: 'Medium', type: 'System' },
];

/* ============================================================
   COMPONENTS
   ============================================================ */
function KPICard({ title, value, icon: Icon, trend, trendValue, index }: any) {
  const isPositive = trend === 'up';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 hover:shadow-premium transition-shadow duration-300 relative overflow-hidden group">
        {/* Subtle gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
            <h3 className="text-3xl font-bold tracking-tight text-foreground">{value}</h3>
          </div>
          <div className="p-3 bg-muted rounded-xl">
            <Icon className="h-5 w-5 text-text-secondary" />
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2 relative">
          <Badge variant={isPositive ? 'success' : 'danger'} className="gap-1 px-1.5 py-0.5 rounded-md font-medium text-xs border-0 bg-opacity-10">
            {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trendValue}
          </Badge>
          <span className="text-xs text-text-secondary">vs last month</span>
        </div>
      </Card>
    </motion.div>
  );
}

/* ============================================================
   MAIN DASHBOARD
   ============================================================ */
export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6 sm:space-y-8 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-text-secondary mt-1">Here's what's happening on your platform today.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="hidden sm:flex h-9 rounded-xl border-border hover:bg-muted">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button className="btn-gradient w-full sm:w-auto h-9 px-4 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Total Revenue" value="$842,500" icon={DollarSign} trend="up" trendValue="12.5%" index={0} />
        <KPICard title="Active Students" value="15,240" icon={Users} trend="up" trendValue="8.2%" index={1} />
        <KPICard title="Active Courses" value="2,405" icon={BookOpen} trend="up" trendValue="3.1%" index={2} />
        <KPICard title="Completion Rate" value="68.4%" icon={Activity} trend="down" trendValue="1.2%" index={3} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-7">
        {/* Main Chart */}
        <Card className="col-span-1 lg:col-span-4 p-6 flex flex-col hover:shadow-premium transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg text-foreground">Revenue Overview</h3>
              <p className="text-sm text-text-secondary">Monthly revenue across all courses</p>
            </div>
            <div className="flex p-1 bg-muted rounded-lg">
              {['1m', '6m', '1y'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-all",
                    timeRange === t ? "bg-background shadow-sm text-foreground" : "text-text-secondary hover:text-foreground"
                  )}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10 dark:opacity-20" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `$${value / 1000}k`}
                  tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#0F766E" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#0F766E' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Secondary Chart */}
        <Card className="col-span-1 lg:col-span-3 p-6 flex flex-col hover:shadow-premium transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg text-foreground">New Enrollments</h3>
              <p className="text-sm text-text-secondary">Daily enrollments this week</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10 dark:opacity-20" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }}
                />
                <Tooltip 
                  cursor={{ fill: 'currentColor', opacity: 0.05 }}
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#14B8A6" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Grid: Tables and Lists */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Recent Enrollments Table */}
        <Card className="col-span-1 lg:col-span-2 overflow-hidden hover:shadow-premium transition-shadow duration-300">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg text-foreground">Recent Enrollments</h3>
              <p className="text-sm text-text-secondary">Latest purchases across all courses</p>
            </div>
            <Link to="/admin/users">
              <Button variant="outline" size="sm" className="rounded-lg h-8">View All</Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-text-secondary uppercase text-[10px] font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar src={enrollment.avatar} alt={enrollment.user} className="h-9 w-9 rounded-full border border-border" />
                        <div>
                          <p className="font-medium text-foreground">{enrollment.user}</p>
                          <p className="text-xs text-text-secondary">{enrollment.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{enrollment.course}</p>
                      <p className="text-xs text-text-secondary">{enrollment.date}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={
                        enrollment.status === 'Completed' ? 'success' : 
                        enrollment.status === 'Processing' ? 'warning' : 'danger'
                      } className="rounded-md border-0 bg-opacity-15 font-medium">
                        {enrollment.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-foreground">
                      {enrollment.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Upcoming Tasks & Calendar */}
        <Card className="p-0 overflow-hidden flex flex-col hover:shadow-premium transition-shadow duration-300">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-lg text-foreground">Upcoming Tasks</h3>
            <p className="text-sm text-text-secondary">Your schedule for today</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group flex items-start gap-4">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                  task.priority === 'High' ? "bg-rose-500/10 text-rose-500" : "bg-amber-500/10 text-amber-500"
                )}>
                  {task.type === 'Review' ? <CheckCircle2 className="h-5 w-5" /> : 
                   task.type === 'Finance' ? <DollarSign className="h-5 w-5" /> : 
                   <Activity className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-text-secondary">
                    <Clock className="h-3 w-3" />
                    <span>{task.time}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{task.type}</span>
                  </div>
                </div>
                <button className="text-text-secondary hover:text-foreground p-1">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border bg-muted/30">
            <Link to="/admin/calendar">
              <Button variant="outline" className="w-full rounded-xl bg-background">View Calendar</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
