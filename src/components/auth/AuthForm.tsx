import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Loader as Loader2 } from 'lucide-react';
import ForgotPasswordForm from './ForgotPasswordForm';

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  // Form validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateForm = (isSignUp: boolean = false) => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (isSignUp) {
      if (!formData.displayName.trim()) {
        newErrors.displayName = 'Full name is required';
      } else if (formData.displayName.trim().length < 2) {
        newErrors.displayName = 'Name must be at least 2 characters long';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm(false)) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await signIn(formData.email, formData.password);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      let errorMessage = 'Invalid email or password';
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please check your credentials.';
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = 'Please check your email and confirm your account before logging in.';
      } else if (error.message?.includes('Too many requests')) {
        errorMessage = 'Too many login attempts. Please try again later.';
      }

      toast({
        title: 'Login Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm(true)) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await signUp(formData.email, formData.password, formData.displayName);
      toast({
        title: 'Account Created!',
        description: 'Welcome to EthioStudyHub! You can now start taking exams.',
      });
      navigate('/dashboard');
    } catch (error: any) {
      let errorMessage = 'Failed to create account';
      
      if (error.message?.includes('User already registered')) {
        errorMessage = 'An account with this email already exists. Please try logging in instead.';
        setActiveTab('login');
      } else if (error.message?.includes('Password should be at least')) {
        errorMessage = 'Password must be at least 6 characters long';
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = 'Please enter a valid email address';
      } else if (error.message?.includes('Signup is disabled')) {
        errorMessage = 'Account registration is currently disabled. Please contact support.';
      }

      toast({
        title: 'Sign Up Failed',
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

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthInfo = getPasswordStrengthLabel(passwordStrength);

  // Show forgot password form
  if (showForgotPassword) {
    return <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />;
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-card/95 backdrop-blur-md border-border shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red bg-clip-text text-transparent">
            EthioStudyHub Portal
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {activeTab === 'login' ? 'Welcome back! Sign in to your account' : 'Create your account to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* General Error Alert */}
          {errors.general && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger 
                value="login" 
                className="text-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="text-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className={`bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-primary/50 ${
                      errors.email ? 'border-destructive focus:border-destructive' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
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
                  {errors.password && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </p>
                  )}
                </div>
                
                {/* Forgot Password Link */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot your password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-variant hover:from-primary/90 hover:to-primary-variant/90 text-white font-medium py-2 shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    required
                    className={`bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-primary/50 ${
                      errors.displayName ? 'border-destructive focus:border-destructive' : ''
                    }`}
                  />
                  {errors.displayName && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.displayName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className={`bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-primary/50 ${
                      errors.email ? 'border-destructive focus:border-destructive' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
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
                  {formData.password && (
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
                  <Label htmlFor="signup-confirm-password" className="text-foreground">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
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
                  {formData.confirmPassword && (
                    <div className="flex items-center gap-1 text-xs">
                      {formData.password === formData.confirmPassword ? (
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
                
                {/* Terms and Conditions */}
                <div className="text-xs text-muted-foreground">
                  By creating an account, you agree to our{' '}
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 underline"
                    onClick={() => {
                      // TODO: Open terms modal or navigate to terms page
                      toast({
                        title: 'Terms & Conditions',
                        description: 'Terms and conditions page will be available soon.',
                      });
                    }}
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 underline"
                    onClick={() => {
                      // TODO: Open privacy modal or navigate to privacy page
                      toast({
                        title: 'Privacy Policy',
                        description: 'Privacy policy page will be available soon.',
                      });
                    }}
                  >
                    Privacy Policy
                  </button>
                  .
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-variant hover:from-primary/90 hover:to-primary-variant/90 text-white font-medium py-2 shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          {/* Switch Between Login/Signup */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {activeTab === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setActiveTab('signup')}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign up here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setActiveTab('login')}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Login here
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;