import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, Globe, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const footerSections = [
  {
    title: "Platform",
    links: [
      { label: "Browse Courses", href: "/courses" },
      { label: "Learning Paths", href: "/courses" },
      { label: "Certificates", href: "/features" },
      { label: "For Teams", href: "/pricing" },
      { label: "For Enterprise", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Blog", href: "/blog" },
      { label: "Documentation", href: "/blog" },
      { label: "Community", href: "/about" },
      { label: "Webinars", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Press Kit", href: "/about" },
      { label: "Partners", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/about" },
      { label: "Terms of Service", href: "/about" },
      { label: "Cookie Policy", href: "/about" },
      { label: "GDPR", href: "/about" },
      { label: "Accessibility", href: "/about" },
    ],
  },
];

const socialLinks = [
  {
    label: "Twitter",
    href: "#",
    svg: (
      <svg
        className="h-[18px] w-[18px]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    svg: (
      <svg
        className="h-[18px] w-[18px]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg
        className="h-[18px] w-[18px]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    svg: (
      <svg
        className="h-[18px] w-[18px]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="relative border-t border-border bg-card overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/5 blur-[80px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Stay ahead of the curve
            </h3>
            <p className="text-text-secondary mb-8">
              Get weekly insights on learning, technology, and career growth.
              Join 50,000+ professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-5 rounded-xl bg-background border border-border text-sm placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />

              <button className="btn-gradient text-white h-12 px-6 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform shrink-0">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-text-secondary mt-4">
              No spam, ever. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Learnify</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-xs">
              Empowering millions of learners worldwide with cutting-edge
              courses, expert instructors, and industry-recognized
              certifications.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="h-9 w-9 rounded-xl flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold mb-4 text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Learnify. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <button className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-foreground transition-colors">
              <Globe className="h-3.5 w-3.5" />
              English
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <>
                  <Sun className="h-3.5 w-3.5" />
                  Light
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5" />
                  Dark
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
