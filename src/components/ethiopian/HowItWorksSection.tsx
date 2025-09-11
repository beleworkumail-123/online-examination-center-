import { UserPlus, BookOpen, PenTool, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your free account with basic information. Verify your identity for secure access.",
      details: ["Quick registration process", "Email verification", "Profile setup", "Access preferences"],
      color: "ethiopian-green",
      step: "01"
    },
    {
      icon: BookOpen,
      title: "Choose Exam",
      description: "Browse available exams by grade level, subject, or exam type. Filter by your needs.",
      details: ["Grade-specific exams", "Subject categorization", "Difficulty levels", "Practice & real modes"],
      color: "ethiopian-yellow",
      step: "02"
    },
    {
      icon: PenTool,
      title: "Take Test",
      description: "Experience secure, proctored examinations with real-time support and guidance.",
      details: ["Secure environment", "AI proctoring", "Real-time help", "Auto-save progress"],
      color: "ethiopian-red",
      step: "03"
    },
    {
      icon: TrendingUp,
      title: "Get Results",
      description: "Receive instant feedback, detailed analytics, and personalized recommendations.",
      details: ["Immediate scoring", "Performance analysis", "Improvement suggestions", "Progress tracking"],
      color: "primary",
      step: "04"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">How </span>
            <span className="bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red bg-clip-text text-transparent">
              EthioStudyHub
            </span>
            <span className="text-foreground"> Works</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our streamlined process makes it easy for students to access, take, and learn from examinations. 
            Follow these simple steps to start your educational journey.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connection Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-muted to-transparent transform translate-x-4 z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                )}

                <Card className="group relative z-10 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80 border-0 shadow-lg hover:scale-105">
                  <CardContent className="p-8 text-center">
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-primary to-primary-variant rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-${step.color}/10 to-${step.color}/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-10 w-10 text-${step.color}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center justify-center space-x-2 text-sm">
                          <div className={`w-2 h-2 rounded-full bg-${step.color} flex-shrink-0`}></div>
                          <span className="text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of Ethiopian students who have already improved their academic performance with our platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary-variant hover:from-primary/90 hover:to-primary-variant/90 px-8">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-primary/30 hover:border-primary hover:bg-primary/5 px-8">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;