import { BarChart3, Users, BookOpen, Trophy, TrendingUp, Clock, Target, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const StatsSection = () => {
  const mainStats = [
    {
      icon: Users,
      title: "Active Students Today",
      value: "12,847",
      change: "+15%",
      trend: "up",
      description: "Students currently online"
    },
    {
      icon: BookOpen,
      title: "Exams Completed",
      value: "847,293",
      change: "+28%",
      trend: "up",
      description: "Total exams taken this year"
    },
    {
      icon: Trophy,
      title: "Schools & Institutions",
      value: "1,247",
      change: "+12%",
      trend: "up",
      description: "Partner institutions using platform"
    },
    {
      icon: Globe,
      title: "Regional Coverage",
      value: "11/11",
      change: "100%",
      trend: "stable",
      description: "All Ethiopian regions covered"
    }
  ];

  const performanceData = [
    { subject: "Mathematics", completion: 85, students: "15,840", avgScore: "87%" },
    { subject: "Physics", completion: 78, students: "12,350", avgScore: "82%" },
    { subject: "Chemistry", completion: 92, students: "18,920", avgScore: "89%" },
    { subject: "Biology", completion: 88, students: "16,750", avgScore: "85%" },
    { subject: "English", completion: 95, students: "22,100", avgScore: "91%" }
  ];

  const regionalData = [
    { region: "Addis Ababa", students: 18420, color: "ethiopian-green" },
    { region: "Oromia", students: 15890, color: "ethiopian-yellow" },
    { region: "Amhara", students: 13245, color: "ethiopian-red" },
    { region: "Tigray", students: 8976, color: "primary" },
    { region: "SNNP", students: 7834, color: "success" }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Platform </span>
            <span className="bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red bg-clip-text text-transparent">
              Analytics
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real-time insights into student performance and platform usage across Ethiopia.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mainStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80 border-0 shadow-lg hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl md:text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      stat.trend === 'up' ? 'text-success' : 
                      stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      <TrendingUp className={`h-4 w-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Subject Performance */}
          <Card className="bg-gradient-to-br from-card to-card/80 border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl font-bold">Subject Performance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {performanceData.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{subject.subject}</span>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <span>{subject.students} students</span>
                      <span className="font-medium text-success">{subject.avgScore}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={subject.completion} className="h-2" />
                    <div className="absolute inset-0 flex items-center justify-end pr-2">
                      <span className="text-xs font-medium text-foreground">
                        {subject.completion}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Regional Distribution */}
          <Card className="bg-gradient-to-br from-card to-card/80 border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl font-bold">Regional Distribution</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {regionalData.map((region, index) => {
                const maxStudents = Math.max(...regionalData.map(r => r.students));
                const percentage = (region.students / maxStudents) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{region.region}</span>
                      <span className="text-sm text-muted-foreground">
                        {region.students.toLocaleString()} students
                      </span>
                    </div>
                    <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-${region.color} to-${region.color}/80 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6 bg-gradient-to-br from-success/5 to-success/10 border border-success/20">
            <CardContent className="p-0 space-y-4">
              <div className="w-16 h-16 mx-auto bg-success/20 rounded-2xl flex items-center justify-center">
                <Clock className="h-8 w-8 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-success mb-1">2.3 hrs</div>
                <div className="text-sm text-muted-foreground">Average study time per day</div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-warning/5 to-warning/10 border border-warning/20">
            <CardContent className="p-0 space-y-4">
              <div className="w-16 h-16 mx-auto bg-warning/20 rounded-2xl flex items-center justify-center">
                <Trophy className="h-8 w-8 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-warning mb-1">89%</div>
                <div className="text-sm text-muted-foreground">Students pass rate improvement</div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <CardContent className="p-0 space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Support availability</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;