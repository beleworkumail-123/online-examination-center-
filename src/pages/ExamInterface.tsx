import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Menu, ArrowLeft, Home, Timer, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import EthiopianHeader from "@/components/ethiopian/EthiopianHeader";
import { Button } from "@/components/ui/button";
import { ExamHeader } from "@/components/exam/ExamHeader";
import { QuestionNavigationPanel } from "@/components/exam/QuestionNavigationPanel";
import { QuestionCard } from "@/components/exam/QuestionCard";
import { ExamResults } from "@/components/exam/ExamResults";

import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type QuestionStatus = 'current' | 'answered' | 'unanswered' | 'flagged';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  hint?: string;
  explanation?: string;
}

const ExamInterface = () => {
  const { type: urlType, subject: urlSubject, year: urlYear } = useParams();
  const navigate = useNavigate();
  
  // Use provided metadata or fallback to URL params
  const type = urlType || 'English';
  const subject = urlSubject || 'Mathematics';
  const year = urlYear || '2024';
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [showResults, setShowResults] = useState(false);
  const [isExamMode, setIsExamMode] = useState(false);
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(true);

  // Generate 100 questions - in a real app, this would come from an API based on subject, type, and year
  const generateQuestions = (): Question[] => {
    const subjects = ['Mathematics', 'English', 'Computer Science', 'Chemistry', 'Biology', 'Physics', 'History', 'Geography'];
    const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
    
    const questionTemplates = [
      {
        text: "What is the derivative of f(x) = x³ + 2x² - 5x + 3?",
        options: ["3x² + 4x - 5", "x³ + 4x - 5", "3x² + 2x - 5", "3x³ + 4x² - 5x"],
        correctAnswer: 0,
        hint: "Remember the power rule: d/dx(xⁿ) = n·xⁿ⁻¹",
        explanation: "Using the power rule for each term: d/dx(x³) = 3x², d/dx(2x²) = 4x, d/dx(-5x) = -5, d/dx(3) = 0"
      },
      {
        text: "The weather outside was extremely pleasant and hence we decided to _____.",
        options: ["employ this rare opportunity for writing letters", "enjoy a morning ride in the open", "refrain from going out for a morning walk", "utilize our time watching the television"],
        correctAnswer: 1,
        hint: "Think about what people typically do when the weather is pleasant.",
        explanation: "When the weather is pleasant, people usually go outside to enjoy it."
      },
      {
        text: "Which of the following is NOT a principle of object-oriented programming?",
        options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
        correctAnswer: 3,
        hint: "Think about the four main pillars of OOP vs programming processes.",
        explanation: "Compilation is a programming process, not an OOP principle."
      },
      {
        text: "What is the pH of a neutral solution at 25°C?",
        options: ["0", "7", "14", "1"],
        correctAnswer: 1,
        hint: "Neutral means equal concentration of H⁺ and OH⁻ ions.",
        explanation: "At 25°C, pure water has a pH of 7, which is considered neutral."
      },
      {
        text: "Which organelle is known as the 'powerhouse of the cell'?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
        correctAnswer: 2,
        hint: "This organelle is responsible for producing ATP energy.",
        explanation: "Mitochondria produce ATP through cellular respiration."
      },
      {
        text: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: 1,
        hint: "It's known as the City of Light.",
        explanation: "Paris is the capital and largest city of France."
      },
      {
        text: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        hint: "This planet appears reddish due to iron oxide on its surface.",
        explanation: "Mars is called the Red Planet because of its reddish appearance."
      },
      {
        text: "What is 15 × 8?",
        options: ["120", "125", "115", "130"],
        correctAnswer: 0,
        hint: "Break it down: 15 × 8 = (10 + 5) × 8",
        explanation: "15 × 8 = 120. You can calculate this as (10 × 8) + (5 × 8) = 80 + 40 = 120"
      },
      {
        text: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        correctAnswer: 1,
        hint: "This English playwright is often called the Bard.",
        explanation: "William Shakespeare wrote Romeo and Juliet, one of his most famous tragedies."
      },
      {
        text: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        hint: "The symbol comes from the Latin word 'aurum'.",
        explanation: "Au is the chemical symbol for gold, derived from the Latin word aurum."
      }
    ];
    
    const questions: Question[] = [];
    
    for (let i = 0; i < 100; i++) {
      const template = questionTemplates[i % questionTemplates.length];
      const subject = subjects[i % subjects.length];
      const difficulty = difficulties[i % difficulties.length];
      
      questions.push({
        id: i + 1,
        text: template.text,
        options: template.options,
        correctAnswer: template.correctAnswer,
        difficulty,
        subject,
        hint: template.hint,
        explanation: template.explanation
      });
    }
    
    return questions;
  };

  const questions = generateQuestions();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isExamMode && isStarted && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExamMode, isStarted, timeLeft, showResults]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionStatus = (questionIndex: number): QuestionStatus => {
    if (questionIndex === currentQuestion) return 'current';
    if (flaggedQuestions.has(questionIndex)) return 'flagged';
    if (answers[questionIndex] !== undefined) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status: QuestionStatus) => {
    switch (status) {
      case 'current': return 'bg-primary text-primary-foreground';
      case 'answered': return 'bg-success text-white';
      case 'flagged': return 'bg-destructive text-white';
      default: return 'bg-muted text-muted-foreground hover:bg-muted/80';
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: parseInt(value) });
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  const toggleFlagByIndex = (index: number) => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(index)) {
      newFlagged.delete(index);
    } else {
      newFlagged.add(index);
    }
    setFlaggedQuestions(newFlagged);
  };

  const navigateToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // If it's the last question, show results
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleTryAgain = () => {
    setShowResults(false);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(1800);
    setFlaggedQuestions(new Set());
    setIsStarted(false);
  };

  const handleStartExam = () => {
    setIsStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setFlaggedQuestions(new Set());
    if (isExamMode) {
      setTimeLeft(1800); // Reset timer for exam mode
    }
  };

  const handleToggleMode = () => {
    const newExamMode = !isExamMode;
    setIsExamMode(newExamMode);
    if (newExamMode) {
      // Switching to exam mode - reset timer to 30 minutes
      setTimeLeft(1800);
    }
    // When switching to practice mode, timer will automatically stop due to useEffect condition
  };

  const handleNativeBack = () => {
    navigate(-1); // Browser's native back functionality
  };

  const getSubjectDisplayName = () => {
    if (!subject) return "Subject";
    return subject.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ').replace('And', '&');
  };


  if (showResults) {
    return (
      <div className="min-h-screen flex flex-col">
        <EthiopianHeader />
        <div className="flex-1">
          <ExamResults
            questions={questions}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            subject={subject || ''}
            type={type || ''}
            year={year || ''}
            mode={isExamMode ? "formal" : "practice"}
            onReturnHome={handleReturnHome}
            onTryAgain={handleTryAgain}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/10">
      {/* Website Header */}
      <EthiopianHeader />
      
      {/* Main Content Container with top padding for fixed header */}
      <div className="flex-1 pt-5">
        {/* Mode Toggle Bar */}
        <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-20 z-40">
          <div className="container mx-auto px-2 py-2 pt-1">
            <div className="flex items-center justify-between">
              {/* Breadcrumb Navigation */}
              <Breadcrumb>
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
                      onClick={() => navigate(type === 'entrance' ? '/entrance-exams' : '/exit-exams')} 
                      className="cursor-pointer"
                    >
                      {type === 'entrance' ? 'Entrance Exams' : 'Exit Exams'}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      onClick={() => navigate(`/exams/${type}/${subject}`)} 
                      className="cursor-pointer"
                    >
                      {getSubjectDisplayName()}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{year}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              
              <div className="flex items-center gap-3">
                {/* Timer for Exam Mode - Desktop */}
                {isExamMode && (
                  <div className="hidden md:flex items-center gap-2 px-2">
                     <Timer className="w-4 h-4 text-destructive" />
                     <span className="font-mono text-base font-bold text-destructive">
                       {formatTime(timeLeft)}
                     </span>
                  </div>
                )}
                
                {/* Compact Mode Toggle */}
                <Button
                  variant="default"
                  size="default"
                  onClick={handleToggleMode}
                  className="h-9 px-3 text-sm font-semibold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 border border-transparent"
                >
                  {isExamMode ? 'Exam' : 'Practice'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Interface Content */}
        <div className="flex justify-center items-center min-h-[calc(100vh-180px)] px-4 py-2 relative">

          <div className="w-full max-w-7xl">
            <div className="flex gap-4 lg:gap-8 h-[calc(100vh-180px)]">
              {/* Desktop Navigation Panel */}
              {!isNavigationCollapsed && (
                <>
                  <div className="hidden lg:block flex-none w-80">
                <div className="bg-card rounded-xl border border-border/50 shadow-lg h-[calc(100%+1rem)] min-h-0">
                  <QuestionNavigationPanel
                        questions={questions}
                        currentQuestion={currentQuestion}
                        answers={answers}
                        flaggedQuestions={flaggedQuestions}
                        onQuestionSelect={navigateToQuestion}
                        onToggleFlag={toggleFlagByIndex}
                        isCollapsed={isNavigationCollapsed}
                        onToggleCollapse={() => setIsNavigationCollapsed(true)}
                        examType={type}
                        examSubject={subject}
                        examYear={year}
                        isExamMode={isExamMode}
                      />
                    </div>
                  </div>

                  {/* Separator Space - Desktop Only */}
                  <div className="hidden lg:block w-8 flex items-center justify-center">
                    <div className="w-px bg-border/30 h-full"></div>
                  </div>
                </>
              )}

              {/* Question Card Section */}
              <div className="flex-1 min-w-0">
                <div className="bg-card rounded-xl border border-border/50 shadow-lg h-[calc(100%+1rem)] min-h-0 overflow-hidden">
                  <QuestionCard
                    question={questions[currentQuestion]}
                    currentQuestion={currentQuestion}
                    totalQuestions={questions.length}
                    selectedAnswer={answers[currentQuestion]}
                    isFlagged={flaggedQuestions.has(currentQuestion)}
                    isExamMode={isExamMode}
                    isNavigationCollapsed={isNavigationCollapsed}
                    allAnswers={answers}
                    timeLeft={timeLeft}
                    onAnswerChange={handleAnswerChange}
                    onToggleFlag={(index) => index !== undefined ? toggleFlagByIndex(index) : toggleFlag()}
                    onToggleMode={handleToggleMode}
                    onNext={nextQuestion}
                    onPrevious={previousQuestion}
                    canGoPrevious={currentQuestion > 0}
                    canGoNext={currentQuestion < questions.length - 1}
                    onShowNavigation={() => setIsMobileNavOpen(true)}
                    onExpandNavigation={() => setIsNavigationCollapsed(false)}
                    onNavigateToQuestion={navigateToQuestion}
                    questionStates={questions.map((_, index) => ({
                      answered: answers[index] !== undefined,
                      flagged: flaggedQuestions.has(index)
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation Sheet & Collapsed State Handler */}
          <QuestionNavigationPanel
            questions={questions}
            currentQuestion={currentQuestion}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            onQuestionSelect={navigateToQuestion}
            onToggleFlag={toggleFlagByIndex}
            isCollapsed={true}
            onToggleCollapse={() => setIsNavigationCollapsed(!isNavigationCollapsed)}
            examType={type}
            examSubject={subject}
            examYear={year}
            isExamMode={isExamMode}
            mobileSheetOpen={isMobileNavOpen}
            onMobileSheetOpenChange={setIsMobileNavOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamInterface;