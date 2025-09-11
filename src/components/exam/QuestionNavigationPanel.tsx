import { useState, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Flag, 
  CheckCircle, 
  Circle, 
  MinusCircle,
  Menu
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type QuestionStatus = 'current' | 'answered' | 'unanswered' | 'flagged';
type FilterType = 'all' | 'flagged' | 'unanswered' | 'answered';

interface Question {
  id: number;
  text: string;
}

interface QuestionNavigationPanelProps {
  questions: Question[];
  currentQuestion: number;
  answers: { [key: number]: number };
  flaggedQuestions: Set<number>;
  onQuestionSelect: (index: number) => void;
  onToggleFlag: (index: number) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  examType?: string;
  examSubject?: string;
  examYear?: string;
  isExamMode?: boolean;
  mobileSheetOpen?: boolean;
  onMobileSheetOpenChange?: (open: boolean) => void;
}

export const QuestionNavigationPanel = ({
  questions,
  currentQuestion,
  answers,
  flaggedQuestions,
  onQuestionSelect,
  onToggleFlag,
  isCollapsed,
  onToggleCollapse,
  examType,
  examSubject,
  examYear,
  isExamMode = false,
  mobileSheetOpen = false,
  onMobileSheetOpenChange
}: QuestionNavigationPanelProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  // Custom menu icon component that matches the uploaded design
  const CustomMenuIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <circle cx="4" cy="6" r="1.5" fill="currentColor"/>
      <line x1="8" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="4" cy="12" r="1.5" fill="currentColor"/>
      <line x1="8" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="4" cy="18" r="1.5" fill="currentColor"/>
      <line x1="8" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const getQuestionStatus = (questionIndex: number): QuestionStatus => {
    if (questionIndex === currentQuestion) return 'current';
    if (flaggedQuestions.has(questionIndex)) return 'flagged';
    if (answers[questionIndex] !== undefined) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status: QuestionStatus) => {
    switch (status) {
      case 'current': 
        return 'bg-blue-500 text-white border-blue-500';
      case 'answered': 
        return 'bg-green-500 text-white border-green-500';
      case 'flagged': 
        return 'bg-background text-destructive border-border';
      default: 
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleMouseDown = (index: number) => {
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      handleLongPress(index);
    }, 500); // 500ms for long press
  };

  const handleMouseUp = (index: number) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    if (!isLongPress.current) {
      // Regular click - navigate to question
      onQuestionSelect(index);
    }
  };

  const handleLongPress = (index: number) => {
    const wasFlagged = flaggedQuestions.has(index);
    onToggleFlag(index);
    
    // Show toast message
    if (wasFlagged) {
      toast({
        title: "Question Unflagged",
        description: `Question ${index + 1} has been removed from flagged questions.`,
      });
    } else {
      toast({
        title: "Question Flagged",
        description: `Question ${index + 1} has been flagged for review.`,
      });
    }
  };

  const statusCounts = {
    answered: Object.keys(answers).length,
    flagged: flaggedQuestions.size,
    unanswered: questions.length - Object.keys(answers).length
  };

  // Navigation Content Component - shared between mobile and desktop
  const NavigationContent = ({ onQuestionSelectAndClose }: { onQuestionSelectAndClose?: (index: number) => void }) => (
    <div className="space-y-4">

      {/* Statistics for mobile */}
      <div className="grid grid-cols-3 gap-3 lg:hidden">
        <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <div className="text-lg font-bold text-green-600">{statusCounts.answered}</div>
          <div className="text-xs text-muted-foreground">Answered</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <div className="text-lg font-bold text-destructive">{statusCounts.flagged}</div>
          <div className="text-xs text-muted-foreground">Flagged</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/50 border border-border">
          <div className="text-lg font-bold text-muted-foreground">{statusCounts.unanswered}</div>
          <div className="text-xs text-muted-foreground">Unanswered</div>
        </div>
      </div>

      {/* Questions grid */}
      <div>
        <h4 className="text-sm font-medium mb-3 lg:hidden">
          Questions
        </h4>
        <div className="grid grid-cols-10 gap-2">
          {questions.map((question, index) => {
            const status = getQuestionStatus(index);
            const isVisible = activeFilter === 'all' || 
              (activeFilter === 'flagged' && status === 'flagged') ||
              (activeFilter === 'answered' && status === 'answered') ||
              (activeFilter === 'unanswered' && status === 'unanswered');

            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onMouseDown={() => handleMouseDown(index)}
                      onMouseUp={() => handleMouseUp(index)}
                      onMouseLeave={() => {
                        if (longPressTimer.current) {
                          clearTimeout(longPressTimer.current);
                          longPressTimer.current = null;
                        }
                      }}
                      className={`
                        relative w-7 h-7 rounded-full text-[10px] font-medium border-2
                        flex items-center justify-center transition-all
                        ${getStatusColor(status)}
                        ${!isVisible ? 'opacity-30' : ''}
                        hover:scale-105 active:scale-95
                      `}
                    >
                      <>
                        <span className="text-[10px]">{index + 1}</span>
                        {flaggedQuestions.has(index) && (
                          <div className="absolute -top-1 -right-1">
                            <Flag className="w-3 h-3 text-destructive fill-destructive" />
                          </div>
                        )}
                      </>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs lg:block hidden">
                    <div className="space-y-1">
                      <p className="font-medium">Question {index + 1}</p>
                      <p className="text-sm opacity-90">
                        {question.text.length > 50 ? question.text.substring(0, 50) + "..." : question.text}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>

      {/* Status legend */}
      <div className="space-y-2 pt-3 border-t border-border">
        <h4 className="text-sm font-medium lg:hidden">Legend</h4>
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 text-xs lg:text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-blue-500 border-2 border-blue-500"></div>
            <span className="text-foreground">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-500 border-2 border-green-500"></div>
            <span className="text-foreground">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-muted border-2 border-border"></div>
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
    </div>
  );

  // Mobile Sheet Component
  const MobileNavigationSheet = () => {
    const handleQuestionSelectAndClose = (index: number) => {
      onQuestionSelect(index);
      onMobileSheetOpenChange?.(false);
    };

    return (
      <Sheet open={mobileSheetOpen} onOpenChange={onMobileSheetOpenChange}>
        <SheetTrigger asChild>
          <div />
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto p-0">
          {/* Mobile Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border bg-background">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMobileSheetOpenChange?.(false)}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">Questions</h2>
          </div>

          {/* Mobile Content */}
          <div className="p-4 space-y-6">
            {/* Questions Grid */}
            <div className="grid grid-cols-10 gap-2">
              {questions.map((question, index) => {
                const status = getQuestionStatus(index);
                const isVisible = activeFilter === 'all' || 
                  (activeFilter === 'flagged' && status === 'flagged') ||
                  (activeFilter === 'answered' && status === 'answered') ||
                  (activeFilter === 'unanswered' && status === 'unanswered');

                return (
                  <button
                    key={index}
                    onMouseDown={() => handleMouseDown(index)}
                    onMouseUp={() => handleMouseUp(index)}
                    onMouseLeave={() => {
                      if (longPressTimer.current) {
                        clearTimeout(longPressTimer.current);
                        longPressTimer.current = null;
                      }
                    }}
                    className={`
                      relative w-8 h-8 rounded-full text-xs font-medium border-2
                      flex items-center justify-center transition-all
                      ${getStatusColor(status)}
                      ${!isVisible ? 'opacity-30' : ''}
                      active:scale-95
                    `}
                  >
                      <>
                        <span className="text-xs">{index + 1}</span>
                         {flaggedQuestions.has(index) && (
                           <div className="absolute -top-1 -right-1">
                             <Flag className="w-3.5 h-3.5 text-destructive fill-destructive" />
                           </div>
                         )}
                      </>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-3 pt-3 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-500 flex-shrink-0"></div>
                  <span className="text-sm text-foreground">Current</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-500 flex-shrink-0"></div>
                  <span className="text-sm text-foreground">Answered</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-muted border-2 border-border flex-shrink-0"></div>
                  <span className="text-sm text-foreground">Unanswered</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-muted border-2 border-border"></div>
                    <Flag className="w-3 h-3 text-destructive fill-destructive absolute -top-0.5 -right-0.5" />
                  </div>
                  <span className="text-sm text-foreground">Flagged (Long press to flag)</span>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  if (isCollapsed) {
    return null; // Button moved to QuestionCard
  }

  // Return mobile floating panel for small screens, regular panel for large screens
  return (
    <>
      {/* Mobile Floating Navigation Panel */}
      {mobileSheetOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-start justify-start">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => onMobileSheetOpenChange?.(false)}
          />
          
          {/* Sliding Panel from Left */}
          <Card className="relative w-80 max-w-[85vw] h-full min-h-[75vh] overflow-hidden bg-gradient-floating shadow-lg animate-in slide-in-from-left-full duration-500">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Questions</h3>
                <Button
                  onClick={() => onMobileSheetOpenChange?.(false)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Mobile Statistics */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="text-center p-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-sm font-bold text-green-600">{statusCounts.answered}</div>
                  <div className="text-xs text-muted-foreground">Answered</div>
                </div>
                <div className="text-center p-1.5 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="text-sm font-bold text-destructive">{statusCounts.flagged}</div>
                  <div className="text-xs text-muted-foreground">Flagged</div>
                </div>
                <div className="text-center p-1.5 rounded-lg bg-muted/50 border border-border">
                  <div className="text-sm font-bold text-muted-foreground">{statusCounts.unanswered}</div>
                  <div className="text-xs text-muted-foreground">Unanswered</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-3 overflow-y-auto h-full">
              {/* Questions Grid */}
              <div className="grid grid-cols-8 gap-1.5 mb-3">
                {questions.map((question, index) => {
                  const status = getQuestionStatus(index);
                  const isVisible = activeFilter === 'all' || 
                    (activeFilter === 'flagged' && status === 'flagged') ||
                    (activeFilter === 'answered' && status === 'answered') ||
                    (activeFilter === 'unanswered' && status === 'unanswered');

                  return (
                    <button
                      key={index}
                      onMouseDown={() => handleMouseDown(index)}
                      onMouseUp={() => {
                        handleMouseUp(index);
                        onMobileSheetOpenChange?.(false);
                      }}
                      onMouseLeave={() => {
                        if (longPressTimer.current) {
                          clearTimeout(longPressTimer.current);
                          longPressTimer.current = null;
                        }
                      }}
                      className={`
                        relative w-8 h-8 rounded-full text-xs font-medium border-2
                        flex items-center justify-center transition-all
                        ${getStatusColor(status)}
                        ${!isVisible ? 'opacity-30' : ''}
                        hover:scale-105 active:scale-95
                      `}
                    >
                      <>
                        <span className="text-xs">{index + 1}</span>
                        {flaggedQuestions.has(index) && (
                          <div className="absolute -top-1 -right-1">
                            <Flag className="w-3.5 h-3.5 text-destructive fill-destructive" />
                          </div>
                        )}
                      </>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="space-y-3 pt-3 border-t border-border">
                <h4 className="text-sm font-medium">Legend</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-blue-500 border-2 border-blue-500"></div>
                    <span className="text-foreground">Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-500 border-2 border-green-500"></div>
                    <span className="text-foreground">Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-muted border-2 border-border"></div>
                    <span className="text-foreground">Unanswered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-shrink-0">
                      <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-muted border-2 border-border"></div>
                      <Flag className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-destructive fill-destructive absolute -top-0.5 -right-0.5" />
                    </div>
                    <span className="text-foreground">Flagged (Long press to flag)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Navigation Panel - Now responsive for all screen sizes */}
      <Card className="w-full sm:w-80 lg:w-96 h-full floating-card bg-gradient-floating shadow-lg">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-foreground">Questions</h3>
              </div>
              
            </div>
            
            <Button
              onClick={onToggleCollapse}
              variant="ghost"
              size="icon"
              className="hover-lift focus-ring h-8 w-8 ml-2 flex-shrink-0 hover:bg-primary/10"
              title="Hide Question Navigation"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 lg:p-5">
          <NavigationContent />
        </CardContent>
      </Card>
    </>
  );
};