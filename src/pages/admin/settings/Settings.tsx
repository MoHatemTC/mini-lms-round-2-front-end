import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings as SettingsIcon, Globe, Palette, CreditCard, 
  Link as LinkIcon, Save, Check, UploadCloud
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const settingsTabs = [
  { id: 'general', name: 'General Information', icon: Globe },
  { id: 'appearance', name: 'Brand & Appearance', icon: Palette },
  { id: 'integrations', name: 'Integrations', icon: LinkIcon },
  { id: 'billing', name: 'Subscription & Billing', icon: CreditCard },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { theme, setTheme } = useTheme();

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
    <div className="space-y-6 pb-12">
      <PageHeader 
        title="System Settings" 
        description="Manage global configuration, branding, and billing for the platform."
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Settings' }
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-1 bg-card border border-border p-3 rounded-[24px] shadow-sm">
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
                      layoutId="activeAdminSettingTab"
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

        <div className="flex-1 min-w-0">
          <Card className="p-0 border-border rounded-[24px] shadow-sm bg-card overflow-hidden flex flex-col min-h-[600px]">
            <div className="p-6 sm:p-8 border-b border-border flex items-center justify-between shrink-0 bg-background/50">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  {settingsTabs.find(t => t.id === activeTab)?.name}
                </h1>
                <p className="text-sm text-text-secondary mt-1">
                  Update global platform configuration.
                </p>
              </div>
              <Button 
                className="btn-gradient h-10 px-6 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform font-semibold min-w-[140px]"
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <Label>Platform Name</Label>
                          <Input defaultValue="Premium LMS" className="h-11 rounded-xl bg-background border-border" />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Support Email</Label>
                          <Input defaultValue="support@premiumlms.com" className="h-11 rounded-xl bg-background border-border" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Platform Description</Label>
                        <textarea 
                          rows={3}
                          defaultValue="The ultimate learning management system for modern education."
                          className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <Label>Default Language</Label>
                          <select className="w-full h-11 rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                            <option>English (US)</option>
                            <option>Spanish</option>
                            <option>French</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <Label>Timezone</Label>
                          <select className="w-full h-11 rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                            <option>UTC (Coordinated Universal Time)</option>
                            <option>PST (Pacific Standard Time)</option>
                            <option>EST (Eastern Standard Time)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Appearance Settings */}
                  {activeTab === 'appearance' && (
                    <div className="space-y-8 max-w-2xl">
                      <div className="flex items-center gap-6">
                        <div className="h-24 w-24 border-2 border-border border-dashed rounded-xl flex items-center justify-center bg-muted/30">
                          <span className="font-bold text-xl text-primary">LMS</span>
                        </div>
                        <div className="space-y-2">
                          <Button variant="outline" className="h-10 rounded-xl border-border bg-background">
                            <UploadCloud className="h-4 w-4 mr-2" /> Upload Logo
                          </Button>
                          <p className="text-xs text-text-secondary">SVG or PNG recommended. Max 2MB.</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">Default Theme</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            { id: 'light', name: 'Light' },
                            { id: 'dark', name: 'Dark' },
                            { id: 'system', name: 'System' }
                          ].map((t) => (
                            <label key={t.id} className="cursor-pointer">
                              <input 
                                type="radio" 
                                name="theme" 
                                className="peer sr-only" 
                                checked={theme === t.id}
                                onChange={() => setTheme(t.id as any)}
                              />
                              <div className="p-4 rounded-xl border border-border bg-background peer-checked:border-primary peer-checked:bg-primary/5 transition-all text-center">
                                <span className="font-medium text-sm">{t.name}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mock empty states for other tabs */}
                  {['integrations', 'billing'].includes(activeTab) && (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center max-w-md mx-auto">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                        {settingsTabs.find(t => t.id === activeTab)?.icon({ className: "h-8 w-8" })}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {settingsTabs.find(t => t.id === activeTab)?.name} Config
                      </h3>
                      <p className="text-text-secondary">
                        These configuration options are currently managed via the infrastructure team. UI controls will be available in the next release.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
