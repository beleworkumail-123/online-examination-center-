import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Brain, 
  Clock, 
  FileText, 
  PieChart, 
  Shield, 
  Smartphone, 
  Users,
  Zap
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: "Smart Time Management",
      description: "Optimize your study schedule with intelligent planning tools that adapt to your learning pace and exam deadlines.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security while ensuring 99.9% uptime for uninterrupted learning.",
      color: "text-success"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Study anywhere, anytime with our responsive platform that works seamlessly across all devices and platforms.",
      color: "text-warning"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              E-Exam?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the powerful features that make our platform the preferred choice 
            for students and professionals nationwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 bg-gradient-card border-0 text-center p-8">
              <CardHeader className="pb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-current/20 to-current/10 flex items-center justify-center mb-6 mx-auto ${feature.color}`}>
                  <feature.icon className={`w-10 h-10 ${feature.color}`} />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors leading-tight">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;