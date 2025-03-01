import { supabase, AuthError, type Session, type User } from "./supabase.ts";

interface GetSessionProps {
  onSessionChanged: (session: Session | null) => void;
  onError: (error: AuthError) => void;
  onWaitingConfirmation: () => void;
}

export const makeSessionManager = ({ onSessionChanged, onError, onWaitingConfirmation }: GetSessionProps) => {
  async function signInWithOTP(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });
    if (error != null) {
      onError(error);
    } else {
      onWaitingConfirmation();
    }
    return { data, error };
  }

  async function signInWithPassword(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error != null) {
      onError(error);
    } else {
      onSessionChanged(data.session);
    }
    return { data, error };
  }

  async function signUpWithEmail(email: string, password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) {
      const error = new AuthError("Password and Confirm Password are not the same");
      error.status = 400;
      error.code = "password_mismatch" as const;
      onError(error);
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error != null) {
      onError(error);
    } else if (data.session != null && data.user != null) {
      onSessionChanged(data.session);
    }
    else {
      onWaitingConfirmation();
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      onError(error);
    }
  }

  supabase.auth.getSession().then(({ data: { session }, error }) => {
    if (error != null) {
      onError(error);
    } else {
      onSessionChanged(session);
    }
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    onSessionChanged(session);
  });

  return { signInWithOTP, logout, signUpWithEmail, signInWithPassword };
};
