import { GraduationCap, Facebook, Linkedin, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand & Core */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                E-Exam
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Empowering students and professionals to achieve their goals through comprehensive exam preparation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 shadow-sm">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 shadow-sm">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://t.me/eexam" className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 shadow-sm">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="mailto:support@e-exam.com" className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 shadow-sm">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  onClick={() => navigate('/')}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Home</span>
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">About</span>
                </a>
              </li>
              <li>
                <a href="#courses" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Courses</span>
                </a>
              </li>
              <li>
                <a href="#subscription" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Subscription</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Exams */}
          <div>
            <h3 className="font-bold text-foreground mb-6 text-lg">Exams</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  onClick={() => navigate('/entrance-exams')}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Entrance Exam</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={() => navigate('/exit-exams')}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Exit Exam</span>
                </a>
              </li>
              <li>
                <a href="#work-exams" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Work Exam</span>
                </a>
              </li>
              <li>
                <a href="#ngat" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">NGAT</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="font-bold text-foreground mb-6 text-lg">Support & Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="#help" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Help Center / FAQ</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Contact Us</span>
                </a>
              </li>
              <li className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:support@e-exam.com" className="hover:text-primary transition-colors">
                    support@e-exam.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+251-XXX-XXXX" className="hover:text-primary transition-colors">
                    +251-XXX-XXXX
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-Footer Bar */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 E-Exam. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;