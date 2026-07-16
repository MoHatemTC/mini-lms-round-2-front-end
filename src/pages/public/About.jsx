import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  Target,
  Eye,
  Users,
  Globe2,
  ArrowRight,
  Lightbulb,
  GraduationCap,
  Zap,
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

const values = [
  {
    icon: Heart,
    title: "Learner-First",
    description:
      "Every decision we make starts with one question: how does this help our learners succeed?",
    color: "from-rose-500/10 to-pink-500/10",
    iconColor: "text-rose-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We leverage cutting-edge AI and technology to create the most effective learning experiences.",
    color: "from-amber-500/10 to-yellow-500/10",
    iconColor: "text-amber-500",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We believe learning is better together. Our community of 150K+ learners supports each other.",
    color: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We obsess over quality. Every course is vetted, every instructor is world-class.",
    color: "from-emerald-500/10 to-teal-500/10",
    iconColor: "text-emerald-500",
  },
  {
    icon: Globe2,
    title: "Accessibility",
    description:
      "Premium education should be available to everyone, everywhere, regardless of background.",
    color: "from-purple-500/10 to-violet-500/10",
    iconColor: "text-purple-500",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "No hidden fees, no shady practices. We earn trust through honesty and openness.",
    color: "from-sky-500/10 to-blue-500/10",
    iconColor: "text-sky-500",
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former VP of Engineering at Google. Stanford CS PhD.",
    avatar: "https://i.pravatar.cc/300?img=1",
  },
  {
    name: "Marcus Johnson",
    role: "CTO & Co-Founder",
    bio: "Ex-Netflix Principal Engineer. MIT graduate.",
    avatar: "https://i.pravatar.cc/300?img=3",
  },
  {
    name: "Priya Patel",
    role: "VP of Product",
    bio: "Former Head of Product at Coursera. MBA from Wharton.",
    avatar: "https://i.pravatar.cc/300?img=5",
  },
  {
    name: "David Kim",
    role: "VP of Engineering",
    bio: "Ex-Stripe Staff Engineer. Carnegie Mellon CS.",
    avatar: "https://i.pravatar.cc/300?img=7",
  },
  {
    name: "Emma Wilson",
    role: "Head of Content",
    bio: "Former Education Lead at Khan Academy.",
    avatar: "https://i.pravatar.cc/300?img=9",
  },
  {
    name: "Alex Rivera",
    role: "Head of AI",
    bio: "Former DeepMind Research Scientist. Oxford PhD.",
    avatar: "https://i.pravatar.cc/300?img=11",
  },
];

const milestones = [
  {
    year: "2019",
    title: "Founded",
    description:
      "Learnify was born in a San Francisco garage with a mission to democratize education.",
  },
  {
    year: "2020",
    title: "First 10K Users",
    description:
      "Launched our first 100 courses and reached 10,000 active learners.",
  },
  {
    year: "2021",
    title: "Series A",
    description: "Raised $15M in Series A funding led by Andreessen Horowitz.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Expanded to 80+ countries with multi-language support.",
  },
  {
    year: "2023",
    title: "AI Integration",
    description:
      "Launched AI-powered learning paths and personalized recommendations.",
  },
  {
    year: "2024",
    title: "150K+ Learners",
    description: "Crossed 150,000 active learners with 2,400+ courses.",
  },
];

export default function About() {
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
            <GraduationCap className="h-3.5 w-3.5" /> About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            We're on a mission to
            <br />
            <span className="text-gradient">democratize education</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Learnify was founded with a simple belief: everyone deserves access
            to world-class education, regardless of where they live or what they
            earn.
          </motion.p>
        </div>
      </div>

      {/* Stats */}
      <Section className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "150K+", label: "Active Learners" },
              { value: "2,400+", label: "Expert Courses" },
              { value: "120+", label: "Countries" },
              { value: "$15M", label: "Funding Raised" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {s.value}
                </div>
                <p className="text-sm text-text-secondary">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Story */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Zap className="h-3.5 w-3.5" /> Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                From a garage to{" "}
                <span className="text-gradient">global impact</span>
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  In 2019, our co-founders Sarah and Marcus left their positions
                  at Google and Netflix with a shared vision: to make premium
                  education accessible to everyone.
                </p>
                <p>
                  They had seen firsthand how traditional education systems
                  failed millions of aspiring technologists. Expensive
                  bootcamps, outdated university curricula, and geographic
                  barriers kept talented people from reaching their potential.
                </p>
                <p>
                  Today, Learnify serves over 150,000 learners across 120+
                  countries. Our AI-powered platform adapts to each student's
                  learning style, pace, and goals — delivering a truly
                  personalized education experience.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[32px] blur-2xl" />
              <div className="relative rounded-[24px] overflow-hidden border border-border shadow-premium aspect-[4/3] bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                <GraduationCap className="h-24 w-24 text-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our <span className="text-gradient">values</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-8 rounded-[24px] border border-border bg-background hover:shadow-premium transition-all duration-500"
              >
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-6`}
                >
                  <v.icon className={`h-6 w-6 ${v.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our <span className="text-gradient">journey</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-4 top-1 h-8 w-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm font-bold text-primary">
                    {m.year}
                  </span>
                  <h3 className="text-lg font-bold mt-1">{m.title}</h3>
                  <p className="text-text-secondary mt-1">{m.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Meet our <span className="text-gradient">leadership</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              World-class team from the best companies in tech.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-[24px] border border-border bg-background hover:shadow-premium transition-all duration-500 text-center"
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-24 w-24 rounded-full mx-auto mb-4 object-cover border-2 border-border"
                />
                <h3 className="font-bold text-lg">{t.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">
                  {t.role}
                </p>
                <p className="text-sm text-text-secondary">{t.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to join us?
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
            Whether you are a learner, instructor, or partner — we would love to
            have you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/register"
              className="btn-gradient text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:scale-[1.03] transition-all"
            >
              Start Learning <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border border-border px-8 py-4 rounded-2xl font-semibold hover:bg-muted transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
