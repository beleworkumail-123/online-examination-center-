import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import EthiopianHeader from "@/components/ethiopian/EthiopianHeader";
import AuthForm from "@/components/auth/AuthForm";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Handle auth callbacks and URL parameters
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    const message = searchParams.get('message');

    if (error) {
      toast({
        title: 'Authentication Error',
        description: errorDescription || 'An error occurred during authentication',
        variant: 'destructive',
      });
    }

    if (message) {
      toast({
        title: 'Information',
        description: message,
      });
    }
  }, [searchParams, toast]);
  return (
    <div className="min-h-screen bg-background">
      <EthiopianHeader />
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
        {/* Decorative Elements matching website */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-ethiopian-green/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-ethiopian-yellow/20 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-ethiopian-red/20 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
        
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;