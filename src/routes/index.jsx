import React, { Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { SearchProvider } from "../contexts/SearchContext";
import GlobalLayout from "../layouts/GlobalLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import LearnerLayout from "../layouts/LearnerLayout";

// Loading fallback
const PageLoader = () => (
  <div className="flex h-[50vh] w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

// Lazy load public pages
const LandingPage = React.lazy(() => import("../pages/public/LandingPage"));
const NotFound = React.lazy(() => import("../pages/public/NotFound"));
const HelpCenter = React.lazy(() => import("../pages/public/HelpCenter"));
const Features = React.lazy(() => import("../pages/public/Features"));
const Courses = React.lazy(() => import("../pages/public/Courses"));
const Pricing = React.lazy(() => import("../pages/public/Pricing"));
const About = React.lazy(() => import("../pages/public/About"));
const Blog = React.lazy(() => import("../pages/public/Blog"));
const Contact = React.lazy(() => import("../pages/public/Contact"));

// Lazy load auth pages
const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const ForgotPassword = React.lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../pages/auth/ResetPassword"));

// Lazy load admin pages
const AdminDashboard = React.lazy(() => import("../pages/admin/Dashboard"));
const UsersList = React.lazy(() => import("../pages/admin/users/UsersList"));
const RolesList = React.lazy(() => import("../pages/admin/roles/RolesList"));
const CoursesList = React.lazy(
  () => import("../pages/admin/courses/CoursesList"),
);
const CourseForm = React.lazy(
  () => import("../pages/admin/courses/CourseForm"),
);
const CategoriesList = React.lazy(
  () => import("../pages/admin/categories/CategoriesList"),
);
const Settings = React.lazy(() => import("../pages/admin/settings/Settings"));
const FileManager = React.lazy(() => import("../pages/admin/FileManager"));
const AdminAnalytics = React.lazy(() => import("../pages/admin/Analytics"));
const AdminReports = React.lazy(() => import("../pages/admin/Reports"));
const AdminAssignments = React.lazy(
  () => import("../pages/admin/assignments/index"),
);
const AdminLessons = React.lazy(
  () => import("../pages/admin/courses/LessonsList"),
);
const AdminQuizzes = React.lazy(
  () => import("../pages/admin/courses/QuizBuilder"),
);
const AdminCertificates = React.lazy(
  () => import("../pages/admin/CertificatesList"),
);
const AdminReviews = React.lazy(() => import("../pages/admin/ReviewsList"));
const AdminCalendar = React.lazy(() => import("../pages/admin/Calendar"));
const AdminNotifications = React.lazy(
  () => import("../pages/admin/Notifications"),
);
const AdminProfile = React.lazy(() => import("../pages/admin/Profile"));
const AdminAuditLogs = React.lazy(() => import("../pages/admin/AuditLogs"));

// Lazy load learner pages
const LearnerDashboard = React.lazy(() => import("../pages/learner/Dashboard"));
const MyCourses = React.lazy(() => import("../pages/learner/MyCourses"));
const CourseDetails = React.lazy(
  () => import("../pages/learner/CourseDetails"),
);
const CoursePlayer = React.lazy(() => import("../pages/learner/CoursePlayer"));
const LearnerProfile = React.lazy(() => import("../pages/learner/Profile"));
const LearnerCertificates = React.lazy(
  () => import("../pages/learner/Certificates"),
);
const LearnerQuizzes = React.lazy(() => import("../pages/learner/Quizzes"));
const LearnerAssignments = React.lazy(
  () => import("../pages/learner/Assignments"),
);
const LearnerAchievements = React.lazy(
  () => import("../pages/learner/Achievements"),
);
const LearnerBookmarks = React.lazy(() => import("../pages/learner/Bookmarks"));
const LearnerDownloads = React.lazy(() => import("../pages/learner/Downloads"));
const LearnerPaths = React.lazy(() => import("../pages/learner/Paths"));
const LearnerCategories = React.lazy(
  () => import("../pages/learner/Categories"),
);
const Notifications = React.lazy(
  () => import("../pages/learner/Notifications"),
);
const ProfileSettings = React.lazy(
  () => import("../pages/learner/ProfileSettings"),
);
const Calendar = React.lazy(() => import("../pages/learner/Calendar"));
const Chat = React.lazy(() => import("../pages/learner/Chat"));

// Error pages
const Unauthorized = React.lazy(() => import("@/pages/error/Unauthorized"));
const Forbidden = React.lazy(() => import("@/pages/error/Forbidden"));
const ServerError = React.lazy(() => import("@/pages/error/ServerError"));
const Offline = React.lazy(() => import("@/pages/error/Offline"));

// Helper to wrap component in Suspense
const Loadable = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: (
      <SearchProvider>
        <Outlet />
      </SearchProvider>
    ),
    errorElement: Loadable(NotFound),
    children: [
      {
        path: "/",
        element: <GlobalLayout />,
        errorElement: Loadable(NotFound),
        children: [
          { index: true, element: Loadable(LandingPage) },
          { path: "help", element: Loadable(HelpCenter) },
          { path: "features", element: Loadable(Features) },
          { path: "courses", element: Loadable(Courses) },
          { path: "pricing", element: Loadable(Pricing) },
          { path: "about", element: Loadable(About) },
          { path: "blog", element: Loadable(Blog) },
          { path: "contact", element: Loadable(Contact) },
          { path: "401", element: Loadable(Unauthorized) },
          { path: "403", element: Loadable(Forbidden) },
          { path: "500", element: Loadable(ServerError) },
          { path: "offline", element: Loadable(Offline) },
        ],
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: Loadable(Login) },
          { path: "register", element: Loadable(Register) },
          { path: "forgot-password", element: Loadable(ForgotPassword) },
          { path: "reset-password", element: Loadable(ResetPassword) },
        ],
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: Loadable(AdminDashboard) },
          { path: "users", element: Loadable(UsersList) },
          { path: "roles", element: Loadable(RolesList) },
          { path: "courses", element: Loadable(CoursesList) },
          { path: "courses/create", element: Loadable(CourseForm) },
          { path: "categories", element: Loadable(CategoriesList) },
          { path: "lessons", element: Loadable(AdminLessons) },
          { path: "quizzes", element: Loadable(AdminQuizzes) },
          { path: "assignments", element: Loadable(AdminAssignments) },
          { path: "certificates", element: Loadable(AdminCertificates) },
          { path: "reviews", element: Loadable(AdminReviews) },
          { path: "analytics", element: Loadable(AdminAnalytics) },
          { path: "reports", element: Loadable(AdminReports) },
          { path: "calendar", element: Loadable(AdminCalendar) },
          { path: "notifications", element: Loadable(AdminNotifications) },
          { path: "settings", element: Loadable(Settings) },
          { path: "profile", element: Loadable(AdminProfile) },
          { path: "audit-logs", element: Loadable(AdminAuditLogs) },
          { path: "files", element: Loadable(FileManager) },
        ],
      },
      {
        path: "/learner",
        element: <LearnerLayout />,
        children: [
          { index: true, element: Loadable(LearnerDashboard) },
          { path: "courses", element: Loadable(MyCourses) },
          { path: "courses/:id", element: Loadable(CourseDetails) },
          { path: "courses/:id/play", element: Loadable(CoursePlayer) },
          { path: "profile", element: Loadable(LearnerProfile) },
          { path: "certificates", element: Loadable(LearnerCertificates) },
          { path: "quizzes", element: Loadable(LearnerQuizzes) },
          { path: "assignments", element: Loadable(LearnerAssignments) },
          { path: "achievements", element: Loadable(LearnerAchievements) },
          { path: "bookmarks", element: Loadable(LearnerBookmarks) },
          { path: "downloads", element: Loadable(LearnerDownloads) },
          { path: "paths", element: Loadable(LearnerPaths) },
          { path: "categories", element: Loadable(LearnerCategories) },
          { path: "notifications", element: Loadable(Notifications) },
          { path: "settings", element: Loadable(ProfileSettings) },
          { path: "calendar", element: Loadable(Calendar) },
          { path: "chat", element: Loadable(Chat) },
        ],
      },
      {
        path: "*",
        element: Loadable(NotFound),
      },
    ],
  },
]);
