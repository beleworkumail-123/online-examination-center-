import { useState, useEffect } from "react";
import { Lightbulb, Brain, Flag, ChevronLeft, ChevronRight, CheckCircle, XCircle, X, Menu, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QuestionNavigationPanel } from "./QuestionNavigationPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
interface QuestionCardProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: number | undefined;
  isFlagged: boolean;
  isExamMode: boolean;
  isNavigationCollapsed?: boolean;
  allAnswers: { [key: number]: number }; // Add this to track all answers
  timeLeft?: number; // Add timer support
  onAnswerChange: (value: string) => void;
  onToggleFlag: (index?: number) => void;
  onToggleMode: () => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onShowNavigation: () => void;
  onExpandNavigation?: () => void;
  onNavigateToQuestion: (questionIndex: number) => void;
  questionStates: Array<{
    answered: boolean;
    flagged: boolean;
  }>;
}
export const QuestionCard = ({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  isFlagged,
  isExamMode,
  isNavigationCollapsed = false,
  allAnswers,
  timeLeft,
  onAnswerChange,
  onToggleFlag,
  onToggleMode,
  onNext,
  onPrevious,
  canGoPrevious,
  canGoNext,
  onShowNavigation,
  onExpandNavigation,
  onNavigateToQuestion,
  questionStates
}: QuestionCardProps) => {
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Long press handlers
  const handleLongPressStart = (questionIndex: number) => {
    const timer = setTimeout(() => {
      // Flag any question by index
      onToggleFlag(questionIndex);
      // Mark that a long press occurred
      setLongPressTimer(null);
    }, 500); // 500ms long press to match QuestionNavigationPanel
    setLongPressTimer(timer);
  };
  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };
  const progressPercentage = (currentQuestion + 1) / totalQuestions * 100;

  // Format time helper function
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && canGoPrevious) {
        onPrevious();
      } else if (event.key === 'ArrowRight' && canGoNext) {
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canGoPrevious, canGoNext, onPrevious, onNext]);

  // Show immediate feedback in practice mode
  useEffect(() => {
    if (!isExamMode && selectedAnswer !== undefined) {
      setShowFeedback(true);
      const timer = setTimeout(() => setShowFeedback(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedAnswer, isExamMode]);
  const isCorrect = selectedAnswer === question.correctAnswer;
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-success text-success-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'hard':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  return <div className="flex flex-col h-full">
      <div className="flex-1 relative w-full">
        <Card className="h-full bg-gradient-floating shadow-lg overflow-hidden">
          <CardContent className="p-2 sm:p-3 lg:p-4 flex flex-col justify-between">
            {/* Question Header */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Mobile Menu Icon */}
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setShowNavigation(true)} 
                    className="lg:hidden h-8 w-12 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-110 focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 group shadow-sm hover:shadow-md" 
                    title="Open Navigation Panel"
                  >
                    <Menu className="w-5 h-5 text-primary group-hover:text-primary transition-colors duration-200" />
                  </Button>

                  {/* Expand Navigation Button for Desktop when collapsed */}
                  {isNavigationCollapsed && <Button variant="outline" size="icon" onClick={onExpandNavigation} className="hidden lg:flex bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg hover-lift focus-ring rounded-full h-10 w-10 border-2 border-primary/30" title="Show Navigation Panel">
                      <Menu className="w-5 h-5" />
                    </Button>}
                  
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-base font-semibold text-foreground">
                      Question {currentQuestion + 1}
                    </h2>
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      of {totalQuestions}
                    </span>
                  </div>
                </div>
                
                {/* Timer for Mobile - Exam Mode */}
                {isExamMode && timeLeft !== undefined && (
                  <div className="md:hidden">
                    <div className="flex items-center gap-1 pl-[3px]">
                      <Timer className="w-4 h-4 text-destructive" />
                      <span className="font-semibold text-sm text-destructive">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <Progress value={progressPercentage} className="h-1.5 mb-3 bg-muted/50" />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
              {/* Question Text with Standard Numbering */}
              <div className="mb-4 text-left px-1">
                <div className="p-2">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 font-bold text-base sm:text-lg lg:text-xl text-foreground">
                      {currentQuestion + 1}.
                    </span>
                    <h3 className="text-base sm:text-lg lg:text-xl font-medium text-foreground leading-relaxed flex-1 text-left">
                      {question.text}
                    </h3>
                  </div>
                </div>
              </div>


              {/* Answer Options - Enhanced styling and accessibility */}
              <div className="mb-3 flex-1 px-1">
                <div className="space-y-1.5 sm:space-y-2">
                  {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const showResult = !isExamMode && showFeedback && selectedAnswer !== undefined;
                  const isThisCorrect = index === question.correctAnswer;
                  let optionClass = "group p-2 sm:p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover-lift focus-ring ";
                  if (showResult) {
                    if (isSelected && isCorrect) {
                      optionClass += "border-success bg-success/15 shadow-lg ring-2 ring-success/30 ";
                    } else if (isSelected && !isCorrect) {
                      optionClass += "border-destructive bg-destructive/15 shadow-lg ring-2 ring-destructive/30 ";
                    } else if (isThisCorrect) {
                      optionClass += "border-success bg-success/10 ";
                    } else {
                      optionClass += "border-border bg-muted/30 ";
                    }
                  } else if (isSelected) {
                    optionClass += "border-primary bg-primary/15 shadow-lg ring-2 ring-primary/30 ";
                  } else {
                    optionClass += "border-border bg-card hover:border-primary/70 hover:bg-primary/5 hover:shadow-md ";
                  }
                  return <div key={index} className={optionClass} onClick={() => onAnswerChange(index.toString())}>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-3 flex-1">
                            <span className={`font-bold rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs transition-colors ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary group-hover:bg-primary/20'}`}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-sm sm:text-base leading-relaxed font-medium text-foreground flex-1">
                              {option}
                            </span>
                          </div>
                          {showResult && <div className="flex-shrink-0">
                              {isSelected && isCorrect || isThisCorrect ? <CheckCircle className="w-4 h-4 text-success" /> : isSelected && !isCorrect ? <XCircle className="w-4 h-4 text-destructive" /> : null}
                            </div>}
                        </div>
                      </div>;
                })}
                </div>
              </div>

            </div>

            {/* Hint and Explanation Buttons */}
            {!isExamMode && <div className="flex justify-center gap-2 mb-4">
                <Button variant="outline" onClick={() => setShowHint(!showHint)} disabled={!question.hint} className="px-4 py-2 text-sm font-semibold hover-lift focus-ring bg-gradient-to-r from-warning/10 to-warning/5 border-warning/30 hover:border-warning hover:bg-warning/20 disabled:opacity-50" size="sm">
                  <Lightbulb className="w-4 h-4 mr-2 text-warning" />
                  <span>Hint</span>
                </Button>
                
                <Button variant="outline" onClick={() => setShowExplanation(!showExplanation)} className="px-4 py-2 text-sm font-semibold hover-lift focus-ring bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 hover:border-primary hover:bg-primary/20" size="sm">
                  <Brain className="w-4 h-4 mr-2 text-primary" />
                  <span>Explanation</span>
                </Button>
              </div>}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 mt-4">
              <Button variant="outline" onClick={onPrevious} disabled={!canGoPrevious} className="flex items-center gap-2 px-4 py-2">
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              
              <Button onClick={onNext} disabled={!canGoNext || (isExamMode && selectedAnswer === undefined && currentQuestion < totalQuestions - 1)} className="flex items-center gap-2 px-4 py-2">
                {currentQuestion === totalQuestions - 1 ? (
                  <>
                    <span>Finish Exam</span>
                    <CheckCircle className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Enhanced Hint Popup */}
      {!isExamMode && showHint && question.hint && <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 z-50 max-w-[calc(100vw-2rem)]">
          <Card className="floating-card bg-gradient-to-br from-warning/5 via-background to-warning/10 border-2 border-warning shadow-2xl animate-in zoom-in-95 duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-warning/20 p-3 rounded-full">
                    <Lightbulb className="w-6 h-6 text-warning" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-warning text-lg mb-3">Helpful Hint</h4>
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-1 h-full bg-warning rounded-full"></div>
                      <p className="text-sm text-foreground leading-relaxed pl-4 py-2 italic">
                        {question.hint}
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowHint(false)} className="h-8 w-8 text-muted-foreground hover:bg-muted/50 focus-ring rounded-full">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>}

      {/* Enhanced AI Explanation Popup */}
      {!isExamMode && showExplanation && <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 z-50 max-w-[calc(100vw-2rem)]">
          <Card className="floating-card bg-gradient-to-br from-primary/5 via-background to-primary/10 border-2 border-primary shadow-2xl animate-in zoom-in-95 duration-300">
            <CardContent className="p-0 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-primary text-lg">AI Explanation</h4>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowExplanation(false)} className="h-8 w-8 text-muted-foreground hover:bg-muted/50 focus-ring rounded-full">
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Correct Answer Section */}
                  <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <h5 className="font-semibold text-success">Correct Answer</h5>
                    </div>
                    <p className="text-sm text-foreground">
                      <span className="font-bold text-primary mr-2">
                        {String.fromCharCode(65 + question.correctAnswer)}.
                      </span>
                      {question.options[question.correctAnswer]}
                    </p>
                  </div>

                  {/* Explanation Section */}
                  <div className="bg-muted/30 p-4 rounded-lg border border-muted">
                    <h5 className="font-semibold text-foreground mb-3">Explanation</h5>
                    {question.explanation ? (
                      <p className="text-sm text-foreground leading-relaxed mb-4">{question.explanation}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        No explanation available for this question yet.
                      </p>
                    )}
                    
                    {/* Ask AI Button */}
                    <div className="pt-3 border-t border-muted-foreground/20">
                      <p className="text-xs text-muted-foreground mb-2">Need more help with this question?</p>
                      <Button 
                        onClick={() => navigate('/ai')} 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-lg"
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Ask AI Tutor
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>}

      {/* Mobile Navigation Panel */}
      {showNavigation && <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowNavigation(false)} />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[90vw] bg-background border-r shadow-xl flex flex-col">
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Navigation</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowNavigation(false)} className="h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Question Progress at Top */}
              <div className="text-center mb-4 p-2 bg-muted/30 rounded-lg">
                <div className="text-base font-semibold text-foreground">
                  Question {currentQuestion + 1} of {totalQuestions}
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.round((currentQuestion + 1) / totalQuestions * 100)}% Complete
                </div>
              </div>
              
              <div className="flex-1 flex flex-col space-y-4">
                {/* Legend - Compact */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-foreground">Legend</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-500"></div>
                      <span className="text-foreground">Current</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-500"></div>
                      <span className="text-foreground">Answered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-muted border-2 border-border"></div>
                      <span className="text-foreground">Unanswered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-shrink-0">
                        <div className="w-4 h-4 rounded-full bg-muted border-2 border-border"></div>
                        <Flag className="w-3 h-3 text-destructive fill-destructive absolute -top-0.5 -right-0.5" />
                      </div>
                      <span className="text-foreground">Flagged (Long press to flag)</span>
                    </div>
                  </div>
                </div>
                 
                 {/* Questions Grid - 10x10 */}
                 <div className="flex-1 flex flex-col">
                   <h4 className="text-xs font-semibold text-foreground mb-2">Questions</h4>
                   
                   {/* Flagged Questions Section */}
                   {questionStates.some(state => state.flagged) && <div className="mb-4 p-2 bg-destructive/5 rounded-lg border border-destructive/20">
                       <h5 className="text-xs font-semibold text-destructive mb-2">📌 Pinned Questions</h5>
                       <div className="flex flex-wrap gap-1">
                         {questionStates.map((state, index) => state.flagged ? <Button key={`flagged-${index}`} variant="outline" size="sm" className="w-8 h-6 rounded-md p-0 text-xs font-medium bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20" onClick={() => {
                    onNavigateToQuestion(index);
                    setShowNavigation(false);
                  }}>
                               {index + 1}
                             </Button> : null)}
                       </div>
                     </div>}
                   
                   <div className="grid grid-cols-10 gap-x-4 gap-y-2 flex-1 content-start">
                     {Array.from({
                  length: totalQuestions
                }, (_, index) => {
                  const state = questionStates[index];
                  let buttonClass = `w-6 h-6 rounded-full p-0 text-xs font-medium border transition-all hover:scale-105 `;
                  if (index === currentQuestion) {
                    buttonClass += 'bg-primary text-primary-foreground border-primary shadow-sm ';
                  } else if (state.flagged) {
                    buttonClass += 'bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20 ';
                  } else if (state.answered) {
                    buttonClass += 'bg-success/20 text-success border-success/30 hover:bg-success/30 ';
                  } else {
                    buttonClass += 'bg-gradient-to-br from-primary/5 to-primary/10 text-black border-primary/20 hover:border-primary hover:bg-primary/15 hover:shadow-sm ';
                  }
                  return <Button key={index} variant="outline" className={buttonClass + " relative"} onMouseDown={() => handleLongPressStart(index)} onMouseUp={() => {
                    if (longPressTimer) {
                      // Timer still running means it was a regular click
                      clearTimeout(longPressTimer);
                      setLongPressTimer(null);
                      onNavigateToQuestion(index);
                      setShowNavigation(false);
                    }
                    // If timer is null, it was a long press - don't navigate
                  }} onMouseLeave={() => {
                    if (longPressTimer) {
                      clearTimeout(longPressTimer);
                      setLongPressTimer(null);
                    }
                  }} onTouchStart={() => handleLongPressStart(index)} onTouchEnd={() => {
                    if (longPressTimer) {
                      // Timer still running means it was a regular tap
                      clearTimeout(longPressTimer);
                      setLongPressTimer(null);
                      onNavigateToQuestion(index);
                      setShowNavigation(false);
                    }
                    // If timer is null, it was a long press - don't navigate
                  }}>
                           {index + 1}
                           {state.flagged && <div className="absolute -top-1 -right-1">
                               <Flag className="w-3 h-3 text-destructive fill-destructive drop-shadow-sm" />
                             </div>}
                         </Button>;
                })}
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>}

     </div>;
};