import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Brain, BarChart3, Users, Video, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/education-hero.jpg";
import { useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(217 91% 85% / 0.15) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-success/10 text-primary text-sm font-semibold border border-primary/20">
                <CheckCircle className="w-4 h-4 mr-2" />
                Trusted by 10,000+ Students Nationwide
              </div>
              
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                Ace Your Next Exam{" "}
                <span className="bg-gradient-to-r from-primary via-primary/90 to-success bg-clip-text text-transparent">
                  with Confidence
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Your all-in-one platform for Entrance, Exit, and Professional exam preparation. 
                Get AI-powered feedback, track your progress, and succeed.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Vast Question Bank</h3>
                  <p className="text-muted-foreground">Access thousands of practice questions for every exam type</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Performance Analytics</h3>
                  <p className="text-muted-foreground">Track your progress with detailed, real-time feedback</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-warning/20 to-warning/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Expert-Led Courses</h3>
                  <p className="text-muted-foreground">Learn from top instructors and comprehensive study materials</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="group bg-gradient-primary hover:opacity-90 shadow-lg text-lg px-8 py-4 h-auto"
                onClick={() => navigate('/entrance-exams')}
              >
                Explore Exams
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary/30 hover:bg-primary/5 text-lg px-8 py-4 h-auto"
                onClick={() => navigate('/entrance-exams')}
              >
                Get Started for Free
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Video */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-floating group">
              {!isVideoPlaying ? (
                <>
                  <img
                    src={heroImage}
                    alt="Students taking online exams with E-Exam platform"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="group/play w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300"
                    >
                      <Play className="w-8 h-8 text-primary ml-1 group-hover/play:scale-110 transition-transform" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Demo video would play here</p>
                    <button 
                      onClick={() => setIsVideoPlaying(false)}
                      className="mt-4 px-6 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      Close Video
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/20 to-success/20 rounded-3xl transform rotate-12 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-warning/20 to-primary/20 rounded-2xl transform -rotate-12" />
            
            {/* Stats Cards */}
            <div className="absolute -left-8 top-16 bg-background/95 backdrop-blur-sm border border-border/50 rounded-2xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Pass Rate</div>
            </div>
            
            <div className="absolute -right-8 bottom-24 bg-background/95 backdrop-blur-sm border border-border/50 rounded-2xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-success">50K+</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;