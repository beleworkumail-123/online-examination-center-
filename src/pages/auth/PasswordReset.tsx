import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Lock, CheckCircle, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import EthiopianHeader from '@/components/ethiopian/EthiopianHeader';

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { updatePassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if we have the required tokens from the URL
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    
    if (!accessToken || !refreshToken) {
      toast({
        title: 'Invalid Reset Link',
        description: 'This password reset link is invalid or has expired.',
        variant: 'destructive',
      });
      navigate('/auth');
    }
  }, [searchParams, navigate, toast]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await updatePassword(password);
      setIsSuccess(true);
      toast({
        title: 'Password Updated',
        description: 'Your password has been successfully updated.',
      });
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/auth');
      }, 3000);
    } catch (error: any) {
      let errorMessage = 'Failed to update password';
      
      if (error.message?.includes('Password should be at least')) {
        errorMessage = 'Password must be at least 6 characters long';
      } else if (error.message?.includes('New password should be different')) {
        errorMessage = 'New password must be different from your current password';
      }

      toast({
        title: 'Update Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthLabel = (strength: number) => {
    if (strength < 2) return { label: 'Weak', color: 'text-destructive' };
    if (strength < 4) return { label: 'Medium', color: 'text-warning' };
    return { label: 'Strong', color: 'text-success' };
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthInfo = getPasswordStrengthLabel(passwordStrength);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <EthiopianHeader />
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
          <Card className="bg-card/95 backdrop-blur-md border-border shadow-2xl max-w-md w-full">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Password Updated!
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your password has been successfully updated. You will be redirected to login shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/auth')} 
                className="w-full bg-gradient-to-r from-primary to-primary-variant"
              >
                Continue to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <EthiopianHeader />
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
        <Card className="bg-card/95 backdrop-blur-md border-border shadow-2xl max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Reset Your Password
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errors.general && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-primary/50 pr-10 ${
                      errors.password ? 'border-destructive focus:border-destructive' : ''
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Password strength:</span>
                      <span className={strengthInfo.color}>{strengthInfo.label}</span>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full ${
                            i < passwordStrength 
                              ? passwordStrength < 2 ? 'bg-destructive' 
                                : passwordStrength < 4 ? 'bg-warning' 
                                : 'bg-success'
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-new-password" className="text-foreground">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-new-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-primary/50 pr-10 ${
                      errors.confirmPassword ? 'border-destructive focus:border-destructive' : ''
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div className="flex items-center gap-1 text-xs">
                    {password === confirmPassword ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-success" />
                        <span className="text-success">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 text-destructive" />
                        <span className="text-destructive">Passwords don't match</span>
                      </>
                    )}
                  </div>
                )}
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-variant hover:from-primary/90 hover:to-primary-variant/90 text-white font-medium py-2 shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  'Update Password'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordReset;