import { Bell } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';

export default function AdminNotifications() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Notifications" 
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Notifications' }
        ]}
      />
      <EmptyState
        icon={Bell}
        title="All Caught Up"
        description="You have no new notifications."
      />
    </div>
  );
}
