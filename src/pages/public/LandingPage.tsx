import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Play, Star, Users, BookOpen, Award, Globe2, TrendingUp,
  Sparkles, Shield, Rocket, Brain, Code, Palette, Database, Cloud,
  Lock as LockIcon, BarChart3, Zap, ChevronDown, ChevronRight, Check,
  GraduationCap, Clock, Heart, MousePointer2, Monitor, Smartphone,
  CircleCheck, ArrowUpRight, Quote, Minus, Plus,
} from 'lucide-react';

/* ============================================================
   HELPER: Animated counter that counts up when visible
   ============================================================ */
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ============================================================
   HELPER: Section wrapper with scroll-reveal
   ============================================================ */
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ============================================================
   MOCK DATA
   ============================================================ */
const stats = [
  { label: 'Active Students', value: 150000, suffix: '+', icon: Users },
  { label: 'Expert Courses', value: 2400, suffix: '+', icon: BookOpen },
  { label: 'Certified Instructors', value: 850, suffix: '+', icon: Award },
  { label: 'Countries', value: 120, suffix: '+', icon: Globe2 },
  { label: 'Certificates Issued', value: 95000, suffix: '+', icon: GraduationCap },
  { label: 'Completion Rate', value: 94, suffix: '%', icon: TrendingUp },
];

const features = [
  { icon: Brain, title: 'AI Learning Assistant', description: 'Personalized learning paths powered by AI that adapts to your pace, style, and goals in real-time.', color: 'from-violet-500/10 to-purple-500/10', iconColor: 'text-violet-500' },
  { icon: Award, title: 'Professional Certificates', description: 'Earn industry-recognized certificates that boost your resume and validate your expertise globally.', color: 'from-amber-500/10 to-orange-500/10', iconColor: 'text-amber-500' },
  { icon: Code, title: 'Hands-on Projects', description: 'Build real-world projects with guided exercises, code reviews, and portfolio-ready deliverables.', color: 'from-blue-500/10 to-cyan-500/10', iconColor: 'text-blue-500' },
  { icon: Rocket, title: 'Career Roadmaps', description: 'Structured learning paths aligned with industry demands, from beginner to job-ready professional.', color: 'from-emerald-500/10 to-teal-500/10', iconColor: 'text-emerald-500' },
  { icon: Sparkles, title: 'Expert Instructors', description: 'Learn from industry leaders at Google, Meta, Netflix, and top universities worldwide.', color: 'from-rose-500/10 to-pink-500/10', iconColor: 'text-rose-500' },
  { icon: Users, title: 'Learning Community', description: 'Join a vibrant community of 150,000+ learners. Collaborate, discuss, and grow together.', color: 'from-sky-500/10 to-indigo-500/10', iconColor: 'text-sky-500' },
];

const categories = [
  { name: 'Web Development', icon: Code, count: 340, gradient: 'from-blue-500 to-cyan-400' },
  { name: 'Data Science', icon: BarChart3, count: 180, gradient: 'from-purple-500 to-pink-400' },
  { name: 'UI/UX Design', icon: Palette, count: 220, gradient: 'from-rose-500 to-orange-400' },
  { name: 'Machine Learning', icon: Brain, count: 150, gradient: 'from-emerald-500 to-teal-400' },
  { name: 'Cloud Computing', icon: Cloud, count: 120, gradient: 'from-sky-500 to-blue-400' },
  { name: 'Cybersecurity', icon: Shield, count: 95, gradient: 'from-red-500 to-rose-400' },
  { name: 'Mobile Dev', icon: Smartphone, count: 160, gradient: 'from-violet-500 to-purple-400' },
  { name: 'DevOps', icon: Zap, count: 110, gradient: 'from-amber-500 to-yellow-400' },
  { name: 'Blockchain', icon: LockIcon, count: 75, gradient: 'from-indigo-500 to-blue-400' },
  { name: 'Product Management', icon: Monitor, count: 130, gradient: 'from-teal-500 to-emerald-400' },
];

