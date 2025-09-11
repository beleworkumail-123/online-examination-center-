import { Timer, Home, ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ExamHeaderProps {
  subject: string;
  type: string;
  year: string;
  isExamMode: boolean;
  onToggleMode: () => void;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft?: number;
  isTimerActive?: boolean;
}

export const ExamHeader = ({
  subject,
  type,
  year,
  isExamMode,
  onToggleMode,
  currentQuestion,
  totalQuestions,
  timeLeft,
  isTimerActive
}: ExamHeaderProps) => {
  const navigate = useNavigate();

  const formatSubjectName = (subject: string) => {
    if (!subject) return '';
    return subject.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatTypeName = (type: string) => {
    return type === 'entrance' ? 'Entrance Exam' : 'Exit Exam';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className={`sticky top-0 z-40 backdrop-blur-lg border-b shadow-sm transition-all duration-300 ${
      isExamMode 
        ? 'bg-destructive/5 border-destructive/20' 
        : 'bg-primary/5 border-primary/20'
    }`}>
      {/* Progress bar */}
      <div className="w-full h-1 bg-muted">
        <div 
          className={`h-full transition-all duration-500 ease-out ${
            isExamMode ? 'bg-destructive' : 'bg-primary'
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="container mx-auto px-2 py-3">
        {/* Exam Information Header */}
        <div className="flex items-center justify-between gap-4 mb-3">
          {/* Left side: Exam info */}
          <div className="flex items-center gap-3 flex-wrap min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Badge 
                variant={isExamMode ? "destructive" : "default"} 
                className="text-xs font-medium"
              >
                {isExamMode ? '⏱️ Exam Mode' : '📖 Practice Mode'}
              </Badge>
              
              <Badge variant="secondary" className="text-xs font-medium">
                {formatTypeName(type)}
              </Badge>
              
              <Badge variant="outline" className="text-xs font-medium">
                {formatSubjectName(subject)}
              </Badge>
              
              {year && (
                <Badge className="text-xs font-medium">
                  {year}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Right side: Timer */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isTimerActive && timeLeft !== undefined && (
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium ${
                timeLeft < 600 
                  ? 'bg-destructive/10 border-destructive/20 text-destructive' 
                  : 'bg-muted border-border text-foreground'
              }`}>
                <Timer className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mode Status Card */}
        <div className={`rounded-lg p-3 border transition-all duration-300 ${
          isExamMode 
            ? 'bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/20' 
            : 'bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20'
        }`}>
          {/* Mode Description */}
          <div className="text-xs text-muted-foreground">
            {isExamMode ? (
              <span>⏱️ Timed exam with final scoring • No hints or explanations during the exam</span>
            ) : (
              <span>📖 Practice with hints and explanations • No time pressure • Review answers immediately</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};