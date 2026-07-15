import { useState } from 'react';
import { Bell, CheckCircle2, Clock, MessageSquare, AlertCircle, Search } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/common/EmptyState';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'security';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'success', title: 'Course Completed', message: 'Congratulations! You have completed Advanced React Patterns.', time: '2 hours ago', read: false },
  { id: '2', type: 'info', title: 'New Course Available', message: 'Check out the newly published Next.js Masterclass.', time: '1 day ago', read: false },
  { id: '3', type: 'warning', title: 'Assignment Due', message: 'Your UI/UX Assignment is due tomorrow.', time: '2 days ago', read: true },
  { id: '4', type: 'security', title: 'New Login', message: 'A new login was detected from Chrome on Mac OS.', time: '3 days ago', read: true },
];

const icons = {
  info: <MessageSquare className="h-5 w-5 text-primary" />,
  success: <CheckCircle2 className="h-5 w-5 text-success" />,
  warning: <AlertCircle className="h-5 w-5 text-warning" />,
  security: <Clock className="h-5 w-5 text-danger" />
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [searchTerm, setSearchTerm] = useState('');

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filtered = notifications.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Breadcrumb items={[{ label: 'Home', href: '/learner' }, { label: 'Notifications' }]} className="mb-2" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
            Notifications 
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge variant="default" className="text-sm">
                {notifications.filter(n => !n.read).length} New
              </Badge>
            )}
          </h1>
        </div>
        <Button variant="outline" onClick={markAllAsRead} className="bg-card">
          Mark all as read
        </Button>
      </div>

      <div className="bg-card rounded-[24px] border border-border shadow-sm overflow-hidden flex flex-col">
        <Tabs defaultValue="all" className="w-full">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/10">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input 
                  placeholder="Search notifications..." 
                  className="pl-9 bg-background h-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <TabsContent value="all" className="m-0 p-0 border-none outline-none">
            {filtered.length > 0 ? (
              <div className="divide-y divide-border">
                {filtered.map(notification => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "p-5 sm:p-6 hover:bg-muted/30 transition-colors flex gap-4 cursor-pointer",
                      !notification.read ? "bg-muted/10" : ""
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="shrink-0 mt-1">
                      {icons[notification.type]}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={cn("font-semibold", !notification.read ? "text-foreground" : "text-text-secondary")}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-text-secondary whitespace-nowrap ml-4">{notification.time}</span>
                      </div>
                      <p className={cn("text-sm", !notification.read ? "text-text-primary font-medium" : "text-text-secondary")}>
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="shrink-0 flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8">
                <EmptyState 
                  icon={Bell} 
                  title="All caught up!" 
                  description="You don't have any notifications matching your criteria." 
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="m-0 p-0 border-none outline-none">
            {filtered.filter(n => !n.read).length > 0 ? (
              <div className="divide-y divide-border">
                {filtered.filter(n => !n.read).map(notification => (
                  <div 
                    key={notification.id} 
                    className="p-5 sm:p-6 hover:bg-muted/30 transition-colors flex gap-4 cursor-pointer bg-muted/10"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="shrink-0 mt-1">{icons[notification.type]}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-foreground">{notification.title}</h4>
                        <span className="text-xs text-text-secondary whitespace-nowrap ml-4">{notification.time}</span>
                      </div>
                      <p className="text-sm text-text-primary font-medium">{notification.message}</p>
                    </div>
                    <div className="shrink-0 flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
               <div className="p-8">
                <EmptyState 
                  icon={Bell} 
                  title="No unread notifications" 
                  description="You have read all your notifications." 
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
