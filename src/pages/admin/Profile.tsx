import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { UploadCloud, Save } from 'lucide-react';

export default function AdminProfile() {
  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <PageHeader 
        title="Admin Profile" 
        description="Manage your personal admin account settings and information."
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Profile' }
        ]}
      />

      <Card className="p-8 border-border shadow-sm bg-card">
        <div className="space-y-8 max-w-2xl">
          <div className="flex items-center gap-6">
            <Avatar src="https://i.pravatar.cc/150?img=68" className="h-24 w-24 border-2 border-border" />
            <div className="space-y-2">
              <Button variant="outline" className="h-10 rounded-xl border-border bg-background">
                <UploadCloud className="h-4 w-4 mr-2" /> Change Avatar
              </Button>
              <p className="text-xs text-text-secondary">JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label>First Name</Label>
              <Input defaultValue="Admin" className="h-11 rounded-xl bg-background" />
            </div>
            <div className="space-y-1.5">
              <Label>Last Name</Label>
              <Input defaultValue="User" className="h-11 rounded-xl bg-background" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Email Address</Label>
            <Input defaultValue="admin@learnify.com" type="email" className="h-11 rounded-xl bg-background" />
          </div>
          <div className="space-y-1.5">
            <Label>Role</Label>
            <Input defaultValue="Super Administrator" disabled className="h-11 rounded-xl bg-muted text-text-secondary cursor-not-allowed" />
          </div>
          
          <div className="pt-4 border-t border-border">
            <Button className="btn-gradient h-11 px-8 rounded-xl text-white shadow-sm font-semibold">
              <Save className="h-4 w-4 mr-2" /> Save Profile
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
