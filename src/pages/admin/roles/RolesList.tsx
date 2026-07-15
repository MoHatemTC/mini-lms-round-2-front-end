import { useState } from 'react';
import { 
  Shield, Users, Plus, Search, Filter, MoreVertical, 
  Edit, Trash2, CheckCircle2, XCircle, AlertCircle
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const mockRoles = [
  { id: 'r1', name: 'Administrator', users: 3, status: 'active', description: 'Full access to all system features and settings.', permissions: 45, isSystem: true },
  { id: 'r2', name: 'Instructor', users: 124, status: 'active', description: 'Can create and manage courses, view student progress.', permissions: 28, isSystem: true },
  { id: 'r3', name: 'Teaching Assistant', users: 45, status: 'active', description: 'Can grade assignments and moderate discussions.', permissions: 15, isSystem: false },
  { id: 'r4', name: 'Student', users: 15230, status: 'active', description: 'Can view and consume enrolled courses.', permissions: 8, isSystem: true },
  { id: 'r5', name: 'Moderator', users: 12, status: 'active', description: 'Can moderate reviews and community forums.', permissions: 12, isSystem: false },
  { id: 'r6', name: 'Support', users: 8, status: 'inactive', description: 'Read-only access to user profiles for support.', permissions: 10, isSystem: false },
];

const permissionCategories = [
  { 
    name: 'Course Management', 
    permissions: ['Create Course', 'Edit Course', 'Delete Course', 'Publish Course'] 
  },
  { 
    name: 'User Management', 
    permissions: ['View Users', 'Create User', 'Edit User', 'Delete User', 'Manage Roles'] 
  },
  { 
    name: 'Content & Media', 
    permissions: ['Upload Media', 'Manage Files', 'Moderate Comments'] 
  },
  { 
    name: 'System Settings', 
    permissions: ['View Analytics', 'Manage Billing', 'System Configurations'] 
  }
];

export default function RolesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState(mockRoles[0]);
  const [viewMode, setViewMode] = useState<'matrix' | 'list'>('list');

  const filteredRoles = mockRoles.filter(role => 
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <PageHeader 
        title="Roles & Permissions" 
        description="Manage user roles and their access levels across the platform."
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Roles' }
        ]}
      >
        <Button className="btn-gradient shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </PageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-text-secondary">Total Roles</p>
            <h3 className="text-3xl font-bold text-foreground mt-1">{mockRoles.length}</h3>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
        </Card>
        <Card className="p-6 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-text-secondary">Custom Roles</p>
            <h3 className="text-3xl font-bold text-foreground mt-1">
              {mockRoles.filter(r => !r.isSystem).length}
            </h3>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-500" />
          </div>
        </Card>
        <Card className="p-6 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-text-secondary">Total Permissions</p>
            <h3 className="text-3xl font-bold text-foreground mt-1">45</h3>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-amber-500" />
          </div>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-[20px] border border-border shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <Input 
            placeholder="Search roles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-background border-border"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="h-10 rounded-xl border-border bg-background">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <div className="flex bg-muted p-1 rounded-xl border border-border">
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-colors",
                viewMode === 'list' ? "bg-background text-foreground shadow-sm" : "text-text-secondary hover:text-foreground"
              )}
            >
              List
            </button>
            <button 
              onClick={() => setViewMode('matrix')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-colors",
                viewMode === 'matrix' ? "bg-background text-foreground shadow-sm" : "text-text-secondary hover:text-foreground"
              )}
            >
              Matrix
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Roles List */}
        <div className={cn("space-y-4", viewMode === 'matrix' ? "lg:col-span-1" : "lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 space-y-0")}>
          <AnimatePresence>
            {filteredRoles.map((role) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={role.id}
                onClick={() => viewMode === 'matrix' && setSelectedRole(role)}
              >
                <Card className={cn(
                  "p-5 border transition-all cursor-pointer hover:shadow-md",
                  viewMode === 'matrix' && selectedRole.id === role.id 
                    ? "border-primary shadow-sm bg-primary/5" 
                    : "border-border bg-card"
                )}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center text-white",
                        role.isSystem ? "bg-gradient-to-br from-indigo-500 to-purple-600" : "bg-gradient-to-br from-teal-400 to-emerald-500"
                      )}>
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{role.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant={role.status === 'active' ? 'success' : 'secondary'} className="h-5 text-[10px] px-1.5">
                            {role.status}
                          </Badge>
                          {role.isSystem && (
                            <Badge variant="outline" className="h-5 text-[10px] px-1.5 border-primary/30 text-primary">
                              System
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="p-1 text-text-secondary hover:text-foreground rounded-md hover:bg-muted transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2 min-h-[40px]">
                    {role.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                      <Users className="h-4 w-4" />
                      <span className="font-medium text-foreground">{role.users.toLocaleString()}</span> users
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {role.permissions} Permissions
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Permission Matrix Preview */}
        {viewMode === 'matrix' && (
          <div className="lg:col-span-2">
            <Card className="border-border bg-card overflow-hidden">
              <div className="p-6 border-b border-border bg-background/50 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{selectedRole.name} Permissions</h3>
                  <p className="text-sm text-text-secondary mt-1">Configure what this role can access.</p>
                </div>
                <Button variant="outline" className="bg-background">
                  <Edit className="h-4 w-4 mr-2" /> Edit Permissions
                </Button>
              </div>
              <div className="p-6 space-y-8">
                {permissionCategories.map((category, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold text-foreground mb-4 pb-2 border-b border-border">
                      {category.name}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                      {category.permissions.map((perm, pIdx) => {
                        // Mock random assignments based on role for visual realism
                        const isGranted = selectedRole.id === 'r1' || (selectedRole.id === 'r2' && idx === 0) || Math.random() > 0.5;
                        return (
                          <div key={pIdx} className="flex items-center justify-between group">
                            <span className="text-sm text-text-secondary group-hover:text-foreground transition-colors">{perm}</span>
                            {isGranted ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-muted-foreground opacity-50" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
