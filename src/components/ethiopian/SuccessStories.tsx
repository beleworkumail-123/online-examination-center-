import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star, GraduationCap, Award, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Meron Tadesse",
      role: "Medical Student",
      university: "Addis Ababa University",
      location: "Addis Ababa",
      image: "/lovable-uploads/65f59610-57c1-4bcf-b3d4-e622ee9af3db.png",
      quote: "EthioStudyHub made it easy for me to prepare for the Grade 12 exam. The AI-powered hints and detailed explanations helped me understand complex topics I was struggling with.",
      achievement: "Scored 95% in Mathematics",
      beforeScore: "78%",
      afterScore: "95%",
      examType: "University Entrance",
      rating: 5
    },
    {
      id: 2,
      name: "Daniel Bekele",
      role: "Engineering Student",
      university: "Bahir Dar Institute of Technology",
      location: "Bahir Dar",
      image: "/lovable-uploads/a369ba96-15a2-4195-a4e7-4905b4c30da5.png",
      quote: "The platform's practice mode with instant feedback was a game-changer. I could practice anytime, anywhere, even with limited internet connection in my rural area.",
      achievement: "Admitted to Top Engineering Program",
      beforeScore: "82%",
      afterScore: "92%",
      examType: "Engineering Entrance",
      rating: 5
    },
    {
      id: 3,
      name: "Sara Mohammed",
      role: "Teacher",
      university: "Haramaya University",
      location: "Harar",
      image: "/lovable-uploads/ddc0c422-d1bb-4aeb-8e0b-4df5259a03ec.png",
      quote: "As a teacher, I use EthioStudyHub to help my students prepare for national exams. The detailed analytics help me identify areas where students need more support.",
      achievement: "Teacher Certification Excellence",
      beforeScore: "85%",
      afterScore: "96%",
      examType: "Professional Certification",
      rating: 5
    },
    {
      id: 4,
      name: "Yohannes Gebre",
      role: "Business Graduate",
      university: "Mekelle University",
      location: "Mekelle",
      image: "/lovable-uploads/e2858cf7-4dda-42c8-8f86-a18481c6a646.png",
      quote: "The comprehensive question bank and real exam simulation gave me confidence. I felt fully prepared when I took my exit exam.",
      achievement: "First Class Honors",
      beforeScore: "79%",
      afterScore: "91%",
      examType: "Exit Exam",
      rating: 5
    }
  ];

  const stats = [
    { icon: GraduationCap, number: "50,000+", label: "Students Helped", color: "ethiopian-green" },
    { icon: Award, number: "95%", label: "Success Rate", color: "ethiopian-yellow" },
    { icon: TrendingUp, number: "+23%", label: "Average Improvement", color: "ethiopian-red" },
    { icon: Star, number: "4.9/5", label: "Student Rating", color: "primary" }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex] || testimonials[0];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Student </span>
            <span className="bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real stories from Ethiopian students who have achieved their academic goals with EthioStudyHub.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center p-6 bg-gradient-to-br from-card to-card/80 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-${stat.color}/10 to-${stat.color}/5 rounded-2xl flex items-center justify-center`}>
                    <Icon className={`h-8 w-8 text-${stat.color}`} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="overflow-hidden bg-gradient-to-br from-card to-card/80 border-0 shadow-xl">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side - Testimonial */}
                <div className="p-8 lg:p-12 relative">
                  <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/20" />
                  
                  <div className="space-y-6">
                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      {[...Array(currentTestimonial?.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-ethiopian-yellow text-ethiopian-yellow" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
                      "{currentTestimonial?.quote || 'Loading testimonial...'}"
                    </p>

                    {/* Achievement */}
                    <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="h-5 w-5 text-success" />
                        <span className="font-semibold text-success">Achievement</span>
                      </div>
                      <p className="text-foreground font-medium">{currentTestimonial?.achievement || 'Achievement loading...'}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Before: {currentTestimonial?.beforeScore || '0%'}</span>
                        <ArrowRight className="h-4 w-4" />
                        <span className="text-success font-medium">After: {currentTestimonial?.afterScore || '0%'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Profile */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="text-center space-y-6">
                    {/* Avatar */}
                    <Avatar className="w-24 h-24 mx-auto ring-4 ring-primary/20">
                      <AvatarImage src={currentTestimonial?.image} alt={currentTestimonial?.name || 'Student'} />
                      <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary to-primary-variant text-white">
                        {currentTestimonial?.name ? currentTestimonial.name.split(' ').map(n => n[0]).join('') : 'S'}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                        {currentTestimonial?.name || 'Student Name'}
                      </h3>
                      <p className="text-primary font-medium mb-1">{currentTestimonial?.role || 'Student'}</p>
                      <p className="text-sm text-muted-foreground mb-2">{currentTestimonial?.university || 'University'}</p>
                      <p className="text-sm text-muted-foreground">{currentTestimonial?.location || 'Location'}</p>
                    </div>

                    {/* Exam Type Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                      <span className="text-sm font-medium text-primary">{currentTestimonial?.examType || 'Exam'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full h-12 w-12 border-2 border-primary/20 hover:border-primary hover:bg-primary/5"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-primary scale-125" 
                      : "bg-primary/20 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon" 
              onClick={nextTestimonial}
              className="rounded-full h-12 w-12 border-2 border-primary/20 hover:border-primary hover:bg-primary/5"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;