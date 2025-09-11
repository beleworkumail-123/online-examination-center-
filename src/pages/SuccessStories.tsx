import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Play, ArrowRight, Quote, Trophy, BookOpen, Target } from "lucide-react";
import EthiopianHeader from "@/components/ethiopian/EthiopianHeader";
import Footer from "@/components/Footer";

const SuccessStories = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  const featuredStories = [
    {
      id: 1,
      name: "Almaz Tadesse",
      exam: "Passed the 2024 University Entrance Exam",
      achievement: "Scored 92% - Top 5% Nationally",
      quote: "E-Exam transformed my study routine completely. The detailed analytics helped me identify my weak areas and the AI explanations made complex topics so much clearer. I passed my entrance exam with flying colors!",
      avatar: "AT",
      image: "🎓",
      video: true,
      fullStory: {
        background: "Coming from a rural area with limited educational resources, Almaz faced significant challenges preparing for the university entrance exam.",
        challenge: "Limited access to quality study materials and no experience with standardized testing formats.",
        solution: "Used E-Exam's personalized study plans and practice tests to build confidence and knowledge systematically.",
        result: "Secured admission to Addis Ababa University's Medical Program with a 92% score.",
        advice: "Start early and trust the process. The platform's analytics really helped me focus on what mattered most."
      }
    },
    {
      id: 2,
      name: "Daniel Kebede",
      exam: "Passed the 2024 Exit Exam - Engineering",
      achievement: "Top 10% in Engineering Cohort",
      quote: "The practice questions were incredibly similar to the actual exam. The platform's tracking system helped me stay motivated and see my progress daily. I couldn't have done it without E-Exam!",
      avatar: "DK",
      image: "⚙️",
      video: false,
      fullStory: {
        background: "A final-year engineering student who struggled with comprehensive exam preparation while managing coursework.",
        challenge: "Balancing final year projects with intensive exam preparation and managing study time effectively.",
        solution: "Leveraged E-Exam's mobile app to study during commutes and used the spaced repetition system.",
        result: "Passed with distinction and secured a position at a leading engineering firm.",
        advice: "Use every spare moment to practice. The mobile app made it possible to study anywhere, anytime."
      }
    },
    {
      id: 3,
      name: "Sara Ahmed",
      exam: "Passed the 2024 Exit Exam - Medicine",
      achievement: "Achieved 95% Success Rate",
      quote: "As someone who struggled with time management, the timed practice sessions were a game-changer. The platform taught me how to pace myself properly during the actual exam.",
      avatar: "SA",
      image: "🏥",
      video: true,
      fullStory: {
        background: "Medical student with excellent academic knowledge but poor test-taking strategies and time management.",
        challenge: "Anxiety during timed exams and difficulty prioritizing questions under pressure.",
        solution: "Focused on E-Exam's timed practice sessions and used the test-taking strategy guides.",
        result: "Overcame test anxiety and achieved one of the highest scores in her medical school cohort.",
        advice: "Practice under timed conditions religiously. It's not just about knowing the material, but knowing how to apply it quickly."
      }
    }
  ];

  const allStories = [
    ...featuredStories,
    {
      id: 4,
      name: "Binyam Worku",
      exam: "Passed the 2024 NGAT Exam",
      achievement: "Secured Graduate School Admission",
      quote: "The comprehensive question bank covered every topic I needed to study. The explanations for wrong answers helped me learn from my mistakes.",
      avatar: "BW",
      image: "📚"
    },
    {
      id: 5,
      name: "Hanan Mohammed",
      exam: "Passed the 2024 Work Exam - Public Sector",
      achievement: "Government Position Secured",
      quote: "E-Exam's mobile app allowed me to study anywhere, anytime. Whether I was on the bus or during lunch breaks, I could always practice.",
      avatar: "HM",
      image: "💼"
    },
    {
      id: 6,
      name: "Tekle Berhe",
      exam: "Passed the 2024 Teaching Certification",
      achievement: "Ministry of Education Certification",
      quote: "The curriculum alignment was perfect. Every practice question felt relevant to my actual teaching certification exam.",
      avatar: "TB",
      image: "📖"
    },
    {
      id: 7,
      name: "Meron Assefa",
      exam: "Passed the 2024 Banking Certification",
      achievement: "Financial Sector Career Launch",
      quote: "The detailed performance analytics helped me track my improvement and stay motivated throughout my preparation.",
      avatar: "MA",
      image: "🏦"
    },
    {
      id: 8,
      name: "Yohannes Teshome",
      exam: "Passed the 2024 Legal Bar Exam",
      achievement: "Licensed to Practice Law",
      quote: "The case study practice and legal reasoning questions were exactly what I needed to prepare for the bar exam.",
      avatar: "YT",
      image: "⚖️"
    }
  ];

  const stats = [
    { icon: Trophy, label: "Success Rate", value: "94%" },
    { icon: BookOpen, label: "Students Helped", value: "15K+" },
    { icon: Target, label: "Exams Covered", value: "25+" },
    { icon: Star, label: "Average Rating", value: "4.9/5" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <EthiopianHeader />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Your Future Success Story Starts Here
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Read how E-Exam helped real students and professionals achieve their goals
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <IconComponent className="w-8 h-8 mx-auto mb-2 text-white/90" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Success Stories Carousel */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Featured Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Inspiring journeys from students who achieved their dreams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredStories.map((story, index) => (
              <Card key={story.id} className="bg-gradient-card border-0 shadow-floating hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardContent className="p-0">
                  {/* Story Image/Icon */}
                  <div className="h-48 bg-gradient-secondary flex items-center justify-center text-6xl relative">
                    {story.image}
                    {story.video && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {/* Quote */}
                    <div className="relative">
                      <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                      <p className="text-muted-foreground italic pl-6">
                        "{story.quote}"
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                        {story.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{story.name}</div>
                        <div className="text-sm text-muted-foreground">{story.exam}</div>
                      </div>
                    </div>

                    {/* Achievement Badge */}
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      {story.achievement}
                    </Badge>

                    {/* Read More Button */}
                    {story.fullStory && (
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedStory(story)}
                        className="w-full"
                      >
                        Read Full Story
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Success Stories Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              More Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our growing community of successful graduates and professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {allStories.slice(3).map((story, index) => (
              <Card key={story.id} className="bg-background/80 border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{story.image}</div>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {story.avatar}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {story.name}
                  </h3>
                  <div className="text-sm text-muted-foreground mb-3">
                    {story.exam}
                  </div>
                  <Badge variant="secondary" className="mb-4 text-xs">
                    {story.achievement}
                  </Badge>
                  <p className="text-sm text-muted-foreground italic">
                    "{story.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Write Your Own Success Story
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of students who transformed their futures with E-Exam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Play className="w-5 h-5 mr-2" />
                Watch Success Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story Detail Modal/Overlay would go here if selectedStory is not null */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{selectedStory.name}</h3>
                  <p className="text-muted-foreground">{selectedStory.exam}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedStory(null)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Background</h4>
                  <p className="text-muted-foreground">{selectedStory.fullStory.background}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Challenge</h4>
                  <p className="text-muted-foreground">{selectedStory.fullStory.challenge}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Solution</h4>
                  <p className="text-muted-foreground">{selectedStory.fullStory.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Result</h4>
                  <p className="text-muted-foreground">{selectedStory.fullStory.result}</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Advice to Others</h4>
                  <p className="text-muted-foreground italic">"{selectedStory.fullStory.advice}"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SuccessStories;