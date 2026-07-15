import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, TrendingUp, Users, Clock, Map, 
  Download, Calendar as CalendarIcon, ChevronDown
} from 'lucide-react';
import { 
  Area, AreaChart, Bar, BarChart, CartesianGrid, 
  ResponsiveContainer, Tooltip, XAxis, YAxis,
  PieChart, Pie, Cell
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

/* ============================================================
   MOCK DATA
   ============================================================ */
const studentGrowth = [
  { name: 'Jan', new: 400, returning: 240 }, { name: 'Feb', new: 300, returning: 139 },
  { name: 'Mar', new: 200, returning: 980 }, { name: 'Apr', new: 278, returning: 390 },
  { name: 'May', new: 189, returning: 480 }, { name: 'Jun', new: 239, returning: 380 },
  { name: 'Jul', new: 349, returning: 430 }, { name: 'Aug', new: 400, returning: 500 },
  { name: 'Sep', new: 500, returning: 550 }, { name: 'Oct', new: 600, returning: 600 },
  { name: 'Nov', new: 700, returning: 650 }, { name: 'Dec', new: 800, returning: 700 },
];

const completionRates = [
  { name: 'React', rate: 75 }, { name: 'Node.js', rate: 60 },
  { name: 'Python', rate: 85 }, { name: 'UI/UX', rate: 90 },
  { name: 'AWS', rate: 45 }, { name: 'Docker', rate: 55 },
];

const deviceData = [
  { name: 'Desktop', value: 65 },
  { name: 'Mobile', value: 25 },
  { name: 'Tablet', value: 10 },
];
const COLORS = ['#0F766E', '#14B8A6', '#99F6E4'];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('This Year');

  return (
    <div className="space-y-6 sm:space-y-8 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
          <p className="text-text-secondary mt-1">Deep dive into your platform's performance metrics.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="hidden sm:flex h-10 px-4 rounded-xl border-border hover:bg-muted">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {timeRange}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button className="btn-gradient w-full sm:w-auto h-10 px-5 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
        <Card className="p-6 hover:shadow-premium transition-shadow duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">Average Watch Time</p>
              <h3 className="text-3xl font-bold tracking-tight text-foreground">4h 20m</h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-success font-medium flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> +12.5%
            </span>
            <span className="text-text-secondary">vs last period</span>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-premium transition-shadow duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">Course Completion Rate</p>
              <h3 className="text-3xl font-bold tracking-tight text-foreground">68.4%</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-success font-medium flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> +5.2%
            </span>
            <span className="text-text-secondary">vs last period</span>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-premium transition-shadow duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">Active Students (Daily)</p>
              <h3 className="text-3xl font-bold tracking-tight text-foreground">4,205</h3>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-success font-medium flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> +8.1%
            </span>
            <span className="text-text-secondary">vs last period</span>
          </div>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Growth Chart */}
        <Card className="lg:col-span-2 p-6 flex flex-col hover:shadow-premium transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg text-foreground">Student Growth</h3>
              <p className="text-sm text-text-secondary">New vs Returning students</p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={studentGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, opacity: 0.5 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, opacity: 0.5 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="new" stackId="1" stroke="#0F766E" fill="url(#colorNew)" />
                <Area type="monotone" dataKey="returning" stackId="1" stroke="#14B8A6" fill="url(#colorReturning)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Device Breakdown */}
        <Card className="p-6 flex flex-col hover:shadow-premium transition-shadow duration-300">
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-foreground">Device Usage</h3>
            <p className="text-sm text-text-secondary">How students access courses</p>
          </div>
          <div className="h-[250px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {deviceData.map((device, i) => (
              <div key={device.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-sm text-text-secondary">{device.name}</span>
                </div>
                <span className="font-semibold">{device.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Rates by Course */}
        <Card className="p-6 hover:shadow-premium transition-shadow duration-300">
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-foreground">Top Courses by Completion</h3>
            <p className="text-sm text-text-secondary">Percentage of students finishing the course</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionRates} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" className="opacity-10" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} />
                <Tooltip 
                  cursor={{ fill: 'currentColor', opacity: 0.05 }}
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px' }}
                  formatter={(value: any) => [`${value}%`, 'Completion Rate']}
                />
                <Bar dataKey="rate" fill="#0F766E" radius={[0, 4, 4, 0]} barSize={24}>
                  {completionRates.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.rate > 80 ? '#0F766E' : entry.rate > 60 ? '#14B8A6' : '#99F6E4'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Global Distribution (Mock Map) */}
        <Card className="p-6 hover:shadow-premium transition-shadow duration-300 flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg text-foreground">Global Distribution</h3>
              <p className="text-sm text-text-secondary">Where your students are located</p>
            </div>
            <Map className="h-5 w-5 text-text-secondary" />
          </div>
          <div className="flex-1 rounded-2xl bg-muted/30 border border-border flex items-center justify-center relative overflow-hidden">
            {/* Map Placeholder Graphic */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%230F766E\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }} />
            
            <div className="z-10 w-full max-w-sm space-y-4 p-6">
              {[
                { country: 'United States', percentage: 45, users: '6.8k' },
                { country: 'United Kingdom', percentage: 15, users: '2.2k' },
                { country: 'India', percentage: 12, users: '1.8k' },
                { country: 'Germany', percentage: 8, users: '1.2k' },
              ].map(item => (
                <div key={item.country}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-foreground">{item.country}</span>
                    <span className="text-text-secondary">{item.users} ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary rounded-full" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
