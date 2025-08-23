"use client";

// library components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/shadcn/card';
import { login, signup } from './actions';
import LoginForm from '@/components/ui/custom/auth/login-form';
import SignUpForm from '@/components/ui/custom/auth/signup-form';
import { Button } from '@/components/ui/shadcn/button';
import { Avatar, AvatarFallback } from '@/components/ui/shadcn/avatar';
import { Separator } from '@/components/ui/shadcn/separator';

// icons
import { Hexagon } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const [isRegistered, setIsRegistered] = useState(false);

  const toggleRegister = () => {
    setIsRegistered((isRegistered) => !isRegistered);
  };

  return (
    <main className="flex flex-col items-center md:justify-center h-svh pt-10 md:pt-0">
      <Card className="w-full md:w-100">
        <CardHeader className="flex flex-col items-center">
          <div className="self-center">
            <Avatar className="size-18 rounded-full" asChild>
              <AvatarFallback className="bg-primary text-primary-foreground p-2">
                <Hexagon className="size-full"></Hexagon>
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl">Welcome to Improv RPG</CardTitle>
          <Separator />
          {isRegistered ? (
            <CardDescription className="text-primary-foreground">
              <Button type="button" variant="link" onClick={toggleRegister} className="px-0">Login</Button> or sign up if you don't already have an account.
            </CardDescription>
          ) : (
            <CardDescription className="text-primary-foreground">
              Login or <Button type="button" variant="link" onClick={toggleRegister} className="px-0">sign up</Button> if you don't already have an account.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {isRegistered ? (
            <SignUpForm onRegister={signup} />
          ) : (
            <LoginForm onLogin={login} />
          )}
        </CardContent>
      </Card>
    </main>
  )
}