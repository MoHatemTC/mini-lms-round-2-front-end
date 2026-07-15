import { Calendar as CalendarIcon } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';

export default function AdminCalendar() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Calendar" 
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Calendar' }
        ]}
      />
      <EmptyState
        icon={CalendarIcon}
        title="Schedule Empty"
        description="Your admin calendar schedule will appear here."
      />
    </div>
  );
}
