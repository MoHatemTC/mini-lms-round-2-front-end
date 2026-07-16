import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Check,
  Sparkles,
  ArrowRight,
  CircleCheck,
  Minus,
  HelpCircle,
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

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    period: "forever",
    description: "Perfect for exploring",
    features: [
      "50+ free courses",
      "Community forum access",
      "Basic progress tracking",
      "Course completion badges",
      "Mobile app access",
    ],
    cta: "Start Learning",
    popular: false,
  },
  {
    name: "Professional",
    price: { monthly: 29, yearly: 24 },
    period: "/mo",
    description: "For serious learners",
    features: [
      "All 2,400+ courses",
      "Professional certificates",
      "AI learning assistant",
      "Project reviews",
      "Priority support",
      "Offline downloads",
      "Career roadmaps",
      "Mentorship sessions",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 99, yearly: 79 },
    period: "/mo",
    description: "For teams & orgs",
    features: [
      "Everything in Professional",
      "Team management dashboard",
      "Custom learning paths",
      "SSO & API access",
      "Dedicated success manager",
      "Advanced analytics",
      "Custom branding",
      "SLA guarantee",
      "Unlimited seats",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const comparisonFeatures = [
  {
    feature: "Access to free courses",
    free: true,
    pro: true,
    enterprise: true,
  },
  { feature: "Community forums", free: true, pro: true, enterprise: true },
  { feature: "Full course library", free: false, pro: true, enterprise: true },
  {
    feature: "Professional certificates",
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: "AI learning assistant",
    free: false,
    pro: true,
    enterprise: true,
  },
  { feature: "Offline downloads", free: false, pro: true, enterprise: true },
  { feature: "Priority support", free: false, pro: true, enterprise: true },
  { feature: "Career roadmaps", free: false, pro: true, enterprise: true },
  { feature: "Team management", free: false, pro: false, enterprise: true },
  {
    feature: "Custom learning paths",
    free: false,
    pro: false,
    enterprise: true,
  },
  { feature: "SSO & API access", free: false, pro: false, enterprise: true },
  { feature: "Dedicated manager", free: false, pro: false, enterprise: true },
  { feature: "Custom branding", free: false, pro: false, enterprise: true },
  { feature: "SLA guarantee", free: false, pro: false, enterprise: true },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

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
            <Sparkles className="h-3.5 w-3.5" /> Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Invest in your <span className="text-gradient">future</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto mb-10"
          >
            Start free, upgrade when you are ready. All plans include a 30-day
            money-back guarantee.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-muted border border-border"
          >
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${!isYearly ? "bg-card shadow-sm text-foreground" : "text-text-secondary"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${isYearly ? "bg-card shadow-sm text-foreground" : "text-text-secondary"}`}
            >
              Yearly{" "}
              <span className="text-xs text-primary font-semibold">
                Save 20%
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Pricing Cards */}
      <Section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative p-8 rounded-[24px] border transition-all duration-300 hover:shadow-premium ${plan.popular ? "border-primary bg-card shadow-glow" : "border-border bg-card"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-text-secondary mb-6">
                  {plan.description}
                </p>
                <div className="mb-8">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="text-text-secondary ml-1">
                    {plan.price.monthly === 0 ? "forever" : plan.period}
                  </span>
                  {isYearly && plan.price.monthly > 0 && (
                    <div className="text-xs text-primary mt-1">
                      Billed $
                      {(isYearly ? plan.price.yearly : plan.price.monthly) * 12}
                      /year
                    </div>
                  )}
                </div>
                <Link
                  to={
                    plan.name === "Enterprise" ? "/contact" : "/auth/register"
                  }
                  className={`w-full flex items-center justify-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 mb-8 ${plan.popular ? "btn-gradient text-white hover:scale-[1.02]" : "border border-border hover:bg-muted"}`}
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

      {/* Comparison Table */}
      <Section className="py-24 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Compare <span className="text-gradient">plans</span>
            </h2>
          </div>
          <div className="rounded-[24px] border border-border overflow-hidden bg-background">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-5 font-semibold">Feature</th>
                    <th className="p-5 font-semibold text-center">Free</th>
                    <th className="p-5 font-semibold text-center text-primary">
                      Professional
                    </th>
                    <th className="p-5 font-semibold text-center">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={i % 2 === 0 ? "" : "bg-muted/10"}
                    >
                      <td className="p-5 text-text-secondary">{row.feature}</td>
                      <td className="p-5 text-center">
                        {row.free ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <Minus className="h-5 w-5 text-border mx-auto" />
                        )}
                      </td>
                      <td className="p-5 text-center">
                        {row.pro ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <Minus className="h-5 w-5 text-border mx-auto" />
                        )}
                      </td>
                      <td className="p-5 text-center">
                        {row.enterprise ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <Minus className="h-5 w-5 text-border mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Our team is here to help you find the perfect plan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-gradient text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:scale-[1.03] transition-all"
            >
              Contact Sales <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/help"
              className="border border-border px-8 py-4 rounded-2xl font-semibold hover:bg-muted transition-all flex items-center gap-2"
            >
              <HelpCircle className="h-5 w-5" /> Help Center
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
