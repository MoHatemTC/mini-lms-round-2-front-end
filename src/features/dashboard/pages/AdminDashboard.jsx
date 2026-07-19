import React from 'react';
import { BookOpen, Users, FileText, TrendingUp, Activity, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <Card className="hover:shadow-soft-hover transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <h3 className="text-3xl font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors">
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-90`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`font-medium ${trend === 'up' ? 'text-success' : 'text-danger'} flex items-center gap-1`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
          {trendValue}
        </span>
        <span className="text-text-secondary ml-2">vs last month</span>
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">Dashboard Overview</h1>
          <p className="text-text-secondary mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <button className="btn-gradient text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-primary/20 flex items-center gap-2">
          <FileText className="w-4 h-4" /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Courses" 
          value="24" 
          icon={BookOpen} 
          trend="up" 
          trendValue="+12%" 
          color="bg-primary text-primary" 
        />
        <StatCard 
          title="Active Learners" 
          value="1,248" 
          icon={Users} 
          trend="up" 
          trendValue="+18%" 
          color="bg-secondary text-secondary" 
        />
        <StatCard 
          title="Revenue" 
          value="$12,450" 
          icon={DollarSign} 
          trend="up" 
          trendValue="+8%" 
          color="bg-success text-success" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 shadow-soft">
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-muted/30 rounded-lg mx-6 mb-6 border border-dashed border-gray-200">
            <p className="text-text-secondary flex items-center gap-2">
              <Activity className="w-5 h-5" /> Activity Chart (Coming Soon)
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-subtle flex items-center justify-center font-bold text-primary">
                  U{i}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">User {i} Name</p>
                  <p className="text-xs text-text-secondary truncate">Enrolled in React Mastery</p>
                </div>
                <div className="text-xs text-text-secondary whitespace-nowrap">2h ago</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
