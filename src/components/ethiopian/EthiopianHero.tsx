import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Shield, Globe, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/ethiopian-students-hero.jpg";

const EthiopianHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden py-8 sm:py-12 lg:py-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Ethiopian students studying"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-ethiopian-green/10 to-ethiopian-yellow/10 border border-ethiopian-green/20 rounded-full px-3 py-2 sm:px-6 sm:py-2 mb-6 sm:mb-8 animate-fade-in-up">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-ethiopian-green" />
            <span className="text-xs sm:text-sm font-medium text-foreground">Trusted by 50,000+ Students</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 animate-fade-in-up px-2">
            <span className="block text-foreground">Exams Made</span>
            <span className="block bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red bg-clip-text text-transparent">
              Simple, Secure,
            </span>
            <span className="block text-primary">& Accessible</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed animate-fade-in-up animation-delay-200 px-4">
            Join thousands of students and educators across Ethiopia. 
            Practice for entrance exams, exit exams, and professional certifications with AI-powered guidance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-in-up animation-delay-400 px-4">
            <Button
              size="lg"
              onClick={() => navigate("/exams")}
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-variant hover:from-primary/90 hover:to-primary-variant/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Start Exam
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/auth")}
              className="w-full sm:w-auto border-2 border-primary/30 hover:border-primary hover:bg-primary/5 px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg font-semibold transition-all"
            >
              <PlayCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto animate-fade-in-up animation-delay-600 px-4">
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur rounded-lg p-3 sm:p-4 border border-white/20">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-ethiopian-green flex-shrink-0" />
              <div className="text-left">
                <div className="font-bold text-base sm:text-lg text-foreground">50,000+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Active Students</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur rounded-lg p-3 sm:p-4 border border-white/20">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-ethiopian-yellow flex-shrink-0" />
              <div className="text-left">
                <div className="font-bold text-base sm:text-lg text-foreground">99.9%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Secure Platform</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur rounded-lg p-3 sm:p-4 border border-white/20">
              <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-ethiopian-red flex-shrink-0" />
              <div className="text-left">
                <div className="font-bold text-base sm:text-lg text-foreground">24/7</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-ethiopian-green/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-ethiopian-yellow/20 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-ethiopian-red/20 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
    </section>
  );
};

export default EthiopianHero;