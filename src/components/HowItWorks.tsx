import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Target, Rocket } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description: "Sign up in seconds and choose your plan",
      step: "01"
    },
    {
      icon: Target,
      title: "Select Your Exam",
      description: "Pick from our wide range of available exams",
      step: "02"
    },
    {
      icon: Rocket,
      title: "Practice & Succeed",
      description: "Start learning, take mock tests, and achieve your goals",
      step: "03"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in just three simple steps and begin your journey to exam success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="text-center p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0 relative overflow-hidden">
                {/* Step Number */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">{step.step}</span>
                </div>

                <CardContent className="space-y-6 pt-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;