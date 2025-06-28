
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = contactRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: '16aryansin@gmail.com',
      href: 'mailto:16aryansin@gmail.com'
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+91 9123339637',
      href: 'tel:+919123339637'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Kolkata, India',
      href: null
    }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/aryansingh16',
      icon: '💼'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Aryan0116',
      icon: '💻'
    }
  ];

  return (
    <section id="contact" ref={contactRef} className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="animate-on-scroll text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Let's discuss opportunities, collaborate on projects, or just have a conversation about technology
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="animate-on-scroll space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Let's Connect</h3>
                <p className="text-foreground/70 mb-8 leading-relaxed">
                  I'm always open to discussing new opportunities, interesting projects, or just 
                  connecting with fellow developers and tech enthusiasts. Feel free to reach out!
                </p>

                {/* Contact Info Cards */}
                <div className="space-y-4 mb-8">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="glass-card p-4 hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{info.icon}</div>
                        <div>
                          <h4 className="font-semibold text-foreground">{info.label}</h4>
                          {info.href ? (
                            <a 
                              href={info.href}
                              className="text-foreground/70 hover:text-primary transition-colors duration-200"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-foreground/70">{info.value}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="font-semibold mb-4 text-foreground">Follow Me</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card p-4 hover:scale-110 transition-all duration-300 hover:bg-primary/10"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{social.icon}</span>
                          <span className="font-medium text-foreground">{social.name}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-on-scroll">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 glass border-foreground/20 focus:border-primary"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 glass border-foreground/20 focus:border-primary"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-foreground">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-1 glass border-foreground/20 focus:border-primary"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-foreground">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="mt-1 glass border-foreground/20 focus:border-primary resize-none"
                      placeholder="Your message here..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 py-3"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
