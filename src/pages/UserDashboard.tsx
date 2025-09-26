import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Award,
  Play,
  RotateCcw,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { userAPI, examAPI, attemptAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import EthiopianHeader from '@/components/ethiopian/EthiopianHeader';

const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    totalAttempts: 0,
    averageScore: 0,
    subjectStats: {},
    recentAttempts: []
  });
  const [availableExams, setAvailableExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const [stats, exams] = await Promise.all([
        userAPI.getUserStats(user.id),
        examAPI.getExams(),
      ]);

      setUserStats(stats);
      setAvailableExams(exams || []);
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartExam = async (examId: string) => {
    try {
      const attempt = await attemptAPI.startAttempt(examId);
      navigate(`/exam/${examId}/${attempt.id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start exam',
        variant: 'destructive',
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <EthiopianHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <EthiopianHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user?.profile?.display_name || 'Student'}!
            </h1>
            <p className="text-muted-foreground">
              Continue your learning journey and track your progress
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Exams Taken</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalAttempts}</div>
              <p className="text-xs text-muted-foreground">
                Total attempts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                Across all exams
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24h</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Badges earned
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Exams */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Available Exams</h2>
            <div className="grid gap-4">
              {availableExams.slice(0, 6).map((exam: any) => (
                <Card key={exam.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{exam.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{exam.subject}</Badge>
                          <Badge variant={exam.is_premium ? "default" : "secondary"}>
                            {exam.is_premium ? 'Premium' : 'Free'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {exam.total_questions} questions • {exam.duration_minutes} minutes
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          onClick={() => handleStartExam(exam.id)}
                          className="bg-gradient-primary"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Exam
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Attempts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Attempts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userStats.recentAttempts.map((attempt: any, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0">
                    <div>
                      <p className="text-sm font-medium">{attempt.exams?.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Score: {attempt.score}%
                      </p>
                    </div>
                    <Badge variant={attempt.score >= 70 ? "success" : "destructive"}>
                      {attempt.score >= 70 ? 'Passed' : 'Failed'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Subject Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subject Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(userStats.subjectStats).map(([subject, stats]: [string, any]) => (
                  <div key={subject} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{subject}</span>
                      <span>{Math.round(stats.averageScore)}%</span>
                    </div>
                    <Progress value={stats.averageScore} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {stats.attempts} attempts
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;