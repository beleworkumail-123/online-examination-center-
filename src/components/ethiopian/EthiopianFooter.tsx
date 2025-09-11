import { Mail, Phone, MapPin, Facebook, MessageCircle, Linkedin, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import logoImage from "@/assets/ethiopian-edu-logo.png";

const EthiopianFooter = () => {
  const quickLinks = [
    { name: "FAQ", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Support Center", href: "/support" },
    { name: "Contact Us", href: "/contact" },
    { name: "About Us", href: "/about" }
  ];

  const examLinks = [
    { name: "Grade 8 Exams", href: "/exams/grade-8" },
    { name: "Grade 10 Exams", href: "/exams/grade-10" },
    { name: "Grade 12 Entrance", href: "/exams/entrance" },
    { name: "University Exit", href: "/exams/exit" },
    { name: "Professional Certs", href: "/exams/professional" },
    { name: "Practice Tests", href: "/exams/practice" }
  ];

  const subjects = [
    { name: "Mathematics", href: "/subjects/mathematics" },
    { name: "Physics", href: "/subjects/physics" },
    { name: "Chemistry", href: "/subjects/chemistry" },
    { name: "Biology", href: "/subjects/biology" },
    { name: "English", href: "/subjects/english" },
    { name: "Social Studies", href: "/subjects/social" }
  ];

  return (
    <footer className="bg-gradient-to-b from-foreground/5 to-foreground/10 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src={logoImage} 
                alt="EthioStudyHub Logo" 
                className="h-12 w-12 rounded-lg shadow-sm"
              />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red bg-clip-text text-transparent">
                  EthioStudyHub
                </h3>
                <p className="text-sm text-muted-foreground">Academic Excellence Platform</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering Ethiopian students with secure, accessible, and innovative examination solutions. 
              Building the future of education in Ethiopia.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@ethiostudyhub.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+251-11-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-primary/20 hover:border-primary hover:bg-primary/5">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-primary/20 hover:border-primary hover:bg-primary/5">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-primary/20 hover:border-primary hover:bg-primary/5">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Exams */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Examinations</h4>
            <ul className="space-y-3">
              {examLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on new exams, features, and educational resources.
            </p>
            
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="flex-1 border-primary/20 focus:border-primary"
                />
                <Button size="icon" className="bg-gradient-to-r from-primary to-primary-variant">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>

            {/* Popular Subjects */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-foreground mb-3">Popular Subjects</h5>
              <div className="flex flex-wrap gap-2">
                {subjects.slice(0, 4).map((subject, index) => (
                  <a
                    key={index}
                    href={subject.href}
                    className="inline-flex items-center px-3 py-1 text-xs bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                  >
                    {subject.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2024 EthioStudyHub. All rights reserved.</span>
            <div className="hidden md:flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-destructive fill-destructive" />
              <span>in Ethiopia</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <span className="text-muted-foreground">
              🇪🇹 Proudly Ethiopian
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span className="text-muted-foreground">Platform Status: All Systems Operational</span>
            </div>
          </div>
        </div>

        {/* Ethiopian Pride Bar */}
        <div className="py-4 border-t border-border/30">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-6 h-4 bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red rounded-sm"></div>
            <span className="text-sm font-medium text-foreground">
              Serving Ethiopian Education Excellence Since 2024
            </span>
            <div className="w-6 h-4 bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red rounded-sm"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EthiopianFooter;