import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Trash2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from "sonner";

// Mock data for saved analyses
const mockSavedAnalyses = [
  { id: 'analysis-1', title: '相思 (Red Bean Poem)', dateSaved: '2024-07-28', type: 'Poem' },
  { id: 'analysis-2', title: '學如逆水行舟 (Learning Proverb)', dateSaved: '2024-07-27', type: 'Proverb' },
  { id: 'analysis-3', title: 'A Modern Short Story Snippet', dateSaved: '2024-07-26', type: 'Modern Text' },
];

const profileFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;

const passwordFormSchema = z.object({
    currentPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords don't match",
    path: ["confirmPassword"],
});
type PasswordFormValues = z.infer<typeof passwordFormSchema>;


const UserAccountPage: React.FC = () => {
  console.log('UserAccountPage loaded');
  const [savedAnalyses, setSavedAnalyses] = useState(mockSavedAnalyses);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { username: 'current_user', email: 'user@example.com' },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onProfileSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    console.log('Profile update:', data);
    toast.success("Profile updated successfully!");
  };

  const onPasswordSubmit: SubmitHandler<PasswordFormValues> = (data) => {
    console.log('Password change:', data);
    toast.success("Password changed successfully!");
    passwordForm.reset();
  };

  const handleDeleteAnalysis = (id: string) => {
    setSavedAnalyses(prev => prev.filter(item => item.id !== id));
    toast.info("Analysis removed from your saved list.");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="saved-analyses">Saved Analyses</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                        <CardDescription>Update your username and email address.</CardDescription>
                    </CardHeader>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" {...profileForm.register('username')} />
                                {profileForm.formState.errors.username && <p className="text-sm text-red-500 mt-1">{profileForm.formState.errors.username.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" {...profileForm.register('email')} />
                                {profileForm.formState.errors.email && <p className="text-sm text-red-500 mt-1">{profileForm.formState.errors.email.message}</p>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Save Changes</Button>
                        </CardFooter>
                    </form>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your account password.</CardDescription>
                    </CardHeader>
                     <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input id="currentPassword" type="password" {...passwordForm.register('currentPassword')} />
                                {passwordForm.formState.errors.currentPassword && <p className="text-sm text-red-500 mt-1">{passwordForm.formState.errors.currentPassword.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input id="newPassword" type="password" {...passwordForm.register('newPassword')} />
                                {passwordForm.formState.errors.newPassword && <p className="text-sm text-red-500 mt-1">{passwordForm.formState.errors.newPassword.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input id="confirmPassword" type="password" {...passwordForm.register('confirmPassword')} />
                                {passwordForm.formState.errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{passwordForm.formState.errors.confirmPassword.message}</p>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Update Password</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
          </TabsContent>

          <TabsContent value="saved-analyses">
            <Card>
              <CardHeader>
                <CardTitle>My Saved Analyses</CardTitle>
                <CardDescription>Review and manage texts you've saved for later.</CardDescription>
              </CardHeader>
              <CardContent>
                {savedAnalyses.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date Saved</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {savedAnalyses.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>{item.dateSaved}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => alert(`Viewing ${item.title}`)}><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteAnalysis(item.id)}><Trash2 className="h-4 w-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-muted-foreground py-6">You haven't saved any analyses yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Application Preferences</CardTitle>
                <CardDescription>Customize your LinguaLex experience (e.g., display settings, notification preferences).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fontSize">Default Font Size</Label>
                  <Input id="fontSize" type="number" defaultValue="16" />
                  <p className="text-sm text-muted-foreground mt-1">Set your preferred font size for text analysis.</p>
                </div>
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  {/* This would ideally be a Select component */}
                  <Input id="theme" defaultValue="System Default" />
                   <p className="text-sm text-muted-foreground mt-1">Choose between Light, Dark, or System Default theme.</p>
                </div>
                {/* Add more preference options here */}
                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UserAccountPage;