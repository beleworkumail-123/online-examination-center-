import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { 
  BookOpen, 
  Calculator, 
  Atom, 
  Globe, 
  Languages, 
  Users,
  FlaskConical,
  TrendingUp,
  Clock
} from "lucide-react";
import { useState } from "react";
import EthiopianHeader from "@/components/ethiopian/EthiopianHeader";
import Footer from "@/components/Footer";
import SubjectCard from "@/components/exam/SubjectCard";
import PersonalizedRecommendations from "@/components/exam/PersonalizedRecommendations";
import SmartSearchFilter from "@/components/exam/SmartSearchFilter";

const UniversityEntranceExams = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const subjects = [
    {
      name: "Aptitude Test",
      description: "Enhance your logical reasoning, problem-solving, and analytical thinking abilities."
    },
    {
      name: "Biology",
      description: "Study life sciences including cell biology, genetics, ecology, and human anatomy."
    },
    {
      name: "Chemistry",
      description: "Explore chemical reactions, atomic theory, and organic/inorganic chemistry."
    },
    {
      name: "Civics & Ethical Education",
      description: "Learn about citizenship, democracy, ethics, and civic responsibilities."
    },
    {
      name: "Economics",
      description: "Study micro and macroeconomics, market systems, and economic policies."
    },
    {
      name: "English",
      description: "Practice English language entrance exam questions covering grammar, vocabulary, and comprehension."
    },
    {
      name: "Geography",
      description: "Learn about physical geography, human geography, and environmental studies."
    },
    {
      name: "History",
      description: "Explore Ethiopian and world history, civilizations, and historical events."
    },
    {
      name: "Mathematics for Natural Sciences",
      description: "Test your skills in algebra, geometry, calculus, and other mathematical concepts."
    },
    {
      name: "Mathematics for Social Sciences",
      description: "Practice math questions for social sciences, including statistics, probability, and data analysis."
    },
    {
      name: "Physics",
      description: "Master mechanics, electromagnetism, optics, and modern physics concepts."
    }
  ];

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubjectClick = (subjectName: string) => {
    const urlName = subjectName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
    navigate(`/exams/entrance/${urlName}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <EthiopianHeader />
      <div className="container mx-auto px-2 py-2 pt-1">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-6 pt-7 pb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={() => navigate('/')} 
                className="cursor-pointer"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Entrance Exams</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>


        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">University Entrance Exams</h1>
          <p className="text-lg text-muted-foreground">
            Select your subject to start practicing
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search subjects..."
              className="w-full px-4 py-3 pl-10 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Subject Cards Grid */}
        {filteredSubjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 animate-fade-in">
            {filteredSubjects.map((subject, index) => (
              <div 
                key={index}
                onClick={() => handleSubjectClick(subject.name)}
                className="p-6 border border-border rounded-lg bg-card hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary/20 hover:scale-105"
              >
                <h3 className="font-semibold text-foreground mb-2">{subject.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {subject.description}
                </p>
              </div>
            ))}
          </div>
        ) : searchQuery && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-lg text-muted-foreground">
              Subject does not exist. Please try again.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UniversityEntranceExams;