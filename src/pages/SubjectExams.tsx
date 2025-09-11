import { useParams, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { useState } from "react";
import EthiopianHeader from "@/components/ethiopian/EthiopianHeader";
import Footer from "@/components/Footer";
import ExamStartDialog from "@/components/ExamStartDialog";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const SubjectExams = () => {
  const { type, subject } = useParams();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample years - including 2017
  const examYears = [
    { year: 2014, type: type === 'entrance' ? 'Entrance Exam' : 'Exit Exam' },
    { year: 2015, type: type === 'entrance' ? 'Entrance Exam' : 'Exit Exam' },
    { year: 2016, type: type === 'entrance' ? 'Entrance Exam' : 'Exit Exam' },
    { year: 2017, type: type === 'entrance' ? 'Entrance Exam' : 'Exit Exam' }
  ];

  const getSubjectDisplayName = () => {
    if (!subject) return "Subject";
    return subject.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ').replace('And', '&');
  };

  const getBreadcrumbPath = () => {
    if (type === 'entrance') {
      return { path: '/entrance-exams', label: 'Entrance Exams' };
    } else {
      return { path: '/exit-exams', label: 'Exit Exams' };
    }
  };

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setIsDialogOpen(true);
  };

  const breadcrumbPath = getBreadcrumbPath();

  return (
    <div className="min-h-screen bg-background">
      <EthiopianHeader />
      <div className="container mx-auto px-2 py-2 pt-1">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-8 pt-7 pb-1">
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
              <BreadcrumbLink 
                onClick={() => navigate(breadcrumbPath.path)} 
                className="cursor-pointer"
              >
                {breadcrumbPath.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{getSubjectDisplayName()}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-primary">{getSubjectDisplayName()}</span>{" "}
            <span className="text-foreground">{type === 'entrance' ? 'Entrance' : 'Exit'} Exam</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Select a year to start your exam practice
          </p>
        </div>

        {/* Year Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {examYears.map((examYear, index) => (
            <div 
              key={index}
              onClick={() => handleYearClick(examYear.year)}
              className="p-8 border border-border rounded-lg bg-card hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-primary/30 text-center"
            >
              <h2 className="text-3xl font-bold text-foreground mb-2">{examYear.year}</h2>
              <p className="text-muted-foreground">{examYear.type}</p>
            </div>
          ))}
        </div>

        {/* Exam Start Dialog */}
        {selectedYear && (
          <ExamStartDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            examTitle={getSubjectDisplayName()}
            year={selectedYear}
            examType={type}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SubjectExams;