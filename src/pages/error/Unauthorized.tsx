import { Link } from 'react-router-dom';
import { Lock, Home, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';

export default function Unauthorized() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-danger/20 blur-3xl rounded-full scale-150" />
        <div className="relative h-32 w-32 rounded-3xl bg-gradient-to-br from-card to-background border-2 border-border shadow-2xl flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-danger/5" />
          <Lock className="h-16 w-16 text-danger drop-shadow-md relative z-10" />
        </div>
      </div>

      <PageHeader 
        title="Access Denied" 
        description="You don't have permission to view this page. If you believe this is a mistake, please contact your administrator or try logging in with a different account."
        className="max-w-md mx-auto mb-10"
      />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/login">
          <Button variant="outline" className="h-12 px-8 rounded-xl border-border bg-background shadow-sm hover:border-primary/50 transition-colors">
            <LogIn className="h-4 w-4 mr-2" />
            Switch Account
          </Button>
        </Link>
        <Link to="/">
          <Button className="btn-gradient h-12 px-8 rounded-xl text-white shadow-lg hover:scale-105 transition-transform font-bold">
            <Home className="h-4 w-4 mr-2" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