const courses = [
  { id: 1, title: 'Advanced React Patterns & Architecture', instructor: 'Sarah Chen', category: 'Web Development', difficulty: 'Advanced', duration: '42 hours', lessons: 156, students: 12400, rating: 4.9, price: 89.99, thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop' },
  { id: 2, title: 'Machine Learning with Python: Zero to Hero', instructor: 'Dr. Alex Rivera', category: 'Data Science', difficulty: 'Intermediate', duration: '38 hours', lessons: 128, students: 18700, rating: 4.8, price: 79.99, thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=340&fit=crop' },
  { id: 3, title: 'Complete UI/UX Design Masterclass 2025', instructor: 'Maya Johnson', category: 'Design', difficulty: 'Beginner', duration: '30 hours', lessons: 94, students: 22100, rating: 4.9, price: 69.99, thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop' },
  { id: 4, title: 'Cloud Architecture on AWS & Azure', instructor: 'James Park', category: 'Cloud', difficulty: 'Advanced', duration: '48 hours', lessons: 172, students: 9800, rating: 4.7, price: 99.99, thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop' },
  { id: 5, title: 'Full-Stack TypeScript Development', instructor: 'Emma Wilson', category: 'Web Development', difficulty: 'Intermediate', duration: '36 hours', lessons: 140, students: 15300, rating: 4.8, price: 84.99, thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=340&fit=crop' },
];

const learningPaths = [
  { title: 'Frontend Developer', steps: ['HTML & CSS', 'JavaScript', 'React', 'TypeScript', 'Next.js'], duration: '6 months', courses: 12, color: 'from-blue-500 to-cyan-400' },
  { title: 'Backend Developer', steps: ['Node.js', 'Databases', 'REST APIs', 'GraphQL', 'Microservices'], duration: '7 months', courses: 14, color: 'from-emerald-500 to-teal-400' },
  { title: 'AI Engineer', steps: ['Python', 'ML Basics', 'Deep Learning', 'NLP', 'MLOps'], duration: '9 months', courses: 16, color: 'from-purple-500 to-pink-400' },
  { title: 'Cloud Engineer', steps: ['Linux', 'Networking', 'AWS', 'Kubernetes', 'Terraform'], duration: '8 months', courses: 15, color: 'from-sky-500 to-blue-400' },
  { title: 'Cybersecurity Analyst', steps: ['Networks', 'Security+', 'Pen Testing', 'SIEM', 'Incident Response'], duration: '10 months', courses: 18, color: 'from-red-500 to-rose-400' },
  { title: 'Data Analyst', steps: ['SQL', 'Excel', 'Python', 'Tableau', 'Statistics'], duration: '5 months', courses: 10, color: 'from-amber-500 to-yellow-400' },
];

const testimonials = [
  { name: 'Jessica Liu', role: 'Frontend Engineer', company: 'Google', rating: 5, review: 'Learnify completely transformed my career. The curriculum quality rivals top bootcamps at a fraction of the cost. I went from zero coding knowledge to a Senior Frontend role in 18 months.', avatar: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Marcus Thompson', role: 'Data Scientist', company: 'Netflix', rating: 5, review: 'The AI-powered learning paths are incredible. They adapted to my learning style and pace perfectly. The hands-on projects gave me portfolio pieces that impressed every interviewer.', avatar: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Priya Sharma', role: 'Cloud Architect', company: 'Amazon', rating: 5, review: 'The cloud computing track is world-class. From fundamentals to advanced architecture patterns, every lesson was practical and immediately applicable to my daily work.', avatar: 'https://i.pravatar.cc/150?img=5' },
];

const pricingPlans = [
  { name: 'Free', price: 0, period: 'forever', description: 'Perfect for exploring and getting started', features: ['Access to 50+ free courses', 'Community forum access', 'Basic progress tracking', 'Course completion badges', 'Mobile app access'], cta: 'Start Learning', popular: false },
  { name: 'Professional', price: 29, period: '/month', description: 'For serious learners who want to advance', features: ['Access to all 2,400+ courses', 'Professional certificates', 'AI learning assistant', 'Hands-on project reviews', 'Priority support', 'Offline downloads', 'Career roadmaps'], cta: 'Start Free Trial', popular: true },
  { name: 'Enterprise', price: 99, period: '/month', description: 'For teams and organizations', features: ['Everything in Professional', 'Team management dashboard', 'Custom learning paths', 'SSO & API access', 'Dedicated success manager', 'Advanced analytics', 'Custom branding', 'SLA guarantee'], cta: 'Contact Sales', popular: false },
];

const faqs = [
  { q: 'How does the free plan work?', a: 'Our free plan gives you lifetime access to 50+ courses, community forums, and basic features. No credit card required to sign up. You can upgrade anytime to unlock our full course library.' },
  { q: 'Can I switch plans at any time?', a: 'Absolutely! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle. No hidden fees or lock-in contracts.' },
  { q: 'Are the certificates recognized by employers?', a: 'Yes! Our certificates are industry-recognized and trusted by 5,000+ companies worldwide including Google, Microsoft, Amazon, and Meta. Each certificate has a unique verification link.' },
  { q: 'What if I\'m not satisfied with a course?', a: 'We offer a 30-day money-back guarantee on all paid plans. If you\'re not completely satisfied, contact our support team for a full refund — no questions asked.' },
  { q: 'Do you offer team or company plans?', a: 'Yes! Our Enterprise plan is designed for teams and organizations. It includes team management tools, custom learning paths, SSO integration, and dedicated support.' },
  { q: 'Can I learn on mobile?', a: 'Absolutely! Learnify is available on iOS, Android, and web. Download courses for offline learning and sync your progress across all devices seamlessly.' },
];

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ========================================
          HERO SECTION
          ======================================== */}
      <motion.div ref={heroRef} style={{ opacity: heroOpacity, scale: heroScale }} className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px]" />

        {/* Floating decorative elements */}
        <div className="absolute top-32 right-[15%] hidden lg:block">
          <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/10 backdrop-blur-sm" />
        </div>
        <div className="absolute bottom-40 left-[10%] hidden lg:block">
          <motion.div animate={{ y: [10, -15, 10], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 border border-accent/10 backdrop-blur-sm" />
        </div>
        <div className="absolute top-[60%] right-[8%] hidden lg:block">
          <motion.div animate={{ y: [-8, 12, -8] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 border border-secondary/10 backdrop-blur-sm rotate-45" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Now with AI-Powered Learning Paths</span>
            <ArrowRight className="h-3.5 w-3.5 text-primary" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Master New Skills.
            <br />
            <span className="text-gradient">Transform Your Career.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Join 150,000+ professionals learning from world-class instructors.
            Get certified, build projects, and advance your career with AI-guided learning paths.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/auth/register"
              className="btn-gradient text-white px-8 py-4 rounded-2xl text-base font-semibold flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 w-full sm:w-auto justify-center"
            >
              Start Learning for Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold border border-border hover:bg-muted/50 transition-all duration-300 w-full sm:w-auto justify-center group">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Play className="h-4 w-4 text-primary ml-0.5" />
              </div>
              Watch Demo
            </button>
          </motion.div>

          {/* Dashboard Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-[32px] blur-2xl opacity-50" />
            <div className="relative rounded-[24px] border border-border bg-card shadow-premium overflow-hidden">
              {/* Mock browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 rounded-lg bg-background/80 border border-border max-w-md mx-auto flex items-center px-3">
                    <LockIcon className="h-3 w-3 text-text-secondary mr-2" />
                    <span className="text-xs text-text-secondary">app.learnify.com/dashboard</span>
                  </div>
                </div>
              </div>
              {/* Mock dashboard content */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Courses Enrolled', value: '12', color: 'bg-primary/10 text-primary' },
                    { label: 'Hours Learned', value: '248', color: 'bg-blue-500/10 text-blue-500' },
                    { label: 'Certificates', value: '5', color: 'bg-amber-500/10 text-amber-500' },
                    { label: 'Current Streak', value: '23 days', color: 'bg-emerald-500/10 text-emerald-500' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-border p-4 bg-background">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-text-secondary mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="rounded-xl border border-border p-4 bg-background">
                      <div className="h-24 rounded-lg bg-gradient-to-br from-muted to-muted/50 mb-3" />
                      <div className="h-3 w-3/4 rounded bg-muted mb-2" />
                      <div className="h-2 w-1/2 rounded bg-muted" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-text-secondary">Scroll to explore</span>
            <ChevronDown className="h-5 w-5 text-text-secondary animate-scroll-indicator" />
          </motion.div>
        </div>
      </motion.div>

      {/* ========================================
          TRUST / STATS SECTION
          ======================================== */}
      <Section className="py-24 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Trusted By Logos */}
          <p className="text-center text-sm font-medium text-text-secondary mb-10">
            Trusted by teams at world-leading companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-16 opacity-40 dark:opacity-30">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple'].map((name) => (
              <span key={name} className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{name}</span>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========================================
          FEATURES SECTION
          ======================================== */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Zap className="h-3.5 w-3.5" /> Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Everything you need to <span className="text-gradient">learn & grow</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              From AI-powered personalization to industry-recognized certifications, we have built every tool you need to succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative p-8 rounded-[24px] border border-border bg-card hover:shadow-premium transition-all duration-500"
              >
                <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========================================
          COURSE CATEGORIES
          ======================================== */}
      <Section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <BookOpen className="h-3.5 w-3.5" /> Categories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Explore by <span className="text-gradient">category</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Browse our extensive catalog organized by industry and skill area.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <Link
                  to="/courses"
                  className="block p-6 rounded-[20px] border border-border bg-background hover:shadow-premium transition-all duration-300 text-center group"
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{cat.name}</h3>
                  <p className="text-xs text-text-secondary">{cat.count} courses</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========================================
          FEATURED COURSES (Netflix-style)
          ======================================== */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Star className="h-3.5 w-3.5" /> Featured
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Top-rated <span className="text-gradient">courses</span>
              </h2>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              View all courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-[20px] border border-border bg-card overflow-hidden hover:shadow-premium transition-all duration-500"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                    <Heart className="h-4 w-4 text-foreground" />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs font-medium text-white bg-primary/90 px-2.5 py-1 rounded-lg">{course.difficulty}</span>
                    <span className="text-xs font-medium text-white bg-black/50 px-2.5 py-1 rounded-lg">{course.duration}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <span className="text-xs font-medium text-primary">{course.category}</span>
                  <h3 className="font-bold mt-1 mb-3 line-clamp-2 text-sm leading-snug group-hover:text-primary transition-colors">{course.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-text-secondary mb-3">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      {course.rating}
                    </span>
                    <span>·</span>
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-lg font-bold">${course.price}</span>
                    <Link to="/courses/1" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                      Enroll <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 sm:hidden">
            <Link to="/courses" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              View all courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ========================================
          LEARNING PATHS
          ======================================== */}
      <Section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Rocket className="h-3.5 w-3.5" /> Learning Paths
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Structured paths to <span className="text-gradient">your dream career</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Follow our expert-designed roadmaps from beginner to professional. Each path is a curated sequence of courses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, i) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-[24px] border border-border bg-background hover:shadow-premium transition-all duration-500"
              >
                <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${path.color} mb-6`} />
                <h3 className="text-xl font-bold mb-4">{path.title}</h3>
                <div className="space-y-2 mb-6">
                  {path.steps.map((step, si) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${si === 0 ? 'bg-primary text-white' : 'bg-muted text-text-secondary'}`}>
                        {si + 1}
                      </div>
                      <span className="text-sm text-text-secondary">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-text-secondary">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {path.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {path.courses} courses</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========================================
          TESTIMONIALS
          ======================================== */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Quote className="h-3.5 w-3.5" /> Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Loved by <span className="text-gradient">learners worldwide</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    opacity: activeTestimonial === i ? 1 : 0,
                    scale: activeTestimonial === i ? 1 : 0.95,
                    position: activeTestimonial === i ? 'relative' as const : 'absolute' as const,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`text-center ${activeTestimonial !== i ? 'top-0 left-0 right-0 pointer-events-none' : ''}`}
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(t.rating)].map((_, si) => (
                      <Star key={si} className="h-5 w-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed mb-8 text-foreground/90">
                    "{t.review}"
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <img src={t.avatar} alt={t.name} className="h-14 w-14 rounded-full object-cover border-2 border-border" />
                    <div className="text-left">
                      <p className="font-bold">{t.name}</p>
                      <p className="text-sm text-text-secondary">{t.role} at {t.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${activeTestimonial === i ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-text-secondary'}`}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================
          PRICING
          ======================================== */}
      <Section className="py-24 bg-card border-y border-border" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-3.5 w-3.5" /> Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Simple, transparent <span className="text-gradient">pricing</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Start free. Upgrade when you are ready. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative p-8 rounded-[24px] border transition-all duration-300 hover:shadow-premium ${
                  plan.popular
                    ? 'border-primary bg-background shadow-glow'
                    : 'border-border bg-background'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-text-secondary mb-6">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-text-secondary ml-1">{plan.period}</span>
                </div>
                <Link
                  to="/auth/register"
                  className={`w-full flex items-center justify-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 mb-8 ${
                    plan.popular
                      ? 'btn-gradient text-white hover:scale-[1.02]'
                      : 'border border-border hover:bg-muted'
                  }`}
                >
                  {plan.cta}
                </Link>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <CircleCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========================================
          FAQ
          ======================================== */}
      <Section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <MousePointer2 className="h-3.5 w-3.5" /> FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently asked <span className="text-gradient">questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-[20px] border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
                >
                  <span className="font-semibold pr-4">{faq.q}</span>
                  <div className="shrink-0 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    {openFaq === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========================================
          FINAL CTA
          ======================================== */}
      <Section className="py-24 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[32px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-90" />
            <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
            <div className="relative z-10 py-20 px-8 sm:px-16 text-center text-white">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Ready to transform your career?
              </h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
                Join 150,000+ professionals already learning on Learnify. Start your journey today — completely free.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/auth/register"
                  className="bg-white text-primary px-8 py-4 rounded-2xl text-base font-semibold flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                >
                  Get Started for Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border border-white/30 text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
