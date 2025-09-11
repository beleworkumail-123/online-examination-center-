import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
interface ExamStartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  examTitle: string;
  year: number;
  examType?: string;
}
const ExamStartDialog = ({
  isOpen,
  onClose,
  examTitle,
  year,
  examType
}: ExamStartDialogProps) => {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);
  
  const handleStartExam = () => {
    setIsStarting(true);
    onClose(); // Close dialog immediately for instant feedback
    
    const type = examType || (window.location.pathname.includes('entrance') ? 'entrance' : 'exit');
    const subjectSlug = examTitle.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
    
    // Immediate navigation with React Router
    navigate(`/exam/${type}/${subjectSlug}/${year}`);
  };
  const getExamTypeLabel = () => {
    const type = examType || (window.location.pathname.includes('entrance') ? 'entrance' : 'exit');
    return type === 'entrance' ? 'entrance' : 'exit';
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 border-primary/20 shadow-2xl [&>button]:hidden">
        <div className="relative p-4">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-xl animate-pulse delay-1000"></div>
          
          <DialogHeader className="text-center space-y-3 relative z-10">
            <div className="space-y-2 animate-fade-in">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                Ready to Start Your Exam?
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Begin your {examTitle} {year} {getExamTypeLabel()} exam now.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="space-y-4 mt-6 relative z-10">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-center mb-4 animate-fade-in delay-200">
                Features to help you succeed:
              </h3>
              
              <div className="grid gap-3">
                <div className="group flex items-start gap-4 transition-all duration-300 animate-fade-in delay-300">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                  <p className="text-sm text-foreground/90 leading-relaxed">Practice mode with detailed explanations to help you learn from your mistakes.</p>
                </div>
                
                <div className="group flex items-start gap-4 transition-all duration-300 animate-fade-in delay-500">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    AI-powered hints for when you get stuck.
                  </p>
                </div>
                
                <div className="group flex items-start gap-4 transition-all duration-300 animate-fade-in delay-700">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    Track your progress and see how you improve over time.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative p-2 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-lg backdrop-blur-sm animate-fade-in delay-1000 hover:scale-105 transition-all duration-300 group overflow-hidden">
              {/* Animated background particles */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-primary/20 rounded-full blur-lg animate-pulse delay-500"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 bg-primary/15 rounded-full blur-md animate-pulse delay-1000"></div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"></div>
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="relative">
                  <Lightbulb className="w-6 h-6 text-primary mt-0.5 flex-shrink-0 group-hover:text-primary/80 transition-all duration-300 group-hover:rotate-12" />
                  <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-relaxed"> Feel free to switch between practice and exam modes anytime</p>
                  <div className="h-0.5 w-0 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-3 animate-fade-in delay-1200">
              <Button variant="outline" onClick={onClose} className="flex-1 hover:scale-105 transition-all duration-200 border-primary/20 hover:border-primary/40">
                Cancel
              </Button>
              <Button 
                onClick={handleStartExam} 
                disabled={isStarting}
                className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50"
              >
                {isStarting ? "Loading..." : "Start Exam"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default ExamStartDialog;