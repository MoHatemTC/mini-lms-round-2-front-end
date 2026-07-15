import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataTable, Column } from '@/components/ui/DataTable';
import { mockUsers, User } from '@/data/mockUsers';

export default function UsersList() {
  const columns: Column<User>[] = [
    {
      header: 'User',
      accessorKey: 'name',
      sortable: true,
      cell: (user) => (
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} alt={user.name} />
          <div>
            <div className="font-medium text-foreground">{user.name}</div>
            <div className="text-xs text-text-secondary">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Role',
      accessorKey: 'role',
      sortable: true,
      cell: (user) => <Badge variant="outline" className="font-normal">{user.role}</Badge>
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (user) => (
        <Badge 
          variant={user.status === 'Active' ? 'success' : user.status === 'Suspended' ? 'danger' : 'secondary'}
          className="font-normal"
        >
          {user.status}
        </Badge>
      )
    },
    {
      header: 'Joined Date',
      accessorKey: 'joinedDate',
      sortable: true,
      cell: (user) => <span className="text-text-secondary text-sm">{new Date(user.joinedDate).toLocaleDateString()}</span>
    },
    {
      header: 'Actions',
      cell: () => (
        <div className="flex items-center justify-end gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="View details">
            <Eye className="h-4 w-4 text-text-secondary" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit user">
            <Edit className="h-4 w-4 text-text-secondary" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-danger hover:bg-danger/10" title="Delete user">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Users Management" 
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Users' }
        ]}
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </PageHeader>

      <DataTable 
        data={mockUsers} 
        columns={columns} 
        searchKey="name" 
        searchPlaceholder="Search users..." 
      />
    </div>
  );
}
