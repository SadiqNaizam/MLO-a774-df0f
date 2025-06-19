import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from "sonner";
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginFormValues = z.infer<typeof loginSchema>;

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
type RegisterFormValues = z.infer<typeof registerSchema>;


const AuthenticationPage: React.FC = () => {
  console.log('AuthenticationPage loaded');
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'user@example.com', password: 'password123' } // Default credentials
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: ''}
  });

  const onLoginSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log('Login attempt:', data);
    setAuthError(null);
    // Mock login
    if (data.email === 'user@example.com' && data.password === 'password123') {
      toast.success("Login Successful!");
      navigate('/'); // Redirect to homepage after successful login
    } else {
      setAuthError("Invalid email or password.");
      toast.error("Login Failed: Invalid credentials.");
    }
  };

  const onRegisterSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    console.log('Registration attempt:', data);
    setAuthError(null);
    // Mock registration
    toast.success(`Registration successful for ${data.username}! Please log in.`);
    // Ideally, switch to login tab or redirect. For now, just a message.
    // loginForm.setValue("email", data.email); // Pre-fill email for login
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-900">
        <Card className="w-full max-w-md shadow-xl">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login"><LogIn className="mr-2 h-4 w-4" />Login</TabsTrigger>
              <TabsTrigger value="register"><UserPlus className="mr-2 h-4 w-4" />Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
              </CardHeader>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                <CardContent className="space-y-4">
                  {authError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Authentication Error</AlertTitle>
                      <AlertDescription>{authError}</AlertDescription>
                    </Alert>
                  )}
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="you@example.com" {...loginForm.register('email')} />
                     {loginForm.formState.errors.email && <p className="text-sm text-red-500 mt-1">{loginForm.formState.errors.email.message}</p>}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">Password</Label>
                        <Link to="#" className="text-sm text-primary hover:underline">Forgot password?</Link>
                    </div>
                    <Input id="login-password" type="password" placeholder="••••••••" {...loginForm.register('password')} />
                    {loginForm.formState.errors.password && <p className="text-sm text-red-500 mt-1">{loginForm.formState.errors.password.message}</p>}
                  </div>
                  <Button type="submit" className="w-full">Login</Button>
                </CardContent>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader>
                <CardTitle className="text-2xl">Create an Account</CardTitle>
                <CardDescription>Join LinguaLex to save your analyses and preferences.</CardDescription>
              </CardHeader>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="register-username">Username</Label>
                    <Input id="register-username" placeholder="your_username" {...registerForm.register('username')} />
                    {registerForm.formState.errors.username && <p className="text-sm text-red-500 mt-1">{registerForm.formState.errors.username.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" type="email" placeholder="you@example.com" {...registerForm.register('email')} />
                    {registerForm.formState.errors.email && <p className="text-sm text-red-500 mt-1">{registerForm.formState.errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <Input id="register-password" type="password" placeholder="••••••••" {...registerForm.register('password')} />
                     {registerForm.formState.errors.password && <p className="text-sm text-red-500 mt-1">{registerForm.formState.errors.password.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" placeholder="••••••••" {...registerForm.register('confirmPassword')} />
                    {registerForm.formState.errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{registerForm.formState.errors.confirmPassword.message}</p>}
                  </div>
                  <Button type="submit" className="w-full">Register</Button>
                </CardContent>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AuthenticationPage;