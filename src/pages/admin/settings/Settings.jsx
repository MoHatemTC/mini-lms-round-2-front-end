import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Palette,
  CreditCard,
  Link as LinkIcon,
  Save,
  Check,
  UploadCloud,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const settingsTabs = [
  { id: "general", name: "General Information", icon: Globe },
  { id: "appearance", name: "Brand & Appearance", icon: Palette },
  { id: "integrations", name: "Integrations", icon: LinkIcon },
  { id: "billing", name: "Subscription & Billing", icon: CreditCard },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
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
          { label: "Admin", href: "/admin" },
          { label: "Settings" },
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
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-text-secondary hover:text-foreground hover:bg-muted",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeAdminSettingTab"
                      className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-primary rounded-r-full"
                    />
                  )}
                  <tab.icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-text-secondary group-hover:text-foreground",
                    )}
                  />
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
                  {settingsTabs.find((t) => t.id === activeTab)?.name}
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
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    >
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
                  {activeTab === "general" && (
                    <div className="space-y-8 max-w-2xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <Label>Platform Name</Label>
                          <Input
                            defaultValue="Premium LMS"
                            className="h-11 rounded-xl bg-background border-border"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Support Email</Label>
                          <Input
                            defaultValue="support@premiumlms.com"
                            className="h-11 rounded-xl bg-background border-border"
                          />
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
                  {activeTab === "appearance" && (
                    <div className="space-y-8 max-w-2xl">
                      <div className="flex items-center gap-6">
                        <div className="h-24 w-24 border-2 border-border border-dashed rounded-xl flex items-center justify-center bg-muted/30">
                          <span className="font-bold text-xl text-primary">
                            LMS
                          </span>
                        </div>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="h-10 rounded-xl border-border bg-background"
                          >
                            <UploadCloud className="h-4 w-4 mr-2" /> Upload Logo
                          </Button>
                          <p className="text-xs text-text-secondary">
                            SVG or PNG recommended. Max 2MB.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                          Default Theme
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            { id: "light", name: "Light" },
                            { id: "dark", name: "Dark" },
                            { id: "system", name: "System" },
                          ].map((t) => (
                            <label key={t.id} className="cursor-pointer">
                              <input
                                type="radio"
                                name="theme"
                                className="peer sr-only"
                                checked={theme === t.id}
                                onChange={() => setTheme(t.id)}
                              />

                              <div className="p-4 rounded-xl border border-border bg-background peer-checked:border-primary peer-checked:bg-primary/5 transition-all text-center">
                                <span className="font-medium text-sm">
                                  {t.name}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Integrations Settings */}
                  {activeTab === "integrations" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: "Slack", desc: "Send notifications to Slack channels", connected: true },
                          { name: "Zoom", desc: "Create Zoom meetings for live classes", connected: false },
                          { name: "Stripe", desc: "Process payments and subscriptions", connected: true },
                          { name: "Google Drive", desc: "Import files directly from Drive", connected: false },
                        ].map((integration, idx) => (
                          <div key={idx} className="p-5 rounded-xl border border-border bg-background flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-semibold text-foreground">{integration.name}</h4>
                              <p className="text-sm text-text-secondary mt-1">{integration.desc}</p>
                            </div>
                            <Button variant={integration.connected ? "outline" : "primary"} className={integration.connected ? "border-green-500/20 text-green-600 bg-green-500/10 hover:bg-green-500/20" : ""}>
                              {integration.connected ? "Connected" : "Connect"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Billing Settings */}
                  {activeTab === "billing" && (
                    <div className="space-y-8">
                      {/* Current Plan */}
                      <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-background">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">Premium Enterprise Plan</h3>
                            <p className="text-sm text-text-secondary mt-1">Billed annually ($1,188/year)</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">$99<span className="text-sm text-text-secondary font-normal">/mo</span></div>
                            <p className="text-xs text-text-secondary mt-1">Next billing date: Aug 15, 2026</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button className="bg-primary text-white hover:opacity-90">Change Plan</Button>
                          <Button variant="outline">Cancel Subscription</Button>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Payment Method</h4>
                        <div className="p-4 rounded-xl border border-border bg-background flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-16 bg-muted rounded flex items-center justify-center border border-border">
                              <span className="font-bold text-xs text-text-secondary">VISA</span>
                            </div>
                            <div>
                              <p className="font-medium text-sm text-foreground">Visa ending in 4242</p>
                              <p className="text-xs text-text-secondary">Expires 12/28</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary">Edit</Button>
                        </div>
                      </div>

                      {/* Billing History */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Billing History</h4>
                        <div className="rounded-xl border border-border bg-background overflow-hidden">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-text-secondary">
                              <tr>
                                <th className="px-4 py-3 font-medium">Date</th>
                                <th className="px-4 py-3 font-medium">Description</th>
                                <th className="px-4 py-3 font-medium">Amount</th>
                                <th className="px-4 py-3 font-medium text-right">Receipt</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {[
                                { date: "Jul 15, 2026", desc: "Premium Enterprise (Monthly)", amount: "$99.00" },
                                { date: "Jun 15, 2026", desc: "Premium Enterprise (Monthly)", amount: "$99.00" },
                                { date: "May 15, 2026", desc: "Premium Enterprise (Monthly)", amount: "$99.00" },
                              ].map((invoice, i) => (
                                <tr key={i}>
                                  <td className="px-4 py-3 text-foreground">{invoice.date}</td>
                                  <td className="px-4 py-3 text-text-secondary">{invoice.desc}</td>
                                  <td className="px-4 py-3 font-medium">{invoice.amount}</td>
                                  <td className="px-4 py-3 text-right">
                                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">Download</Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
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
