import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function Forbidden() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-warning/20 blur-3xl rounded-full" />
        <div className="relative h-40 w-40 bg-card rounded-full flex items-center justify-center border-4 border-warning shadow-2xl">
          <ShieldAlert className="h-20 w-20 text-warning" />
        </div>
      </div>
      <h1 className="text-4xl sm:text-6xl font-black mb-4">403</h1>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Access Forbidden</h2>
      <p className="text-text-secondary max-w-md mx-auto mb-8 text-lg">
        You do not have the required permissions to view this resource. 
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate(-1)} size="lg">Go Back</Button>
        <Button variant="outline" onClick={() => navigate('/learner')} size="lg">Go to Dashboard</Button>
      </div>
    </div>
  );
}
