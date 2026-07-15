import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Download, Printer, Filter, 
  Calendar as CalendarIcon, ChevronDown, CheckCircle2,
  FileSpreadsheet, FileIcon, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';

const reportTypes = [
  { id: 'revenue', name: 'Revenue & Sales', description: 'Detailed breakdown of course sales, subscriptions, and refunds.' },
  { id: 'engagement', name: 'Student Engagement', description: 'Metrics on watch time, completion rates, and quiz scores.' },
  { id: 'enrollment', name: 'Enrollment Data', description: 'Student demographics, acquisition channels, and churn.' },
  { id: 'payouts', name: 'Instructor Payouts', description: 'Revenue share calculations and payment histories.' },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('revenue');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowSuccess(false);
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-8 max-w-[1000px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Reports</h1>
          <p className="text-text-secondary mt-1">Generate and export detailed data extracts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Report Types */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Report Type</h3>
          <div className="space-y-3">
            {reportTypes.map((type) => (
              <div 
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden",
                  selectedReport === type.id 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                {selectedReport === type.id && (
                  <motion.div 
                    layoutId="activeReport"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                  />
                )}
                <h4 className={cn("font-medium mb-1 transition-colors", selectedReport === type.id ? "text-primary" : "text-foreground group-hover:text-primary")}>
                  {type.name}
                </h4>
                <p className="text-xs text-text-secondary">{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Configuration */}
        <div className="md:col-span-8">
          <Card className="p-6 sm:p-8 rounded-[24px] border-border shadow-sm bg-card">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Configure Report</h2>
                <p className="text-sm text-text-secondary">Set your parameters before generating.</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Date Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                    <Input type="date" className="pl-9 h-11 rounded-xl bg-background border-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                    <Input type="date" className="pl-9 h-11 rounded-xl bg-background border-border" />
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Data Filters</Label>
                  <Button variant="outline" size="sm" className="h-8 rounded-lg border-border">
                    <Filter className="h-3 w-3 mr-2" /> Add Filter
                  </Button>
                </div>
                
                <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-1/3">
                      <option>Course Category</option>
                      <option>Instructor</option>
                      <option>Status</option>
                    </select>
                    <span className="text-sm text-text-secondary">equals</span>
                    <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 flex-1">
                      <option>All Categories</option>
                      <option>Development</option>
                      <option>Design</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Format Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Export Format</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="cursor-pointer">
                    <input type="radio" name="format" className="peer sr-only" defaultChecked />
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background peer-checked:border-primary peer-checked:bg-primary/5 transition-all hover:border-primary/50">
                      <FileSpreadsheet className="h-6 w-6 text-emerald-500 mb-2" />
                      <span className="text-sm font-medium">CSV (Excel)</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="format" className="peer sr-only" />
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background peer-checked:border-primary peer-checked:bg-primary/5 transition-all hover:border-primary/50">
                      <FileIcon className="h-6 w-6 text-rose-500 mb-2" />
                      <span className="text-sm font-medium">PDF Document</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="format" className="peer sr-only" />
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background peer-checked:border-primary peer-checked:bg-primary/5 transition-all hover:border-primary/50">
                      <FileText className="h-6 w-6 text-blue-500 mb-2" />
                      <span className="text-sm font-medium">JSON Data</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-border flex items-center justify-between">
                <Button variant="outline" className="h-11 rounded-xl border-border">
                  <Printer className="mr-2 h-4 w-4" /> Print Preview
                </Button>
                
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="h-11 rounded-xl border-border">
                    <Mail className="mr-2 h-4 w-4" /> Email Report
                  </Button>
                  <Button 
                    className="btn-gradient h-11 px-8 rounded-xl text-white shadow-sm hover:scale-[1.02] transition-transform min-w-[160px]"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                          <Download className="h-4 w-4" />
                        </motion.div>
                        Generating...
                      </span>
                    ) : showSuccess ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> Generated
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Download className="h-4 w-4" /> Generate Report
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
