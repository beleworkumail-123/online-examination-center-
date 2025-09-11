import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-success/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(217 91% 60%) 2px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-primary via-primary/90 to-success bg-clip-text text-transparent">
                Success Journey?
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who've achieved their academic goals. 
              Start practicing today and see the difference.
            </p>
          </div>

          {/* Benefits List */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-muted-foreground">Free to start</span>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-muted-foreground">Instant access</span>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-muted-foreground">Cancel anytime</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="group bg-gradient-primary hover:opacity-90 shadow-lg text-lg px-10 py-4 h-auto rounded-xl"
              onClick={() => navigate('/entrance-exams')}
            >
              Sign Up Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/30 hover:bg-primary/5 text-lg px-10 py-4 h-auto rounded-xl"
              onClick={() => navigate('/entrance-exams')}
            >
              Explore Free Demo
            </Button>
          </div>

          {/* Additional Trust Signal */}
          <div className="pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground">
              Trusted by <span className="font-semibold text-primary">10,000+</span> students • 
              <span className="font-semibold text-success"> 98%</span> pass rate • 
              Over <span className="font-semibold text-warning">50,000</span> practice questions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;