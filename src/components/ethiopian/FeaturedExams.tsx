import { useState } from "react";
import { Calendar, Users, Clock, ArrowRight, Filter, BookOpen, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const FeaturedExams = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  const filters = [
    { id: "all", label: "All Exams", icon: BookOpen },
    { id: "entrance", label: "Entrance", icon: GraduationCap },
    { id: "exit", label: "Exit", icon: Briefcase },
    { id: "professional", label: "Professional", icon: Users }
  ];

  const exams = [
    {
      id: 1,
      title: "Grade 12 University Entrance",
      subject: "Mathematics",
      type: "entrance",
      year: "2024",
      date: "Available Now",
      participants: "12,450",
      duration: "3 hours",
      difficulty: "Advanced",
      description: "Comprehensive mathematics exam for university entrance preparation.",
      status: "Open",
      color: "ethiopian-green"
    },
    {
      id: 2,
      title: "Grade 10 National Exam",
      subject: "Biology",
      type: "entrance",
      year: "2024",
      date: "Jan 15, 2025",
      participants: "8,920",
      duration: "2.5 hours",
      difficulty: "Intermediate",
      description: "Biology assessment for Grade 10 students nationwide.",
      status: "Coming Soon",
      color: "ethiopian-yellow"
    },
    {
      id: 3,
      title: "Engineering Exit Exam",
      subject: "Civil Engineering",
      type: "exit",
      year: "2024",
      date: "Available Now",
      participants: "3,200",
      duration: "4 hours",
      difficulty: "Expert",
      description: "Professional certification exam for civil engineering graduates.",
      status: "Open",
      color: "ethiopian-red"
    },
    {
      id: 4,
      title: "Teacher Certification",
      subject: "Education",
      type: "professional",
      year: "2024",
      date: "Feb 20, 2025",
      participants: "5,670",
      duration: "2 hours",
      difficulty: "Intermediate",
      description: "Professional certification for Ethiopian teachers.",
      status: "Registration Open",
      color: "primary"
    },
    {
      id: 5,
      title: "Medical School Entrance",
      subject: "Chemistry",
      type: "entrance",
      year: "2024",
      date: "Available Now",
      participants: "15,890",
      duration: "3.5 hours",
      difficulty: "Advanced",
      description: "Chemistry entrance exam for medical school aspirants.",
      status: "Open",
      color: "success"
    },
    {
      id: 6,
      title: "Business Administration Exit",
      subject: "Business",
      type: "exit",
      year: "2024",
      date: "Mar 10, 2025",
      participants: "2,340",
      duration: "3 hours",
      difficulty: "Advanced",
      description: "Final assessment for business administration students.",
      status: "Coming Soon",
      color: "warning"
    }
  ];

  const filteredExams = activeFilter === "all" 
    ? exams 
    : exams.filter(exam => exam.type === activeFilter);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success/10 text-success border-success/20";
      case "Intermediate": return "bg-warning/10 text-warning border-warning/20";
      case "Advanced": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Expert": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-success/10 text-success border-success/20";
      case "Coming Soon": return "bg-warning/10 text-warning border-warning/20";
      case "Registration Open": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Featured </span>
            <span className="bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red bg-clip-text text-transparent">
              Examinations
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive collection of exams designed for Ethiopian students at all levels.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 ${
                  activeFilter === filter.id 
                    ? "bg-gradient-to-r from-primary to-primary-variant" 
                    : "hover:bg-primary/5 hover:border-primary/30"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{filter.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80 border-0 shadow-lg hover:scale-105 overflow-hidden">
              <CardContent className="p-0">
                {/* Header */}
                <div className={`p-6 bg-gradient-to-br from-${exam.color}/10 to-${exam.color}/5 border-b border-${exam.color}/20`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {exam.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{exam.subject} • {exam.year}</p>
                    </div>
                    <Badge className={getStatusColor(exam.status)}>
                      {exam.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exam.description}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{exam.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{exam.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{exam.participants} enrolled</span>
                    </div>
                    <div className="flex items-center justify-end">
                      <Badge className={getDifficultyColor(exam.difficulty)}>
                        {exam.difficulty}
                      </Badge>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary-variant hover:from-primary/90 hover:to-primary-variant/90"
                    onClick={() => navigate(`/exams/${exam.type}/${exam.subject.toLowerCase()}`)}
                  >
                    {exam.status === "Open" ? "Start Exam" : "Learn More"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate("/exams")}
            className="border-2 border-primary/30 hover:border-primary hover:bg-primary/5 px-8"
          >
            <Filter className="mr-2 h-5 w-5" />
            View All Exams
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedExams;