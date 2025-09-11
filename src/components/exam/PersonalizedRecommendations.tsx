import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, TrendingUp, Clock, CheckCircle } from "lucide-react";

interface Recommendation {
  id: string;
  type: 'weakness' | 'streak' | 'goal' | 'achievement';
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

const PersonalizedRecommendations = () => {
  // Mock data - in real implementation, this would come from user analytics
  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'weakness',
      title: 'Focus on Mechanics',
      description: 'Your scores in Physics mechanics questions are 25% below your average. Practice more problems to improve.',
      action: 'Practice Physics',
      priority: 'high'
    },
    {
      id: '2',
      type: 'streak',
      title: '7-day Study Streak!',
      description: "You've been consistent with your daily practice. Keep up the excellent work!",
      action: 'Continue Streak',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'goal',
      title: 'Weekly Goal Progress',
      description: 'You\'re 60% toward your goal of answering 100 questions this week.',
      action: 'View Progress',
      priority: 'medium'
    }
  ];

  const getIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'weakness': return Brain;
      case 'streak': return TrendingUp;
      case 'goal': return Target;
      case 'achievement': return CheckCircle;
      default: return Brain;
    }
  };

  const getPriorityColor = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'high': return 'hsl(var(--progress-low))';
      case 'medium': return 'hsl(var(--progress-medium))';
      case 'low': return 'hsl(var(--progress-high))';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Recommended For You</h2>
          <p className="text-muted-foreground">Personalized insights to boost your performance</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec) => {
          const Icon = getIcon(rec.type);
          return (
            <Card 
              key={rec.id} 
              className="hover:shadow-lg transition-all duration-300 border-l-4 hover:-translate-y-1"
              style={{ borderLeftColor: getPriorityColor(rec.priority) }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${getPriorityColor(rec.priority)}15` }}
                    >
                      <Icon 
                        className="w-5 h-5" 
                        style={{ color: getPriorityColor(rec.priority) }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg leading-tight">{rec.title}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className="text-xs mt-1"
                        style={{ 
                          borderColor: getPriorityColor(rec.priority),
                          color: getPriorityColor(rec.priority)
                        }}
                      >
                        {rec.priority} priority
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {rec.description}
                </p>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full hover:bg-primary/5"
                  style={{ borderColor: getPriorityColor(rec.priority) }}
                >
                  {rec.action}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;