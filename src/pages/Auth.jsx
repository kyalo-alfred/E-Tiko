import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Sparkles, Calendar, Shield, Mail, Lock, User, Github, Chrome, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const forgotPasswordForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onLoginSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Login data:", data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Login successful!",
        description: "Welcome back to Etiko!",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Signup data:", data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Registration successful!",
        description: "Welcome to Etiko! Please verify your email.",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onForgotPasswordSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Forgot password data:", data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Reset link sent!",
        description: "Check your email for password reset instructions.",
      });
      setShowForgotPassword(false);
    } catch (error) {
      toast({
        title: "Failed to send reset link",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast({
      title: `${provider} login`,
      description: `${provider} authentication coming soon!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 pr-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
              <Calendar className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Etiko
            </h1>
          </div>
          
          <h2 className="text-4xl font-bold text-foreground leading-tight">
            Your Gateway to
            <br />
            Unforgettable Events
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Discover, book, and experience amazing events. Join thousands of event enthusiasts on Etiko.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Easy Booking</h3>
                <p className="text-sm text-muted-foreground">Book tickets in seconds with our streamlined process</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">Your transactions are protected with 2FA authentication</p>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <Card className="w-full shadow-card border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 lg:hidden mb-4">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <Calendar className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Etiko
              </h1>
            </div>
            
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Welcome back" : "Create your account"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Enter your credentials to access your account"
                : "Sign up to start booking amazing events"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {showForgotPassword ? (
              <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h3 className="text-lg font-semibold">Reset Password</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="you@example.com"
                      {...forgotPasswordForm.register("email")}
                      className="pl-10 transition-all focus:shadow-elegant"
                    />
                  </div>
                  {forgotPasswordForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{forgotPasswordForm.formState.errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-elegant"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Remember your password? </span>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            ) : isLogin ? (
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      {...loginForm.register("email")}
                      className="pl-10 transition-all focus:shadow-elegant"
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...loginForm.register("password")}
                      className="pl-10 pr-10 transition-all focus:shadow-elegant"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      {...loginForm.register("rememberMe")}
                    />
                    <Label htmlFor="remember-me" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-elegant"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin("Google")}
                    className="w-full"
                  >
                    <Chrome className="w-4 h-4 mr-2" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin("GitHub")}
                    className="w-full"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      {...signupForm.register("name")}
                      className="pl-10 transition-all focus:shadow-elegant"
                    />
                  </div>
                  {signupForm.formState.errors.name && (
                    <p className="text-sm text-destructive">{signupForm.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      {...signupForm.register("email")}
                      className="pl-10 transition-all focus:shadow-elegant"
                    />
                  </div>
                  {signupForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{signupForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...signupForm.register("password")}
                      className="pl-10 pr-10 transition-all focus:shadow-elegant"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {signupForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{signupForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-confirm"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...signupForm.register("confirmPassword")}
                      className="pl-10 pr-10 transition-all focus:shadow-elegant"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {signupForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive">{signupForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-elegant"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin("Google")}
                    className="w-full"
                  >
                    <Chrome className="w-4 h-4 mr-2" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin("GitHub")}
                    className="w-full"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 p-3 bg-muted/50 rounded-lg border border-border/50">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Two-factor authentication (2FA) will be enabled for enhanced security after registration.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
