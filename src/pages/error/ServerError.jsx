import { ServerCrash } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ServerError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-danger/20 blur-3xl rounded-full" />
        <div className="relative h-40 w-40 bg-card rounded-full flex items-center justify-center border-4 border-danger shadow-2xl">
          <ServerCrash className="h-20 w-20 text-danger" />
        </div>
      </div>
      <h1 className="text-4xl sm:text-6xl font-black mb-4">500</h1>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">
        Internal Server Error
      </h2>
      <p className="text-text-secondary max-w-md mx-auto mb-8 text-lg">
        Oops! Something went terribly wrong on our end. Our engineers have been
        notified.
      </p>
      <Button onClick={() => window.location.reload()} size="lg">
        Refresh Page
      </Button>
    </div>
  );
}
