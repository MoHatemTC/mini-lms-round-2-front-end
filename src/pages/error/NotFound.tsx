import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
        <h1 className="text-[120px] md:text-[180px] font-black leading-none text-foreground drop-shadow-xl relative z-10 select-none">
          404
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-4 border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
      </div>

      <PageHeader 
        title="Page not found" 
        description="Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the URL is incorrect."
        className="max-w-md mx-auto mb-10"
      />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/">
          <Button variant="outline" className="h-12 px-8 rounded-xl border-border bg-background shadow-sm group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
        </Link>
        <Link to="/learner">
          <Button className="btn-gradient h-12 px-8 rounded-xl text-white shadow-lg hover:scale-105 transition-transform font-bold">
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="mt-16 text-text-secondary text-sm">
        Looking for something specific? Press <kbd className="mx-1 px-2 py-1 bg-muted rounded border border-border font-mono text-xs">Ctrl + K</kbd> to search.
      </div>
    </div>
  );
}
