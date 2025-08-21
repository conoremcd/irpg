import { Card, CardContent } from '@/components/ui/shadcn/card';
import { login, signup } from './actions';
import LoginForm from '@/components/ui/custom/auth/login-form';
import { Dialog, DialogContent } from '@/components/ui/shadcn/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/shadcn/button';

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center">

      <Dialog>
        <Card className="">
          <CardContent className="flex flex-col items-center">
            <p>Login or signup if you don't already have an account:</p>
            <DialogContent>
              <LoginForm onLogin={login}></LoginForm>
            </DialogContent>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="uppercase">
                Login
              </Button>
            </DialogTrigger>
          </CardContent>
        </Card>
      </Dialog>
    </main>
  )
}