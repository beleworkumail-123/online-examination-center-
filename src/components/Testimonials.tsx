import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "E-Exam transformed my study routine completely. The detailed analytics helped me identify my weak areas and the AI explanations made complex topics so much clearer. I passed my entrance exam with flying colors!",
      name: "Almaz Tadesse",
      exam: "Passed the 2024 University Entrance Exam",
      rating: 5,
      avatar: "AT"
    },
    {
      quote: "The practice questions were incredibly similar to the actual exam. The platform's tracking system helped me stay motivated and see my progress daily. I couldn't have done it without E-Exam!",
      name: "Daniel Kebede",
      exam: "Passed the 2024 Exit Exam - Engineering",
      rating: 5,
      avatar: "DK"
    },
    {
      quote: "As someone who struggled with time management, the timed practice sessions were a game-changer. The platform taught me how to pace myself properly during the actual exam.",
      name: "Sara Ahmed",
      exam: "Passed the 2024 Exit Exam - Medicine",
      rating: 5,
      avatar: "SA"
    },
    {
      quote: "The comprehensive question bank covered every topic I needed to study. The explanations for wrong answers helped me learn from my mistakes and avoid them in the future.",
      name: "Binyam Worku",
      exam: "Passed the 2024 NGAT Exam",
      rating: 5,
      avatar: "BW"
    },
    {
      quote: "E-Exam's mobile app allowed me to study anywhere, anytime. Whether I was on the bus or during lunch breaks, I could always squeeze in some practice questions.",
      name: "Hanan Mohammed",
      exam: "Passed the 2024 Work Exam - Public Sector",
      rating: 5,
      avatar: "HM"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Success{" "}
            <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who achieved their academic goals with E-Exam
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="bg-gradient-card border-0 shadow-floating overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start gap-6">
                {/* Quote Icon */}
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Quote className="w-8 h-8 text-primary" />
                </div>

                <div className="flex-1 space-y-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-lg">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-muted-foreground">
                        {testimonials[currentIndex].exam}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="rounded-full w-12 h-12"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="rounded-full w-12 h-12"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Additional Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials
            .filter((_, index) => index !== currentIndex)
            .slice(0, 3)
            .map((testimonial, index) => (
            <Card key={index} className="bg-background/50 border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.exam}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;