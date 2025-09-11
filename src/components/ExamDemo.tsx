import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, AlertCircle, Lightbulb, Info, Flag, Check } from "lucide-react";

const ExamDemo = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [showResults, setShowResults] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>([]);
  const [questionTransition, setQuestionTransition] = useState(true);

  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of React's useEffect hook?",
      options: [
        "To manage component state",
        "To handle side effects in functional components",
        "To render JSX elements",
        "To create custom hooks"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Which of the following is NOT a principle of object-oriented programming?",
      options: [
        "Encapsulation",
        "Inheritance",
        "Polymorphism",
        "Compilation"
      ],
      correct: 3
    },
    {
      id: 3,
      question: "What does SQL stand for?",
      options: [
        "Simple Query Language",
        "Structured Query Language",
        "Standard Query Language",
        "System Query Language"
      ],
      correct: 1
    }
  ];

  useEffect(() => {
    setFlaggedQuestions(new Array(questions.length).fill(false));
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setQuestionTransition(false);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setQuestionTransition(true);
      }, 150);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setQuestionTransition(false);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setQuestionTransition(true);
      }, 150);
    }
  };

  const toggleFlag = () => {
    const newFlagged = [...flaggedQuestions];
    newFlagged[currentQuestion] = !newFlagged[currentQuestion];
    setFlaggedQuestions(newFlagged);
  };

  const goToQuestion = (index: number) => {
    if (index !== currentQuestion) {
      setQuestionTransition(false);
      setTimeout(() => {
        setCurrentQuestion(index);
        setQuestionTransition(true);
      }, 150);
    }
  };

  const submitExam = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (parseInt(answer) === questions[index].correct) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const getQuestionStatus = (index: number) => {
    if (flaggedQuestions[index]) return 'flagged';
    if (answers[index]) return 'answered';
    return 'unanswered';
  };

  const getQuestionButtonVariant = (index: number) => {
    if (currentQuestion === index) return 'default';
    const status = getQuestionStatus(index);
    if (status === 'answered') return 'outline';
    return 'ghost';
  };

  const getQuestionButtonClass = (index: number) => {
    const status = getQuestionStatus(index);
    let baseClass = 'h-12 w-12 text-base font-semibold transition-all duration-200 ';
    
    if (currentQuestion === index) {
      baseClass += 'bg-current text-current-foreground animate-bounce-subtle ';
    } else if (status === 'answered') {
      baseClass += 'bg-answered/10 text-answered border-answered/30 hover:bg-answered/20 ';
    } else if (status === 'flagged') {
      baseClass += 'bg-flagged/10 text-flagged border-flagged/30 hover:bg-flagged/20 ';
    }
    
    return baseClass;
  };

  const areAllQuestionsAnswered = () => {
    return questions.every((_, index) => answers[index] && answers[index] !== "");
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <section id="exams" className="py-20 bg-gradient-floating">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-exam animate-fade-in-up">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <CardTitle className="text-3xl font-bold">Exam Completed!</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div>
                  <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                    {score.toFixed(0)}%
                  </div>
                  <p className="text-lg text-muted-foreground">Your Score</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-success/5 rounded-lg">
                    <div className="text-3xl font-semibold text-success">
                      {answers.filter((answer, i) => parseInt(answer) === questions[i].correct).length}
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Correct</p>
                  </div>
                  <div className="text-center p-4 bg-destructive/5 rounded-lg">
                    <div className="text-3xl font-semibold text-destructive">
                      {answers.filter((answer, i) => answer && parseInt(answer) !== questions[i].correct).length}
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Incorrect</p>
                  </div>
                  <div className="text-center p-4 bg-warning/5 rounded-lg">
                    <div className="text-3xl font-semibold text-warning">
                      {questions.length - answers.filter(a => a).length}
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Skipped</p>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    setShowResults(false);
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setTimeLeft(900);
                    setFlaggedQuestions(new Array(questions.length).fill(false));
                  }} 
                  className="w-full h-12 text-lg"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section id="exams" className="py-20 bg-gradient-floating">
      <div className="container mx-auto px-4">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-background rounded-full p-1 shadow-elegant">
            <Progress 
              value={progressPercentage} 
              className="h-3 progress-bar-glow"
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Experience Our{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Exam Interface
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Try our interactive demo to see how smooth and intuitive our exam platform is
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Enhanced Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 bg-sidebar border-sidebar-border">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-sidebar-foreground">
                    <Clock className="w-5 h-5 text-warning" />
                    Time Left
                  </CardTitle>
                  <div className="text-3xl font-mono font-bold text-warning">
                    {formatTime(timeLeft)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-3 text-sidebar-foreground">
                      <span className="font-medium">Progress</span>
                      <span className="font-semibold">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base text-sidebar-foreground">Questions</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {questions.map((_, index) => {
                        const status = getQuestionStatus(index);
                        return (
                          <div key={index} className="relative">
                            <Button
                              variant={getQuestionButtonVariant(index)}
                              className={getQuestionButtonClass(index)}
                              onClick={() => goToQuestion(index)}
                            >
                              {index + 1}
                              {status === 'answered' && currentQuestion !== index && (
                                <Check className="absolute -top-1 -right-1 w-4 h-4 text-answered bg-background rounded-full p-0.5" />
                              )}
                              {status === 'flagged' && currentQuestion !== index && (
                                <Flag className="absolute -top-1 -right-1 w-4 h-4 text-flagged bg-background rounded-full p-0.5" />
                              )}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Legend */}
                    <div className="text-xs space-y-2 pt-2 border-t border-sidebar-border">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-answered"></div>
                        <span className="text-sidebar-foreground">Answered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-flagged"></div>
                        <span className="text-sidebar-foreground">Flagged</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-current"></div>
                        <span className="text-sidebar-foreground">Current</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Main Content */}
            <div className="lg:col-span-3">
              <Card className={`shadow-exam ${questionTransition ? 'question-transition' : ''}`}>
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      Question {currentQuestion + 1} of {questions.length}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Badge variant={timeLeft < 300 ? "destructive" : "secondary"} className="text-sm">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Demo Mode
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleFlag}
                        className={`p-2 ${flaggedQuestions[currentQuestion] ? 'text-flagged bg-flagged/10' : 'text-muted-foreground hover:text-flagged'}`}
                      >
                        <Flag className="w-5 h-5" fill={flaggedQuestions[currentQuestion] ? 'currentColor' : 'none'} />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold leading-tight text-foreground">
                    {questions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={answers[currentQuestion] || ""}
                    onValueChange={handleAnswerChange}
                    className="space-y-4"
                  >
                    {questions[currentQuestion].options.map((option, index) => {
                      const isSelected = answers[currentQuestion] === index.toString();
                      return (
                        <div 
                          key={index} 
                          className={`answer-option rounded-lg p-4 cursor-pointer ${isSelected ? 'selected' : ''}`}
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base font-medium">
                              {option}
                            </Label>
                            {isSelected && (
                              <Check className="w-5 h-5 text-primary animate-bounce-subtle" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </RadioGroup>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-6">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="h-10"
                        onClick={previousQuestion}
                        disabled={currentQuestion === 0}
                      >
                        Previous
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="bg-accent-orange hover:bg-accent-orange/90 text-accent-orange-foreground border-accent-orange h-10"
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Hint
                      </Button>
                      <Button
                        variant="outline"
                        className="h-10"
                      >
                        <Info className="w-4 h-4 mr-2" />
                        Explanation
                      </Button>
                    </div>

                    <div className="space-x-2">
                      {currentQuestion < questions.length - 1 ? (
                        <Button onClick={nextQuestion} className="h-10">
                          Next
                        </Button>
                      ) : (
                        <Button 
                          onClick={submitExam} 
                          disabled={!areAllQuestionsAnswered()}
                          className="bg-success hover:bg-success/90 text-success-foreground h-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
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

export default ExamDemo;