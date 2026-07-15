import { LayoutList } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';

export default function CategoriesList() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Categories Management" 
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Categories' }
        ]}
      />
      <div className="bg-card rounded-[24px] border border-border shadow-sm p-8 sm:p-12">
        <EmptyState 
          icon={LayoutList}
          title="Categories Module"
          description="The Categories Management module is ready for implementation."
        />
      </div>
    </div>
  );
}
