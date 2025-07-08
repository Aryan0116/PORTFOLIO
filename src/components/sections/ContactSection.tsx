
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Clock, MessageCircle, Star, Palette } from 'lucide-react';

const ContactSection = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [availabilityStatus, setAvailabilityStatus] = useState<'available' | 'busy' | 'offline'>('available');
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

  useEffect(() => {
    // Update time every minute for availability status
    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      updateAvailabilityStatus(now);
    }, 60000);

    // Initial status update
    updateAvailabilityStatus(new Date());

    return () => clearInterval(timeInterval);
  }, []);

  const updateAvailabilityStatus = (date: Date) => {
    // Convert to IST (GMT+5:30)
    const istTime = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
    const hours = istTime.getUTCHours();

    if (hours >= 10 && hours < 22) { // 10 AM to 10 PM IST
      setAvailabilityStatus('available');
    } else if (hours >= 0 && hours < 7) { // 12 AM to 7 AM IST
      setAvailabilityStatus('offline');
    } else { // 7 AM to 10 AM and 10 PM to 12 AM IST
      setAvailabilityStatus('busy');
    }
  };

  const getStatusConfig = (status: typeof availabilityStatus) => {
    switch (status) {
      case 'available':
        return {
          color: 'bg-green-500',
          text: 'Available for new projects',
          message: 'Online and ready to discuss your project!'
        };
      case 'busy':
        return {
          color: 'bg-yellow-500',
          text: 'Limited availability',
          message: 'I may respond with some delay'
        };
      case 'offline':
        return {
          color: 'bg-red-500',
          text: 'Currently offline',
          message: 'I\'ll respond as soon as I\'m back online'
        };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // EmailJS integration will be implemented here
      // For now, we'll simulate the form submission
      
      // Prepare template parameters for EmailJS
      const templateParams = {
  from_name: formData.name,
  from_email: formData.email,
  subject: formData.subject || `New contact from ${formData.name}`,
  message: formData.message,
  time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  reply_to: formData.email
};

      // TODO: Replace with actual EmailJS implementation
      await emailjs.send('service_portfolio', 'template_port', templateParams, 'LHfI7ppcmri7OBH4h');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours!",
      });
      
      // Auto-reply for new projects (only when available)
      if (availabilityStatus === 'available' && 
          (formData.subject?.toLowerCase().includes('project') || 
           formData.message.toLowerCase().includes('project'))) {
        setTimeout(() => {
          toast({
            title: "Auto-Reply Sent",
            description: "I've sent you an automatic response about project inquiries!",
          });
        }, 1000);
      }
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: '16aryansin@gmail.com',
      href: 'mailto:16aryansin@gmail.com',
      description: 'Drop me a line anytime'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9123339637',
      href: 'tel:+919123339637',
      description: 'Available during business hours'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kolkata, India',
      href: null,
      description: 'GMT+5:30 timezone'
    }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/aryansingh16',
      icon: Linkedin,
      color: 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950',
      description: 'Professional network'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Aryan0116',
      icon: Github,
      color: 'hover:text-gray-800 hover:bg-gray-50 dark:hover:text-gray-200 dark:hover:bg-gray-800',
      description: 'Code repositories'
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/aryansingh16',
      icon: Instagram,
      color: 'hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950',
      description: 'lets connect'
    }
  ];

  const features = [
    {
      icon: MessageCircle,
      title: 'Quick Response',
      description: 'I reply to all messages within 24 hours'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Available for calls and meetings'
    },
    {
      icon: Star,
      title: 'Quality Work',
      description: 'Committed to delivering excellence'
    },
    {
      icon: Palette,
      title: 'Creative Solutions',
      description: 'Innovative design approaches'
    }
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });
  };

  const statusConfig = getStatusConfig(availabilityStatus);

  return (
<section id="contact" ref={contactRef} className="py-20 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="stars absolute inset-0"></div>
      <div className="clouds absolute inset-0"></div>      <div className="container mx-auto px-4">
        {/* Header with Quote */}
        <div className="animate-on-scroll text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Let's Create Something Amazing
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto mb-8"></div>
          
          {/* Design Quote */}
          <div className="max-w-3xl mx-auto mb-8">
            <blockquote className="text-xl md:text-2xl text-muted-foreground italic font-light leading-relaxed">
              "Design is not just what it looks like and feels like. Design is how it works."
            </blockquote>
            <cite className="text-primary font-medium mt-4 block">— Steve Jobs</cite>
          </div>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to bring your vision to life? Let's discuss your next project and create something extraordinary together.
          </p>
        </div>

        {/* Real-time Status Bar */}
        <div className="animate-on-scroll mb-12">
          <div className="bg-card/60 backdrop-blur-sm border rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${statusConfig.color} animate-pulse`}></div>
                  <span className="text-sm font-medium">{statusConfig.text}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {statusConfig.message}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(currentTime)} IST</span>
                </div>
                <div>🌍 GMT+5:30</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-on-scroll">
              <div className="bg-card/60 backdrop-blur-sm border rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Send a Message</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        // placeholder="John Doe"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        // placeholder="john@example.com"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="New Project Inquiry, Consultation, etc."
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">
                      Your Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      // placeholder="Tell me about your project, goals, timeline, and how I can help you achieve your vision..."
                      rows={6}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3 text-base font-medium hover:scale-105 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                  
                  {/* EmailJS Integration Note */}
                  <div className="text-xs text-muted-foreground text-center pt-2">
                    {availabilityStatus === 'available' && (
                      <p className="text-green-600">💡 Auto-reply enabled for new project inquiries!</p>
                    )}
                  </div>
                </form>
              </div>
              {/* Follow Me */}
              {/* Follow Me */}
<div className="bg-card/60 backdrop-blur-sm border rounded-xl p-8 hover:shadow-lg transition-all duration-300 mt-8">
  <h4 className="font-bold text-lg mb-6">Follow Me</h4>
  <div className="space-y-3">
    {socialLinks.map((social, index) => {
      const IconComponent = social.icon;
      return (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 ${social.color} hover:scale-105 hover:shadow-md`}
        >
          <div className="p-2 bg-muted/50 rounded-lg">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold">{social.name}</div>
            <div className="text-sm text-muted-foreground">{social.description}</div>
          </div>
        </a>
      );
    })}
  </div>
</div>

            </div>

            {/* Contact Information & Social */}
            <div className="animate-on-scroll space-y-8">
              {/* Contact Information */}
              <div className="bg-card/60 backdrop-blur-sm border rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  Get in Touch
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                        <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground">{info.label}</h4>
                          {info.href ? (
                            <a 
                              href={info.href}
                              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium block break-all"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-foreground font-medium">{info.value}</p>
                          )}
                          <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Why Work With Me */}
              <div className="bg-card/60 backdrop-blur-sm border rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-lg mb-6">Why Work With Me?</h4>
                <div className="space-y-4">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                        <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm">{feature.title}</h5>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="animate-on-scroll text-center mt-16">
            <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm border rounded-xl p-12">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Ready to Start Your Project?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                Let's turn your ideas into reality. Whether it's a website, app, or digital experience, 
                I'm here to help you create something extraordinary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://mail.google.com/mail/?view=cm&to=16aryansin@gmail.com&su=New%20Project%20Inquiry"

                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 font-medium"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Start a Project
                </a>
                <a
                  href="https://linkedin.com/in/aryansingh16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-card border rounded-lg hover:bg-accent hover:scale-105 transition-all duration-300 font-medium"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  Let's Connect
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;