import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings as SettingsIcon, Palette, Bell, Shield, 
  Globe, CreditCard, Mail, Database, Save, UploadCloud,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';

const settingsTabs = [
  { id: 'general', name: 'General', icon: SettingsIcon },
  { id: 'branding', name: 'Branding', icon: Palette },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'roles', name: 'Roles & Permissions', icon: Shield },
  { id: 'localization', name: 'Localization', icon: Globe },
  { id: 'billing', name: 'Billing & Payouts', icon: CreditCard },
  { id: 'email', name: 'Email Settings', icon: Mail },
  { id: 'integrations', name: 'Integrations', icon: Database },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setShowSuccess(false);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-[1200px] mx-auto pb-12 flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="lg:w-64 shrink-0">
        <div className="sticky top-24 space-y-1 bg-card border border-border p-3 rounded-[24px] shadow-sm">
          <div className="p-3 mb-2">
            <h2 className="font-bold tracking-tight text-foreground text-lg">Settings</h2>
            <p className="text-xs text-text-secondary mt-1">Manage your platform configuration.</p>
          </div>
          
          {settingsTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left group relative",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-text-secondary hover:text-foreground hover:bg-muted"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeSettingTab"
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-primary rounded-r-full"
                  />
                )}
                <tab.icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-primary" : "text-text-secondary group-hover:text-foreground")} />
                <span className="text-sm">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <Card className="p-0 border-border rounded-[24px] shadow-sm bg-card overflow-hidden flex flex-col min-h-[600px]">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-border flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {settingsTabs.find(t => t.id === activeTab)?.name}
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Update your {settingsTabs.find(t => t.id === activeTab)?.name.toLowerCase()} preferences.
              </p>
            </div>
            <Button 
              className="btn-gradient h-10 px-6 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform min-w-[140px]"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Save className="h-4 w-4" />
                  </motion.div>
                  Saving...
                </span>
              ) : showSuccess ? (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> Saved
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </span>
              )}
            </Button>
          </div>

          {/* Dynamic Content */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div className="space-y-8 max-w-2xl">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Platform Details</h3>
                      
                      <div className="space-y-1.5">
                        <Label>Platform Name</Label>
                        <Input defaultValue="Learnify Global" className="h-11 rounded-xl bg-background border-border" />
                        <p className="text-xs text-text-secondary mt-1">This will be displayed in the browser tab and emails.</p>
                      </div>

                      <div className="space-y-1.5">
                        <Label>Support Email</Label>
                        <Input defaultValue="support@learnify.com" type="email" className="h-11 rounded-xl bg-background border-border" />
                      </div>

                      <div className="space-y-1.5">
                        <Label>Timezone</Label>
                        <select className="flex h-11 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary/50">
                          <option>(UTC-08:00) Pacific Time (US & Canada)</option>
                          <option>(UTC-05:00) Eastern Time (US & Canada)</option>
                          <option>(UTC+00:00) Greenwich Mean Time</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-border">
                      <h3 className="text-lg font-semibold text-foreground">Registration Settings</h3>
                      
                      <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors">
                        <div className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-primary transition-colors mt-0.5">
                          <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition-transform" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">Open Registration</p>
                          <p className="text-sm text-text-secondary mt-0.5">Allow new users to sign up for accounts automatically.</p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors">
                        <div className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-muted border border-border transition-colors mt-0.5">
                          <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-text-secondary transition-transform" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">Require Email Verification</p>
                          <p className="text-sm text-text-secondary mt-0.5">Users must verify their email before accessing courses.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Branding Settings */}
                {activeTab === 'branding' && (
                  <div className="space-y-8 max-w-2xl">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Logos & Assets</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Primary Logo</Label>
                          <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center bg-background hover:bg-muted/30 transition-colors cursor-pointer group h-40">
                            <UploadCloud className="h-8 w-8 text-text-secondary group-hover:text-primary mb-2 transition-colors" />
                            <span className="text-sm font-medium text-foreground">Upload Logo</span>
                            <span className="text-xs text-text-secondary">SVG or PNG</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Favicon</Label>
                          <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center bg-background hover:bg-muted/30 transition-colors cursor-pointer group h-40">
                            <UploadCloud className="h-8 w-8 text-text-secondary group-hover:text-primary mb-2 transition-colors" />
                            <span className="text-sm font-medium text-foreground">Upload Favicon</span>
                            <span className="text-xs text-text-secondary">32x32 ICO or PNG</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-border">
                      <h3 className="text-lg font-semibold text-foreground">Brand Colors</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label>Primary Color</Label>
                          <div className="flex gap-2">
                            <div className="h-11 w-11 rounded-xl bg-teal-600 border border-border shadow-inner shrink-0" />
                            <Input defaultValue="#0F766E" className="h-11 rounded-xl bg-background border-border uppercase font-mono" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <Label>Accent Color</Label>
                          <div className="flex gap-2">
                            <div className="h-11 w-11 rounded-xl bg-teal-400 border border-border shadow-inner shrink-0" />
                            <Input defaultValue="#2DD4BF" className="h-11 rounded-xl bg-background border-border uppercase font-mono" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6 max-w-2xl">
                    <h3 className="text-lg font-semibold text-foreground">Email Notifications</h3>
                    
                    {[
                      { title: 'New User Registration', desc: 'Receive an email when a new user signs up.', active: true },
                      { title: 'Course Purchase', desc: 'Get notified for every new successful payment.', active: true },
                      { title: 'Assignment Submission', desc: 'Alert when a student submits an assignment.', active: false },
                      { title: 'New Review', desc: 'Notify when a student leaves a course review.', active: true },
                      { title: 'Daily Digest', desc: 'Receive a daily summary of platform activity.', active: false },
                    ].map((item, i) => (
                      <label key={i} className="flex items-start justify-between cursor-pointer group p-4 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors">
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</p>
                          <p className="text-sm text-text-secondary mt-0.5">{item.desc}</p>
                        </div>
                        <div className={cn(
                          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors mt-1",
                          item.active ? "bg-primary" : "bg-muted border border-border"
                        )}>
                          <span className={cn(
                            "inline-block h-4 w-4 rounded-full transition-transform",
                            item.active ? "translate-x-6 bg-white" : "translate-x-1 bg-text-secondary"
                          )} />
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {/* Mock empty state for other tabs */}
                {['roles', 'localization', 'billing', 'email', 'integrations'].includes(activeTab) && (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center max-w-md mx-auto">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {settingsTabs.find(t => t.id === activeTab)?.icon({ className: "h-8 w-8" })}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {settingsTabs.find(t => t.id === activeTab)?.name} Configuration
                    </h3>
                    <p className="text-text-secondary">
                      This settings module is configured via your cloud provider or requires enterprise authentication to access.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </div>
  );
}
