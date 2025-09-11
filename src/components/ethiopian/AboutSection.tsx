import { Target, Heart, Users, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "Transparency",
      description: "Open, honest communication in all our processes and results"
    },
    {
      icon: Heart,
      title: "Security",
      description: "Protecting student data and ensuring exam integrity at all times"
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "Making quality education accessible to all Ethiopian students"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Continuously improving to provide the best educational experience"
    }
  ];

  const achievements = [
    { number: "50,000+", label: "Students Served" },
    { number: "500+", label: "Partner Schools" },
    { number: "95%", label: "Success Rate" },
    { number: "3", label: "Languages Supported" }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-foreground">Empowering Ethiopian </span>
                <span className="bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red bg-clip-text text-transparent">
                  Educational Excellence
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                In partnership with the Ethiopian Ministry of Education and leading institutions, 
                we're democratizing access to fair and reliable examinations across Ethiopia.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-ethiopian-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-4 w-4 text-ethiopian-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Our Mission</h4>
                  <p className="text-muted-foreground">
                    To provide every Ethiopian student with equal access to high-quality, 
                    secure, and fair examination opportunities that reflect global standards 
                    while respecting local educational contexts.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-ethiopian-yellow/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-4 w-4 text-ethiopian-yellow" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Our Vision</h4>
                  <p className="text-muted-foreground">
                    To become the leading educational technology platform in East Africa, 
                    recognized for innovation, security, and positive impact on student outcomes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-ethiopian-red/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-4 w-4 text-ethiopian-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Our Impact</h4>
                  <p className="text-muted-foreground">
                    Since our launch, we've helped thousands of students achieve their 
                    academic goals while providing educators with powerful tools to 
                    assess and support student learning.
                  </p>
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-gradient-to-r from-primary to-primary-variant hover:from-primary/90 hover:to-primary-variant/90">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Right Column - Statistics */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center p-6 bg-gradient-to-br from-card to-card/80 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <CardContent className="p-0">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {achievement.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Our Core Values</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape our commitment to Ethiopian education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="group text-center p-6 bg-gradient-to-b from-card to-card/80 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <CardContent className="p-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;