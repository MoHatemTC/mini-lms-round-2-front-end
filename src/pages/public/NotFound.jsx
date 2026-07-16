import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
      <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        The page you are looking for doesn't exist or has been moved. Let's get
        you back on track.
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-hover transition-colors shadow-soft"
      >
        Go back home
      </Link>
    </div>
  );
}
