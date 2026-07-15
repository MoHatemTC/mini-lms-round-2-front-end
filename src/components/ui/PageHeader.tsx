import * as React from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface PageHeaderProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
  description?: string;
  className?: string;
}

export function PageHeader({ title, breadcrumbs, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb items={breadcrumbs} className="mb-2" />
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
}
