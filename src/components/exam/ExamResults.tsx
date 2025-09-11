import { useState } from "react";
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw, Download, Share2, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

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

interface ExamResultsProps {
  questions: Question[];
  answers: { [key: number]: number };
  flaggedQuestions: Set<number>;
  subject: string;
  type: string;
  year: string;
  mode: 'practice' | 'formal';
  onReturnHome: () => void;
  onTryAgain: () => void;
}

export const ExamResults = ({
  questions,
  answers,
  flaggedQuestions,
  subject,
  type,
  year,
  mode,
  onReturnHome,
  onTryAgain
}: ExamResultsProps) => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const navigate = useNavigate();

  // Calculate scores and metrics
  const totalScore = Object.keys(answers).reduce((score, questionIndex) => {
    const questionId = parseInt(questionIndex);
    const question = questions.find(q => q.id === questionId);
    const selectedAnswer = answers[questionId];
    
    if (question && selectedAnswer === question.correctAnswer) {
      return score + 1;
    }
    return score;
  }, 0);
  
  const maxScore = questions.length;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const passingScore = 60; // 60% passing threshold
  const passed = percentage >= passingScore;
  
  // Generate exam title and ID
  const examTitle = `${subject} ${type} Exam ${year}`;
  const submissionId = `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  // Mock time data (in practice, this would come from the exam timer)
  const timeSpent = 1800; // 30 minutes default
  const hours = Math.floor(timeSpent / 3600);
  const minutes = Math.floor((timeSpent % 3600) / 60);
  const seconds = timeSpent % 60;

  // Calculate topic-based performance
  const topicPerformance = questions.reduce((acc, question) => {
    const selectedAnswer = answers[question.id];
    if (!acc[question.subject]) {
      acc[question.subject] = { correct: 0, total: 0 };
    }
    acc[question.subject].total += 1;
    if (selectedAnswer === question.correctAnswer) {
      acc[question.subject].correct += 1;
    }
    return acc;
  }, {} as Record<string, { correct: number; total: number }>);

  const formatTime = (seconds: number) => {
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  // Practice Mode Results
  if (mode === 'practice') {
    return (
      <div className="container mx-auto p-4 max-w-4xl space-y-6">
        {/* Overall Performance Summary */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              {passed ? (
                <div className="bg-success/20 p-4 rounded-full">
                  <Trophy className="w-8 h-8 text-success" />
                </div>
              ) : (
                <div className="bg-warning/20 p-4 rounded-full">
                  <XCircle className="w-8 h-8 text-warning" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Practice Results: {examTitle}
            </CardTitle>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Badge variant={passed ? "default" : "destructive"} className="text-sm px-3 py-1">
                {passed ? "PASSED" : "NEEDS IMPROVEMENT"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-background/50 rounded-lg border">
                <div className="text-3xl font-bold text-primary mb-1">
                  {totalScore}/{maxScore}
                </div>
                <div className="text-sm text-muted-foreground">Final Score</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg border">
                <div className="text-3xl font-bold text-primary mb-1">
                  {percentage}%
                </div>
                <div className="text-sm text-muted-foreground">Percentage</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg border">
                <div className="text-lg font-semibold text-foreground mb-1 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  {formatTime(timeSpent)}
                </div>
                <div className="text-sm text-muted-foreground">Time Taken</div>
              </div>
            </div>

            {/* Topic-Based Performance */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Performance by Topic</h3>
              <div className="grid gap-3">
                {Object.entries(topicPerformance).map(([topic, stats]) => {
                  const topicPercentage = Math.round((stats.correct / stats.total) * 100);
                  return (
                    <div key={topic} className="p-4 bg-background/50 rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-foreground">{topic}</span>
                        <span className="text-sm text-muted-foreground">
                          {stats.correct}/{stats.total} ({topicPercentage}%)
                        </span>
                      </div>
                      <Progress value={topicPercentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button onClick={onTryAgain} className="flex-1" size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Practice
              </Button>
              <Button onClick={onReturnHome} variant="outline" className="flex-1" size="lg">
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Question-by-Question Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Detailed Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((question, index) => {
              const selectedAnswer = answers[question.id];
              const isCorrect = selectedAnswer === question.correctAnswer;
              const isExpanded = expandedQuestion === question.id;
              
              return (
                <div key={question.id} className="border rounded-lg overflow-hidden">
                  <div 
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setExpandedQuestion(isExpanded ? null : question.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-success" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">
                            Question {index + 1}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {question.text}
                          </p>
                        </div>
                      </div>
                      <ChevronRight 
                        className={`w-4 h-4 text-muted-foreground transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="border-t bg-muted/20 p-4 space-y-4">
                      <div className="text-sm text-foreground">
                        <strong>Question:</strong> {question.text}
                      </div>
                      
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isStudentAnswer = selectedAnswer === optionIndex;
                          const isCorrectAnswer = optionIndex === question.correctAnswer;
                          
                          let optionClass = "p-2 rounded border text-sm ";
                          if (isCorrectAnswer) {
                            optionClass += "bg-success/10 border-success/30 text-success-foreground ";
                          } else if (isStudentAnswer && !isCorrectAnswer) {
                            optionClass += "bg-destructive/10 border-destructive/30 text-destructive-foreground ";
                          } else {
                            optionClass += "bg-background border-border ";
                          }
                          
                          return (
                            <div key={optionIndex} className={optionClass}>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {String.fromCharCode(65 + optionIndex)}.
                                </span>
                                <span className="flex-1">{option}</span>
                                 {isStudentAnswer && (
                                   <Badge variant="outline" className="text-xs">Your Answer</Badge>
                                 )}
                                 {isCorrectAnswer && (
                                   <Badge variant="default" className="text-xs">Correct</Badge>
                                 )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {question.explanation && (
                        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                          <h5 className="font-semibold text-primary mb-2">Explanation</h5>
                          <p className="text-sm text-foreground">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Formal Exam Mode Results
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-success/20 p-4 rounded-full">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Exam Submitted Successfully
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            {examTitle}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Submission Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border">
              <span className="text-sm text-muted-foreground">Submission ID:</span>
              <span className="font-mono text-sm text-foreground">{submissionId}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border">
              <span className="text-sm text-muted-foreground">Submission Time:</span>
              <span className="text-sm text-foreground">
                {new Date().toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border">
              <span className="text-sm text-muted-foreground">Time Taken:</span>
              <span className="text-sm text-foreground">{formatTime(timeSpent)}</span>
            </div>
          </div>

          <Separator />

          {/* Results Notice */}
          <div className="text-center space-y-4">
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <h3 className="font-semibold text-warning mb-2">Results Pending</h3>
              <p className="text-sm text-foreground">
                Your official results will be announced on the scheduled date. 
                Please check your email or return to this platform for updates.
              </p>
            </div>
            
            {/* Provisional Score (if available) */}
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">Provisional Score</h3>
              <div className="text-2xl font-bold text-foreground">
                {totalScore}/{maxScore} ({percentage}%)
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                *This is a provisional score and may change after final review
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <Button onClick={() => navigate('/')} size="lg" className="w-full">
              Return to Dashboard
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Submission Receipt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};