import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Globe,
  CreditCard,
  Monitor,
  Check,
  Save,
  UploadCloud,
  Settings,
  Key,
  Lock,
  Eye,
  Activity,
  Smartphone,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const settingsTabs = [
  { id: "general", name: "General", icon: Settings },
  { id: "profile", name: "Public Profile", icon: User },
  { id: "account", name: "Account", icon: User },
  { id: "password", name: "Password", icon: Key },
  { id: "security", name: "Security", icon: Shield },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "language", name: "Language", icon: Globe },
  { id: "appearance", name: "Appearance", icon: Monitor },
  { id: "accessibility", name: "Accessibility", icon: Eye },
  { id: "connected", name: "Connected Accounts", icon: LinkIcon },
  { id: "privacy", name: "Privacy", icon: Lock },
  { id: "billing", name: "Billing", icon: CreditCard },
  { id: "sessions", name: "Sessions", icon: Activity },
  { id: "devices", name: "Devices", icon: Smartphone },
];

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("profile");
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

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-8 max-w-2xl">
            <div className="flex items-center gap-6">
              <Avatar
                src="https://i.pravatar.cc/150?img=12"
                className="h-24 w-24 border-2 border-border"
              />
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="h-10 rounded-xl border-border bg-background"
                >
                  <UploadCloud className="h-4 w-4 mr-2" /> Change Avatar
                </Button>
                <p className="text-xs text-text-secondary">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label>First Name</Label>
                <Input defaultValue="Alex" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label>Last Name</Label>
                <Input defaultValue="Student" className="h-11 rounded-xl" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Professional Title</Label>
              <Input
                defaultValue="Frontend Developer"
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Bio</Label>
              <textarea
                rows={4}
                defaultValue="Passionate about building accessible and performant web applications."
                className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-8 max-w-2xl">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Theme Preference
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
                      <span className="font-medium text-sm">{t.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-lg font-semibold text-foreground">
              Email Notifications
            </h3>
            {[
              {
                title: "Course Updates",
                desc: "Announcements about courses.",
                active: true,
              },
              {
                title: "Assignment Grading",
                desc: "Get notified when an instructor grades your work.",
                active: true,
              },
              {
                title: "New Replies",
                desc: "Alert when someone replies to you.",
                active: true,
              },
              {
                title: "Weekly Digest",
                desc: "Summary of learning progress.",
                active: false,
              },
            ].map((item, i) => (
              <label
                key={i}
                className="flex items-start justify-between cursor-pointer group p-4 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="text-sm text-text-secondary mt-0.5">
                    {item.desc}
                  </p>
                </div>
                <div
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors mt-1",
                    item.active
                      ? "bg-primary"
                      : "bg-muted border border-border",
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 rounded-full transition-transform",
                      item.active
                        ? "translate-x-6 bg-white"
                        : "translate-x-1 bg-text-secondary",
                    )}
                  />
                </div>
              </label>
            ))}
          </div>
        );
      case "password":
        return (
          <div className="space-y-6 max-w-xl">
            <div className="space-y-1.5">
              <Label>Current Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label>New Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-11 rounded-xl"
              />
            </div>
            <Button
              variant="outline"
              className="border-primary/20 text-primary hover:bg-primary/5 h-11 w-full rounded-xl mt-4"
            >
              Update Password
            </Button>
          </div>
        );

      default:
        // Generic form for other tabs to ensure they aren't empty
        return (
          <div className="space-y-8 max-w-2xl">
            <h3 className="text-lg font-semibold text-foreground capitalize">
              {activeTab.replace("-", " ")} Configuration
            </h3>
            <p className="text-text-secondary">
              Configure your {activeTab} preferences below.
            </p>

            <div className="grid gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-1.5">
                  <Label>Preference Setting {i}</Label>
                  <select className="w-full h-11 rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>Enabled</option>
                    <option>Disabled</option>
                    <option>Custom</option>
                  </select>
                </div>
              ))}
            </div>

            {["security", "privacy", "account"].includes(activeTab) && (
              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="text-danger font-semibold mb-2">Danger Zone</h4>
                <p className="text-sm text-text-secondary mb-4">
                  Irreversible destructive actions.
                </p>
                <Button
                  variant="outline"
                  className="border-danger/20 text-danger hover:bg-danger/10 bg-background"
                >
                  Delete Account Data
                </Button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto pb-12 flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="lg:w-72 shrink-0">
        <div className="sticky top-24 space-y-1 bg-card border border-border p-3 rounded-[24px] shadow-sm max-h-[calc(100vh-140px)] overflow-y-auto hide-scrollbar">
          <div className="p-3 mb-2">
            <h2 className="font-bold tracking-tight text-foreground text-lg">
              Settings
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Manage your account preferences.
            </p>
          </div>

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
                    layoutId="activeLearnerSettingTab"
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
                <span className="text-sm truncate">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <Card className="p-0 border-border rounded-[24px] shadow-sm bg-card overflow-hidden flex flex-col min-h-[600px] h-[calc(100vh-140px)]">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-border flex items-center justify-between shrink-0 bg-background/50">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {settingsTabs.find((t) => t.id === activeTab)?.name}
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Update your{" "}
                {settingsTabs
                  .find((t) => t.id === activeTab)
                  ?.name.toLowerCase()}{" "}
                details.
              </p>
            </div>
            <Button
              className="btn-gradient h-10 px-6 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform min-w-[140px] font-semibold"
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
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </div>
  );
}
