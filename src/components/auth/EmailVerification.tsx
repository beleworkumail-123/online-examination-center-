import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Loader as Loader2, RefreshCw } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onBack: () => void;
}

const EmailVerification = ({ email, onBack }: EmailVerificationProps) => {
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [lastResendTime, setLastResendTime] = useState<Date | null>(null);
  const { resendConfirmation } = useAuth();
  const { toast } = useToast();

  const canResend = () => {
    if (!lastResendTime) return true;
    const timeDiff = Date.now() - lastResendTime.getTime();
    return timeDiff > 60000; // 1 minute cooldown
  };

  const getResendCooldown = () => {
    if (!lastResendTime) return 0;
    const timeDiff = Date.now() - lastResendTime.getTime();
    return Math.max(0, 60 - Math.floor(timeDiff / 1000));
  };

  const handleResendEmail = async () => {
    if (!canResend()) {
      toast({
        title: 'Please Wait',
        description: `You can resend the email in ${getResendCooldown()} seconds.`,
        variant: 'destructive',
      });
      return;
    }

    setIsResending(true);

    try {
      await resendConfirmation(email);
      setResendCount(prev => prev + 1);
      setLastResendTime(new Date());
      
      toast({
        title: 'Email Sent',
        description: 'A new confirmation email has been sent to your inbox.',
      });
    } catch (error: any) {
      let errorMessage = 'Failed to resend confirmation email';
      
      if (error.message?.includes('Email rate limit exceeded')) {
        errorMessage = 'Too many requests. Please wait before trying again.';
      }

      toast({
        title: 'Resend Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="bg-card/95 backdrop-blur-md border-border shadow-2xl">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Verify Your Email
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          We've sent a verification link to {email}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Please check your email and click the verification link to activate your account. 
            Don't forget to check your spam folder if you don't see it in your inbox.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <div className="text-sm text-muted-foreground text-center">
            Didn't receive the email?
          </div>
          
          <Button
            onClick={handleResendEmail}
            disabled={isResending || !canResend()}
            variant="outline"
            className="w-full"
          >
            {isResending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                {canResend() ? 'Resend Email' : `Resend in ${getResendCooldown()}s`}
              </>
            )}
          </Button>

          {resendCount > 0 && (
            <div className="text-xs text-center text-muted-foreground">
              Email resent {resendCount} time{resendCount > 1 ? 's' : ''}
            </div>
          )}

          <Button onClick={onBack} variant="ghost" className="w-full">
            Back to Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailVerification;