import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  profile?: {
    id: string;
    display_name: string | null;
    role: string | null;
    avatar_url: string | null;
    phone: string | null;
    date_of_birth: string | null;
  };
}

export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string, displayName: string) {
    // Validate input
    if (!email || !password || !displayName) {
      throw new Error('All fields are required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user with profile
  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    // Fetch user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    return {
      ...user,
      profile,
    };
  },

  // Update user profile
  async updateProfile(updates: {
    display_name?: string;
    phone?: string;
    date_of_birth?: string;
    avatar_url?: string;
  }) {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Check if user is admin
  async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user?.profile?.role === 'admin';
  },

  // Reset password
  async resetPassword(email: string) {
    if (!email) {
      throw new Error('Email is required');
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;
  },

  // Update password
  async updatePassword(newPassword: string) {
    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;
  },

  // Resend confirmation email
  async resendConfirmation(email: string) {
    if (!email) {
      throw new Error('Email is required');
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;
  },
};