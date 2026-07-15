import { Search, Book, FileQuestion, MessageCircle, LifeBuoy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';

export default function HelpCenter() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center space-y-6 pt-8 pb-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">How can we help you?</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Search our knowledge base or browse categories below to find exactly what you need.
        </p>
        <div className="max-w-xl mx-auto relative mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
          <input 
            className="w-full h-14 pl-12 pr-4 rounded-full border border-border bg-card shadow-sm text-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Search for articles, guides..."
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Book className="h-8 w-8 text-primary" />, title: 'Getting Started', desc: 'Learn the basics of the platform.' },
          { icon: <FileQuestion className="h-8 w-8 text-primary" />, title: 'Account & Billing', desc: 'Manage your profile and payments.' },
          { icon: <MessageCircle className="h-8 w-8 text-primary" />, title: 'Course Help', desc: 'Troubleshoot video and course issues.' },
          { icon: <LifeBuoy className="h-8 w-8 text-primary" />, title: 'Community', desc: 'Guidelines and community support.' },
        ].map((item, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer group">
            <CardContent className="p-6 text-center space-y-4">
              <div className="h-16 w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-text-secondary mt-1">{item.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto pt-8 border-t border-border">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Accordion title="How do I reset my password?">
            <div className="p-4 text-text-secondary leading-relaxed">
              To reset your password, go to the login page and click on "Forgot Password". Enter your registered email address and we will send you a secure link to create a new password.
            </div>
          </Accordion>
          <Accordion title="Can I download course videos?">
            <div className="p-4 text-text-secondary leading-relaxed">
              Currently, video downloads are only available on our mobile application for offline viewing. Desktop downloads are not supported to protect the copyright of our instructors.
            </div>
          </Accordion>
          <Accordion title="How do I get my certificate?">
            <div className="p-4 text-text-secondary leading-relaxed">
              Once you complete 100% of the lessons in a course, your certificate will automatically be generated and available in the "Certificates" tab of your dashboard.
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
