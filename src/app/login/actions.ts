'use server'

// library functions
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// supabase
import { createClient } from '@/utils/supabase/server'

// schemas
import { LoginFormSchemaType, SignUpFormSchemaType } from '@/schemas/auth-schemas'

export async function login(formData: LoginFormSchemaType) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect('/error');
  }

  const path: string = '/dashboard';

  revalidatePath('/', 'layout');
  redirect(path);
}

export async function signup(formData: SignUpFormSchemaType) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp(formData);

  if (error) {
    redirect('/error');
  }
  
  const path: string = '/dashboard';

  revalidatePath('/', 'layout');
  redirect(path);
}