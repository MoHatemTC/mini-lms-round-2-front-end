import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Award, User, Calendar, ShieldCheck, CheckCircle, Download, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import certificateService from '../../../services/certificateService';
import EmbedAccessError from '../../../components/common/ErrorState/EmbedAccessError';

/**
 * CertificateEmbed Page
 * UI foundation for embedded certificate views with safe access handling from the backend.
 */
export default function CertificateEmbed() {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(certificateId));
  const [error, setError] = useState(null);

  const fetchCertificate = useCallback(async () => {
    if (!certificateId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await certificateService.getCertificateById(certificateId);
      setCertificate(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [certificateId]);

  useEffect(() => {
    fetchCertificate();
  }, [fetchCertificate]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden animate-pulse" aria-busy="true" aria-label="Loading certificate embed">
        <Card className="w-full h-96 bg-muted/40 border-border/50" />
        <Card className="w-full h-32 bg-muted/30 border-border/50" />
      </div>
    );
  }

  if (error) {
    return <EmbedAccessError error={error} resourceName="certificate" onRetry={fetchCertificate} />;
  }

  const title = certificate?.title || certificate?.courseTitle || 'Mini LMS Mastery Award';
  const studentName = certificate?.studentName || certificate?.recipientName || 'Student Name Placeholder';
  const issueDate = certificate?.issuedAt || certificate?.date || 'July 27, 2026';
  const verificationId = certificate?.verificationId || certificate?.id || 'CERT-9988-7766';

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
      {/* --------------------------------
          Certificate Preview Placeholder
      -------------------------------- */}
      <Card className="w-full border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-premium">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 md:p-8 border-b border-border/50">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success">Verified Certificate</Badge>
              <Badge variant="outline">Embed Preview</Badge>
            </div>
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              Certificate Preview Placeholder
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-text-secondary">
              Official certificate of completion preview. Suitable for embedding on LinkedIn, resumes, or personal portfolios.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" disabled className="text-xs">
              <Download className="w-3.5 h-3.5 mr-1.5" /> PDF
            </Button>
            <Button variant="primary" size="sm" disabled className="text-xs">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Verify
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 md:p-8">
          {/* Certificate Document Visual Presentation Placeholder */}
          <div className="relative w-full rounded-2xl border-4 border-double border-primary/30 bg-background p-6 sm:p-10 md:p-14 text-center shadow-inner overflow-hidden">
            {/* Decorative Corner Accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/40 pointer-events-none" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/40 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/40 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/40 pointer-events-none" />

            <div className="mx-auto flex flex-col items-center justify-center max-w-2xl space-y-4 sm:space-y-6">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5 shadow-sm">
                <Award className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
                  Certificate of Completion
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground">
                  {title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                This is to certify that the individual named below has successfully completed the curriculum and demonstrated proficiency in the required learning outcomes.
              </p>

              {/* --------------------------------
                  Student Name Placeholder (Inside Certificate View)
              -------------------------------- */}
              <div className="w-full py-3 px-6 rounded-xl bg-muted/40 border border-border/60 my-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Awarded To</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight font-serif break-words">
                  {studentName}
                </h2>
              </div>

              <div className="w-full max-w-lg border-t border-border/50 pt-4 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground">Issue Date</p>
                    <p className="font-semibold text-foreground truncate">{issueDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:justify-end">
                  <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground">Verification ID</p>
                    <p className="font-mono font-semibold text-foreground truncate">{verificationId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --------------------------------
          Student Name Placeholder (Dedicated Card Section)
      -------------------------------- */}
      <Card className="w-full border-border bg-card shadow-sm">
        <CardHeader className="p-4 sm:p-6 border-b border-border/50">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary shrink-0" />
            <CardTitle className="text-lg sm:text-xl font-bold">Student Name Placeholder</CardTitle>
          </div>
          <CardDescription>
            Recipient details and verification record placeholder.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-background/50">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                SN
              </div>
              <div className="min-w-0">
                <h4 className="text-base sm:text-lg font-bold text-foreground truncate">
                  {studentName}
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary truncate">
                  Enrolled Learner • Verified Completion
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
              <Badge variant="success" className="flex items-center gap-1 py-1 px-3">
                <CheckCircle className="w-3.5 h-3.5" />
                Verified Student
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
