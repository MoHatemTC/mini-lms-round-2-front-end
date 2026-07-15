import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, Download, Share2, ExternalLink, 
  CheckCircle2, Search, Filter, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

/* ============================================================
   MOCK DATA
   ============================================================ */
const certificates = [
  {
    id: 'cert-1',
    course: 'Advanced React Patterns & Architecture',
    instructor: 'Sarah Chen',
    date: 'Oct 15, 2025',
    idNumber: 'LMS-992-10A',
    image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&h=500&fit=crop', // mock certificate look
    status: 'verified'
  },
  {
    id: 'cert-2',
    course: 'UI/UX Masterclass: Figma to Framer',
    instructor: 'Marcus Johnson',
    date: 'Aug 04, 2025',
    idNumber: 'LMS-442-88B',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=500&fit=crop',
    status: 'verified'
  }
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  return (
    <div className="space-y-6 sm:space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">My Certificates</h1>
          <p className="text-text-secondary mt-1">View, download, and verify your earned credentials.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/20 px-3 py-1.5 text-sm">
            <Award className="h-4 w-4 mr-1.5" /> 2 Earned
          </Badge>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[20px] border border-border shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search certificates..."
            className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto h-9 px-4 rounded-xl border-border bg-background">
          <Filter className="h-4 w-4 mr-2" /> Sort & Filter
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden group border-border bg-card shadow-sm hover:shadow-premium transition-all duration-300">
              {/* Preview Image Container */}
              <div className="relative aspect-[1.4/1] bg-muted overflow-hidden border-b border-border">
                {/* Mock Certificate Visual Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
                  <div className="w-full h-full border-4 border-double border-primary/20 p-4 flex flex-col items-center justify-between relative">
                    <Award className="h-10 w-10 text-amber-500 mb-2" />
                    <h3 className="font-serif text-lg font-bold text-foreground uppercase tracking-widest mb-1">Certificate of Completion</h3>
                    <p className="text-xs text-text-secondary">This certifies that</p>
                    <p className="font-bold text-lg font-serif text-primary border-b border-border pb-1 w-full mt-1 mb-2">Alex Student</p>
                    <p className="text-[10px] text-text-secondary">has successfully completed</p>
                    <p className="font-bold text-sm text-foreground line-clamp-2">{cert.course}</p>
                    <div className="mt-auto w-full flex justify-between items-end pt-4 border-t border-border mt-4">
                      <div className="text-left">
                        <div className="w-16 border-b border-foreground/40 mb-1" />
                        <p className="text-[8px] uppercase">{cert.instructor}</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center">
                        <ShieldCheck className="h-4 w-4 text-amber-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Actions Overlay */}
                <div className="absolute inset-0 z-20 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                  <Button 
                    className="w-32 bg-white text-black hover:bg-white/90 rounded-xl font-semibold shadow-lg"
                    onClick={() => setSelectedCert(cert.id)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> Preview
                  </Button>
                  <Button variant="outline" className="w-32 text-white border-white/30 hover:bg-white/20 rounded-xl">
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <h3 className="font-bold text-foreground line-clamp-1 mb-1 group-hover:text-primary transition-colors">{cert.course}</h3>
                <p className="text-sm text-text-secondary mb-4">Issued on {cert.date}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-text-secondary">Credential ID</span>
                    <span className="font-mono font-medium text-foreground">{cert.idNumber}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 rounded-lg hover:bg-primary/10 hover:text-primary -mr-2">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Full Screen Preview Modal (Mock) */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden shadow-2xl border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              {/* Toolbar */}
              <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
                <Badge className="bg-success/90 text-white backdrop-blur-md border-0"><CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Verified</Badge>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-0">
                    <Download className="h-4 w-4 mr-2" /> PDF
                  </Button>
                  <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-0">
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                </div>
              </div>

              {/* HD Certificate Content */}
              <div className="aspect-[1.4/1] w-full flex items-center justify-center p-8 sm:p-16 text-center">
                 <div className="w-full h-full border-[8px] border-double border-primary/30 p-8 sm:p-12 flex flex-col items-center justify-center relative">
                    <Award className="h-16 w-16 text-amber-500 mb-6" />
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-[0.2em] mb-4 text-primary">Certificate of Completion</h3>
                    <p className="text-sm sm:text-base text-text-secondary uppercase tracking-widest mb-6">This is to certify that</p>
                    <p className="font-bold text-4xl sm:text-5xl font-serif text-foreground border-b-2 border-border pb-2 w-3/4 mb-6">Alex Student</p>
                    <p className="text-sm sm:text-base text-text-secondary uppercase tracking-widest mb-4">has successfully completed the course</p>
                    <p className="font-bold text-2xl sm:text-3xl text-foreground mb-12">Advanced React Patterns & Architecture</p>
                    
                    <div className="mt-auto w-full flex justify-between items-end">
                      <div className="text-center w-48">
                        <div className="border-b border-foreground/40 mb-2" />
                        <p className="text-xs uppercase tracking-wider text-text-secondary font-bold">Sarah Chen</p>
                        <p className="text-[10px] text-text-secondary">Instructor</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center mb-2">
                          <ShieldCheck className="h-8 w-8 text-amber-600" />
                        </div>
                        <p className="text-[10px] font-mono text-text-secondary">ID: LMS-992-10A</p>
                      </div>
                      <div className="text-center w-48">
                        <div className="border-b border-foreground/40 mb-2" />
                        <p className="text-xs uppercase tracking-wider text-text-secondary font-bold">October 15, 2025</p>
                        <p className="text-[10px] text-text-secondary">Date Issued</p>
                      </div>
                    </div>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
