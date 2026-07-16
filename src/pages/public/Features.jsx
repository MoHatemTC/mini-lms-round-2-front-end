import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  Award,
  Code,
  Rocket,
  Sparkles,
  Users,
  BarChart3,
  Zap,
  Shield,
  Globe2,
  ArrowRight,
  Monitor,
  Play,
  Check,
} from "lucide-react";

function Section({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const mainFeatures = [
  {
    icon: Brain,
    title: "AI Learning Assistant",
    description:
      "Our AI understands your learning style, identifies knowledge gaps, and creates personalized study plans. It adapts in real-time to optimize your learning efficiency.",
    benefits: [
      "Personalized study plans",
      "Smart content recommendations",
      "Adaptive difficulty scaling",
      "Progress predictions",
    ],
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Award,
    title: "Professional Certificates",
    description:
      "Earn certificates recognized by 5,000+ companies worldwide. Each certificate includes a unique verification link and QR code for instant validation.",
    benefits: [
      "Industry-recognized",
      "Blockchain-verified",
      "Shareable on LinkedIn",
      "Resume-ready",
    ],
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Code,
    title: "Hands-on Projects",
    description:
      "Build real-world projects with guided exercises. Get code reviews from experts and add portfolio-ready deliverables to showcase your skills.",
    benefits: [
      "Real-world scenarios",
      "Expert code reviews",
      "Portfolio building",
      "Peer collaboration",
    ],
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Rocket,
    title: "Career Roadmaps",
    description:
      "Follow structured learning paths designed by industry experts. Each roadmap is aligned with current job market demands and skill requirements.",
    benefits: [
      "Industry-aligned paths",
      "Skill gap analysis",
      "Job readiness score",
      "Interview preparation",
    ],
    color: "from-emerald-500 to-teal-600",
  },
];

const additionalFeatures = [
  {
    icon: Monitor,
    title: "Interactive IDE",
    description:
      "Code directly in the browser with our built-in IDE. No setup required.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track your progress with detailed analytics and learning insights.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 certified with SSO, SAML, and role-based access control.",
  },
  {
    icon: Globe2,
    title: "Multi-language",
    description: "Courses available in 15+ languages with real-time subtitles.",
  },
  {
    icon: Users,
    title: "Team Learning",
    description:
      "Manage team learning with shared dashboards and group projects.",
  },
  {
    icon: Zap,
    title: "Offline Mode",
    description: "Download courses and learn anywhere, even without internet.",
  },
  {
    icon: Play,
    title: "4K Video",
    description: "Crystal-clear video content with adjustable playback speed.",
  },
  {
    icon: Sparkles,
    title: "Gamification",
    description: "Earn points, badges, and maintain streaks to stay motivated.",
  },
];

export default function Features() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <div className="relative pt-32 pb-20 bg-gradient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Zap className="h-3.5 w-3.5" /> Features
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Built for <span className="text-gradient">modern learners</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Every feature is designed to help you learn faster, retain more, and
            advance your career with confidence.
          </motion.p>
        </div>
      </div>

      {/* Main Features — Alternating Layout */}
      {mainFeatures.map((feature, i) => (
        <Section
          key={feature.title}
          className={`py-24 ${i % 2 === 0 ? "" : "bg-card border-y border-border"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:[direction:rtl] lg:[&>*]:direction-ltr" : ""}`}
            >
              <div>
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6`}
                >
                  <feature.icon className="h-7 w-7" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  {feature.title}
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-8">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span className="font-medium">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div
                  className={`absolute -inset-4 bg-gradient-to-br ${feature.color} rounded-[32px] blur-3xl opacity-10`}
                />
                <div className="relative rounded-[24px] overflow-hidden border border-border shadow-premium aspect-[4/3] bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                  <feature.icon className="h-20 w-20 text-primary/15" />
                </div>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* Additional Features Grid */}
      <Section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              And so much <span className="text-gradient">more</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Everything you need for a complete learning experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-[20px] border border-border bg-background hover:shadow-premium transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Experience the difference
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Start learning with the most advanced LMS platform available.
          </p>
          <Link
            to="/auth/register"
            className="inline-flex items-center gap-2 btn-gradient text-white px-8 py-4 rounded-2xl font-semibold hover:scale-[1.03] transition-all"
          >
            Get Started Free <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </Section>
    </div>
  );
}
