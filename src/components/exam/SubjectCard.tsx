import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface SubjectCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  questionCount: number;
  lastPracticed?: string;
  averageScore?: number;
  completionPercentage: number;
  onClick: () => void;
}

const SubjectCard = ({
  icon: Icon,
  name,
  description,
  questionCount,
  lastPracticed,
  averageScore,
  completionPercentage,
  onClick
}: SubjectCardProps) => {
  const getProgressColor = (percentage: number) => {
    if (percentage < 30) return "hsl(var(--progress-low))";
    if (percentage < 70) return "hsl(var(--progress-medium))";
    return "hsl(var(--progress-high))";
  };

  const getCompletionBadge = (percentage: number) => {
    if (percentage === 0) return { text: "Not Started", variant: "secondary" as const };
    if (percentage < 100) return { text: "In Progress", variant: "default" as const };
    return { text: "Completed", variant: "success" as const };
  };

  const badge = getCompletionBadge(completionPercentage);

  return (
    <Card 
      className="group hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary/30 overflow-hidden relative h-full floating-card"
      onClick={onClick}
    >
      {/* Progress ring overlay */}
      <div className="absolute top-4 right-4 w-12 h-12">
        <div className="relative w-full h-full">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="hsl(var(--muted))"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke={getProgressColor(completionPercentage)}
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - completionPercentage / 100)}`}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-foreground">
              {completionPercentage}%
            </span>
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="w-16 h-16 rounded-2xl bg-gradient-subtle flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <Badge variant={badge.variant} className="ml-2">
            {badge.text}
          </Badge>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors leading-tight">
          {name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>
        
        {/* Analytics section */}
        <div className="space-y-3 pt-2 border-t border-border/50">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{questionCount.toLocaleString()} Questions Available</span>
            {averageScore && (
              <span className="font-medium text-primary">Avg: {averageScore}%</span>
            )}
          </div>
          
          {lastPracticed && (
            <div className="text-xs text-muted-foreground">
              Last Practiced: {lastPracticed}
            </div>
          )}
          
          {completionPercentage > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium" style={{ color: getProgressColor(completionPercentage) }}>
                  {completionPercentage}%
                </span>
              </div>
              <Progress 
                value={completionPercentage} 
                className="h-2"
                style={{
                  backgroundColor: "hsl(var(--muted))"
                }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;