import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';

export default function Contact() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Touch</span>
          </h1>
          <p className="text-lg text-text-secondary">
            Have questions about our platform or enterprise plans? Our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Contact Information</h2>
            <p className="text-text-secondary text-lg">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-6 mt-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Email Us</h4>
                  <p className="text-text-secondary">hello@learnify.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Call Us</h4>
                  <p className="text-text-secondary">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Visit Us</h4>
                  <p className="text-text-secondary">123 Innovation Drive, Tech City, CA 94043</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 border-border shadow-premium bg-card">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input placeholder="John" className="h-12 rounded-xl bg-background" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input placeholder="Doe" className="h-12 rounded-xl bg-background" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="john@company.com" className="h-12 rounded-xl bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="How can we help you?" className="h-12 rounded-xl bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <textarea 
                  rows={5} 
                  className="w-full rounded-xl border border-border bg-background p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>
              <Button className="w-full h-12 btn-gradient text-white rounded-xl text-lg font-semibold shadow-md">
                Send Message <Send className="h-5 w-5 ml-2" />
              </Button>
            </form>
          </Card>
        </div>

      </div>
    </div>
  );
}
