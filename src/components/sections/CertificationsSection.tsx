
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Award } from 'lucide-react';

const CertificationsSection = () => {
  const certificationsRef = useRef<HTMLDivElement>(null);

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

    const elements = certificationsRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const certifications = [
    {
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: 'December 2023',
      description: 'Foundational understanding of AWS Cloud services and best practices.',
      driveId: '1your-google-drive-file-id-here',
      credentialId: 'AWS-CP-2023-001'
    },
    {
      title: 'React Developer Certification',
      issuer: 'Meta',
      date: 'November 2023',
      description: 'Advanced React concepts including hooks, context, and performance optimization.',
      driveId: '1your-google-drive-file-id-here-2',
      credentialId: 'META-REACT-2023-002'
    },
    {
      title: 'Machine Learning Fundamentals',
      issuer: 'Google',
      date: 'October 2023',
      description: 'Core machine learning concepts and practical implementation using TensorFlow.',
      driveId: '1your-google-drive-file-id-here-3',
      credentialId: 'GOOGLE-ML-2023-003'
    },
    {
      title: 'Full Stack Web Development',
      issuer: 'freeCodeCamp',
      date: 'September 2023',
      description: 'Comprehensive training in modern web development technologies and frameworks.',
      driveId: '1your-google-drive-file-id-here-4',
      credentialId: 'FCC-FSWD-2023-004'
    }
  ];

  const getGoogleDrivePreviewUrl = (driveId: string) => {
    return `https://drive.google.com/file/d/${driveId}/preview`;
  };

  const getGoogleDriveDownloadUrl = (driveId: string) => {
    return `https://drive.google.com/file/d/${driveId}/view?usp=sharing`;
  };

  return (
    <section id="certifications" ref={certificationsRef} className="py-20 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="stars absolute inset-0"></div>
      <div className="clouds absolute inset-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="animate-on-scroll text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Certifications</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Professional certifications that validate my expertise and commitment to continuous learning
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="animate-on-scroll glass-card overflow-hidden hover:scale-105 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Certificate Preview */}
                <div className="relative h-64 bg-muted/30">
                  <iframe
                    src={getGoogleDrivePreviewUrl(cert.driveId)}
                    className="w-full h-full border-0"
                    title={`${cert.title} Certificate`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>

                {/* Certificate Content */}
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {cert.title}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span className="text-blue-600 font-medium">{cert.issuer}</span>
                    <span className="text-foreground/60 text-sm">{cert.date}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-foreground/70 mb-4">
                    {cert.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-sm text-foreground/60">Credential ID: </span>
                    <span className="text-sm font-mono text-primary">{cert.credentialId}</span>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a 
                        href={getGoogleDriveDownloadUrl(cert.driveId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Certificate
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
