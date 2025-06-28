import React from 'react';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

const Resume = () => {
  // You can replace this with your actual resume PDF URL
  const resumeUrl = "/resume.pdf"; // Place your resume.pdf in the public folder

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Aryan_Singh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Animated Background */}
      <div className="stars fixed inset-0 z-0"></div>
      <div className="clouds fixed inset-0 z-0"></div>
      
      <Navigation />
      
      <div className="pt-20 relative z-10">
        {/* Header */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">My Resume</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
              <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
                Download or view my complete resume with all my experience, skills, and achievements.
              </p>
              
              {/* Download Button */}
              <div className="mt-8">
                <Button 
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-lg px-8 py-3"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Viewer Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-6 animate-slide-in-left">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-primary" />
                    <h2 className="text-2xl font-bold">Resume Preview</h2>
                  </div>
                  <Button 
                    onClick={handleDownload}
                    variant="outline"
                    className="glass border-foreground/20"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                {/* PDF Embed */}
                <div className="w-full h-[800px] border border-foreground/20 rounded-lg overflow-hidden">
                  <iframe
                    src={resumeUrl}
                    width="100%"
                    height="100%"
                    className="border-0"
                    title="Resume PDF"
                  >
                    <p className="text-center py-20">
                      Your browser does not support PDFs. 
                      <a href={resumeUrl} className="text-primary hover:underline ml-1">
                        Click here to download the PDF
                      </a>
                    </p>
                  </iframe>
                </div>

                {/* Alternative view for unsupported browsers */}
                <div className="mt-6 text-center">
                  <p className="text-foreground/60 mb-4">
                    Having trouble viewing the PDF? You can download it directly.
                  </p>
                  <Button 
                    onClick={handleDownload}
                    variant="outline"
                    className="glass border-foreground/20"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
