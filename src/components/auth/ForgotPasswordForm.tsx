import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Mail, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Loader as Loader2 } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBack: () => void;
}

const ForgotPasswordForm = ({ onBack }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email);
      setIsEmailSent(true);
      toast({
        title: 'Reset Email Sent',
        description: 'Check your email for password reset instructions.',
      });
    } catch (error: any) {
      let errorMessage = 'Failed to send reset email';
      
      if (error.message?.includes('User not found')) {
        errorMessage = 'No account found with this email address';
      } else if (error.message?.includes('Email rate limit exceeded')) {
        errorMessage = 'Too many requests. Please wait before trying again.';
      }

      setError(errorMessage);
      toast({
        title: 'Reset Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <Card className="bg-card/95 backdrop-blur-md border-border shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Check Your Email
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            We've sent password reset instructions to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              If you don't see the email in your inbox, please check your spam folder. 
              The reset link will expire in 1 hour.
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col gap-3">
            <Button onClick={onBack} variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
            <Button 
              onClick={() => handleSubmit(new Event('submit') as any)}
              variant="ghost" 
              className="w-full text-sm"
              disabled={isLoading}
            >
              Resend Email
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/95 backdrop-blur-md border-border shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-foreground">
          Reset Your Password
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your email address and we'll send you a reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-primary/50 ${
                error ? 'border-destructive focus:border-destructive' : ''
              }`}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary-variant hover:from-primary/90 hover:to-primary-variant/90 text-white font-medium py-2 shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending Reset Email...
                </>
              ) : (
                'Send Reset Email'
              )}
            </Button>
            
            <Button 
              type="button"
              onClick={onBack} 
              variant="outline" 
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;