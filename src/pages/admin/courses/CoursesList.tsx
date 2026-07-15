import { useState } from 'react';
import { Plus, LayoutGrid, List as ListIcon, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataTable, Column } from '@/components/ui/DataTable';
import { mockCourses, Course } from '@/data/mockCourses';

export default function CoursesList() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const columns: Column<Course>[] = [
    {
      header: 'Course',
      accessorKey: 'title',
      sortable: true,
      cell: (course) => (
        <div className="flex items-center gap-4">
          <img src={course.thumbnail} alt={course.title} className="h-12 w-20 rounded-lg object-cover bg-muted" />
          <div>
            <div className="font-medium text-foreground line-clamp-1">{course.title}</div>
            <div className="text-xs text-text-secondary">by {course.instructor}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessorKey: 'category',
      sortable: true,
      cell: (course) => course.category
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (course) => (
        <Badge 
          variant={course.status === 'Published' ? 'success' : course.status === 'Draft' ? 'warning' : 'secondary'}
          className="font-normal"
        >
          {course.status}
        </Badge>
      )
    },
    {
      header: 'Price',
      accessorKey: 'price',
      sortable: true,
      cell: (course) => <span className="font-medium">${course.price}</span>
    },
    {
      header: 'Actions',
      cell: () => (
        <div className="flex items-center justify-end gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Preview course">
            <Eye className="h-4 w-4 text-text-secondary" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit course">
            <Edit className="h-4 w-4 text-text-secondary" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-danger hover:bg-danger/10" title="Delete course">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Courses Management" 
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Courses' }
        ]}
      >
        <div className="flex items-center bg-card border border-border rounded-xl overflow-hidden mr-2">
          <button 
            className={`p-2 transition-colors ${viewMode === 'table' ? 'bg-muted text-foreground' : 'text-text-secondary hover:text-foreground'}`}
            onClick={() => setViewMode('table')}
          >
            <ListIcon className="h-4 w-4" />
          </button>
          <button 
            className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-muted text-foreground' : 'text-text-secondary hover:text-foreground'}`}
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Course
        </Button>
      </PageHeader>

      {viewMode === 'table' ? (
        <DataTable 
          data={mockCourses} 
          columns={columns} 
          searchKey="title" 
          searchPlaceholder="Search courses..." 
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden group flex flex-col h-full border-border hover:border-primary/50 transition-colors">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className="absolute top-3 left-3 shadow-sm bg-white/90 text-foreground hover:bg-white backdrop-blur">
                  {course.category}
                </Badge>
              </div>
              <CardContent className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    variant={course.status === 'Published' ? 'success' : course.status === 'Draft' ? 'warning' : 'secondary'}
                    className="text-[10px] uppercase px-2 py-0 h-5"
                  >
                    {course.status}
                  </Badge>
                  <span className="font-bold">${course.price}</span>
                </div>
                <h3 className="font-semibold text-lg line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 flex-1">by {course.instructor}</p>
                <div className="flex justify-between items-center pt-4 border-t border-border mt-auto">
                  <div className="text-xs text-text-secondary flex items-center gap-3">
                    <span>{course.lessonsCount} lessons</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex gap-1">
                     <Button variant="ghost" size="icon" className="h-8 w-8 bg-muted/50 hover:bg-muted" title="Edit course">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
