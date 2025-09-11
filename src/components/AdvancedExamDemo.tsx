import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Flag, 
  Lightbulb, 
  Brain,
  Target,
  TrendingUp,
  Award
} from "lucide-react";

type QuestionStatus = 'current' | 'answered' | 'unanswered' | 'flagged';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  subject: string;
  explanation?: string;
  hint?: string;
}

const AdvancedExamDemo = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes
  const [showResults, setShowResults] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [examMode, setExamMode] = useState<'practice' | 'exam'>('practice');

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the derivative of f(x) = x³ + 2x² - 5x + 3?",
      options: [
        "3x² + 4x - 5",
        "x³ + 4x - 5", 
        "3x² + 2x - 5",
        "3x³ + 4x² - 5x"
      ],
      correct: 0,
      difficulty: 'Medium',
      subject: 'Calculus',
      hint: "Remember the power rule: d/dx(xⁿ) = n·xⁿ⁻¹",
      explanation: "Using the power rule for each term: d/dx(x³) = 3x², d/dx(2x²) = 4x, d/dx(-5x) = -5, d/dx(3) = 0"
    },
    {
      id: 2,
      question: "The weather outside was extremely pleasant and hence we decided to ______.",
      options: [
        "employ this rare opportunity for writing letters",
        "enjoy a morning ride in the open",
        "refrain from going out for a morning walk",
        "utilize our time watching the television"
      ],
      correct: 1,
      difficulty: 'Easy',
      subject: 'English',
      hint: "Consider what activity would be most appropriate for pleasant weather.",
      explanation: "Pleasant weather suggests an outdoor activity would be most appropriate. Option B is the most logical response."
    },
    {
      id: 3,
      question: "Which of the following is NOT a principle of object-oriented programming?",
      options: [
        "Encapsulation",
        "Inheritance", 
        "Polymorphism",
        "Compilation"
      ],
      correct: 3,
      difficulty: 'Medium',
      subject: 'Computer Science',
      hint: "Think about the four main pillars of OOP vs programming processes.",
      explanation: "Compilation is a programming process, not an OOP principle. The main OOP principles are Encapsulation, Inheritance, Polymorphism, and Abstraction."
    },
    {
      id: 4,
      question: "What is the pH of a neutral solution at 25°C?",
      options: [
        "0",
        "7",
        "14", 
        "1"
      ],
      correct: 1,
      difficulty: 'Easy',
      subject: 'Chemistry',
      hint: "Neutral means equal concentration of H⁺ and OH⁻ ions.",
      explanation: "At 25°C, pure water has a pH of 7, which is considered neutral on the pH scale of 0-14."
    },
    {
      id: 5,
      question: "Which organelle is known as the 'powerhouse of the cell'?",
      options: [
        "Nucleus",
        "Ribosome",
        "Mitochondria",
        "Endoplasmic Reticulum"
      ],
      correct: 2,
      difficulty: 'Easy',
      subject: 'Biology',
      hint: "This organelle is responsible for producing ATP energy.",
      explanation: "Mitochondria produce ATP through cellular respiration, earning them the nickname 'powerhouse of the cell'."
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResults && examMode === 'exam') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showResults, examMode]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionStatus = (questionIndex: number): QuestionStatus => {
    if (questionIndex === currentQuestion) return 'current';
    if (flaggedQuestions.has(questionIndex)) return 'flagged';
    if (answers[questionIndex] !== undefined) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status: QuestionStatus) => {
    switch (status) {
      case 'current': return 'bg-current text-current-foreground';
      case 'answered': return 'bg-answered text-answered-foreground';
      case 'flagged': return 'bg-flagged text-flagged-foreground';
      default: return 'bg-muted text-muted-foreground hover:bg-muted/80';
    }
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    setShowHint(false);
    setShowExplanation(false);
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

  const navigateToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setShowHint(false);
    setShowExplanation(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowHint(false);
      setShowExplanation(false);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowHint(false);
      setShowExplanation(false);
    }
  };

  const submitExam = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer && parseInt(answer) === questions[index].correct) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const getAnsweredCount = () => answers.filter(a => a !== undefined).length;
  const getFlaggedCount = () => flaggedQuestions.size;

  if (showResults) {
    const score = calculateScore();
    const correctAnswers = answers.filter((answer, i) => answer && parseInt(answer) === questions[i].correct).length;
    
    return (
      <section id="exams" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-exam">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-success" />
                </div>
                <CardTitle className="text-3xl">Exam Completed!</CardTitle>
                <p className="text-muted-foreground">Here's your performance summary</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">{score.toFixed(0)}%</div>
                  <p className="text-xl text-muted-foreground">Overall Score</p>
                </div>
                
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <div className="text-3xl font-bold text-success">{correctAnswers}</div>
                    <p className="text-sm text-muted-foreground">Correct</p>
                  </div>
                  <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <div className="text-3xl font-bold text-destructive">
                      {answers.filter((answer, i) => answer && parseInt(answer) !== questions[i].correct).length}
                    </div>
                    <p className="text-sm text-muted-foreground">Incorrect</p>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg">
                    <div className="text-3xl font-bold text-warning">
                      {questions.length - getAnsweredCount()}
                    </div>
                    <p className="text-sm text-muted-foreground">Skipped</p>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-3xl font-bold text-primary">{getFlaggedCount()}</div>
                    <p className="text-sm text-muted-foreground">Flagged</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Subject Breakdown</h3>
                  {Array.from(new Set(questions.map(q => q.subject))).map(subject => {
                    const subjectQuestions = questions.filter(q => q.subject === subject);
                    const correctInSubject = subjectQuestions.filter((q, i) => {
                      const globalIndex = questions.indexOf(q);
                      return answers[globalIndex] && parseInt(answers[globalIndex]) === q.correct;
                    }).length;
                    const percentage = (correctInSubject / subjectQuestions.length) * 100;
                    
                    return (
                      <div key={subject} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">{subject}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {correctInSubject}/{subjectQuestions.length}
                          </span>
                          <div className="w-20 bg-background rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <Button onClick={() => {
                    setShowResults(false);
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setFlaggedQuestions(new Set());
                    setTimeLeft(5400);
                    setShowHint(false);
                    setShowExplanation(false);
                  }} className="flex-1">
                    Retake Exam
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Review Answers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <section id="exams" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Advanced Exam{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Try our comprehensive exam interface with AI assistance and advanced features
          </p>
          
          {/* Mode Toggle */}
          <div className="flex justify-center mb-8">
            <Tabs value={examMode} onValueChange={(value) => setExamMode(value as 'practice' | 'exam')}>
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="practice">Practice Mode</TabsTrigger>
                <TabsTrigger value="exam">Exam Mode</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                {/* Timer Card */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-warning" />
                      Time Left
                    </CardTitle>
                    <div className="text-2xl font-mono font-bold text-warning">
                      {examMode === 'exam' ? formatTime(timeLeft) : '∞'}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                      </div>
                      <Progress value={((currentQuestion + 1) / questions.length) * 100} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-answered">{getAnsweredCount()}</div>
                        <p className="text-muted-foreground">Answered</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-flagged">{getFlaggedCount()}</div>
                        <p className="text-muted-foreground">Flagged</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Question Navigator */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Question Navigator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                        <TabsTrigger value="stats" className="text-xs">Stats</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="all">
                        <div className="grid grid-cols-5 gap-2">
                          {questions.map((_, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              size="sm"
                              className={`h-8 w-8 p-0 text-xs ${getStatusColor(getQuestionStatus(index))}`}
                              onClick={() => navigateToQuestion(index)}
                            >
                              {index + 1}
                            </Button>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="stats" className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-current rounded-full"></div>
                            <span>Current</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-answered rounded-full"></div>
                            <span>Answered ({getAnsweredCount()})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-flagged rounded-full"></div>
                            <span>Flagged ({getFlaggedCount()})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-muted rounded-full"></div>
                            <span>Unanswered ({questions.length - getAnsweredCount()})</span>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="shadow-exam">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">
                        Question {currentQuestion + 1} of {questions.length}
                      </Badge>
                      <Badge 
                        variant={currentQ.difficulty === 'Easy' ? 'secondary' : 
                               currentQ.difficulty === 'Medium' ? 'default' : 'destructive'}
                      >
                        <Target className="w-3 h-3 mr-1" />
                        {currentQ.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {currentQ.subject}
                      </Badge>
                    </div>
                    <Button
                      variant={flaggedQuestions.has(currentQuestion) ? "default" : "outline"}
                      size="sm"
                      onClick={toggleFlag}
                    >
                      <Flag className="w-4 h-4 mr-1" />
                      Flag
                    </Button>
                  </div>
                  <CardTitle className="text-xl mt-4">
                    {currentQ.question}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={answers[currentQuestion] || ""}
                    onValueChange={handleAnswerChange}
                  >
                    {currentQ.options.map((option, index) => {
                      const isSelected = answers[currentQuestion] === index.toString();
                      const isCorrect = showExplanation && index === currentQ.correct;
                      const isIncorrect = showExplanation && isSelected && index !== currentQ.correct;
                      
                      return (
                        <div 
                          key={index} 
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 ${
                            isCorrect ? 'border-answered bg-answered/10' :
                            isIncorrect ? 'border-destructive bg-destructive/10' :
                            isSelected ? 'border-primary bg-primary/10' :
                            'border-border hover:border-primary/50 hover:bg-muted/50'
                          }`}
                        >
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-medium">
                            <span className="mr-3 text-muted-foreground">{String.fromCharCode(65 + index)}</span>
                            {option}
                          </Label>
                          {showExplanation && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-answered" />
                          )}
                        </div>
                      );
                    })}
                  </RadioGroup>

                  {/* Hint Section */}
                  {examMode === 'practice' && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowHint(!showHint)}
                          disabled={showExplanation}
                        >
                          <Lightbulb className="w-4 h-4 mr-1" />
                          {showHint ? 'Hide Hint' : 'Need a Hint?'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowExplanation(!showExplanation)}
                          disabled={!answers[currentQuestion]}
                        >
                          <Brain className="w-4 h-4 mr-1" />
                          Get AI Explanation
                        </Button>
                      </div>

                      {showHint && (
                        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="w-4 h-4 text-warning" />
                            <span className="font-semibold text-warning">Hint</span>
                          </div>
                          <p className="text-sm">{currentQ.hint}</p>
                        </div>
                      )}

                      {showExplanation && (
                        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-primary">Explanation</span>
                          </div>
                          <p className="text-sm">{currentQ.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={previousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>
                    
                    <div className="space-x-2">
                      {currentQuestion < questions.length - 1 ? (
                        <Button onClick={nextQuestion}>
                          Next
                        </Button>
                      ) : (
                        <Button onClick={submitExam} className="bg-success hover:bg-success/90">
                          Submit Exam
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedExamDemo;