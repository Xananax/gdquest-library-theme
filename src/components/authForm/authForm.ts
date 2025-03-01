// import { supabase } from "../../js/supabase/supabase.ts";

const params = new Proxy<any>(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) =>
    typeof prop === 'string' && searchParams.has(prop) ? searchParams.get(prop) : "",
}) as {[key:string]: string};

const { email, redirect_to } = params;

if (email != null && email !== "") {
  document
    .querySelectorAll<HTMLInputElement>('input[type="email"][name="email"]')
    .forEach((input) => {
      if (input.value === "") {
        input.value = email;
      }
    });
}

if (redirect_to != null && redirect_to !== "") {
  document
    .querySelectorAll<HTMLInputElement>('input[type="hidden"][name="redirectTo"]')
    .forEach((input) => {
      if (input.value === "") {
        input.value = redirect_to;
      }
    });
}

function onSupabaseLoginFinished({ user, session, error }) {}

function onSupabasePasswordReset({ data, error }) {}

async function signUp({ email, password, confirmPassword, redirectTo }: { email: string, password: string, confirmPassword: string, redirectTo: string }) {
  if (password !== confirmPassword) {
    throw new Error("passwords do not match");
  }
  supabase.auth
    .signUp({ email, password }, { redirectTo })
    .then(onSupabaseLoginFinished);
}

/**
 *
 * @param {Event} evt
 */
function onEnhancedFormSubmit(event: SubmitEvent) {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  const formData = (new FormData(form)).entries().map(([key, value]) => [key, value+''] as const);
  const { email, password, passwordConfirm, redirectTo, action } = Object.fromEntries(formData)
  /*
  action === "otp"
    ? supabase.auth
        .signInWithOtp({ email, options:{ emailRedirectTo: redirectTo || '' } })
        .then(onSupabaseLoginFinished)
    : action === "login"
    ? supabase.auth
        .signInWithPassword({ email, password }, { redirectTo })
        .then(onSupabaseLoginFinished)
    : action === "register"
    ? signUp({ email, password, confirmPassword, redirectTo })
    : action === "resetpass"
    ? supabase.auth
        .resetPasswordForEmail(email, { redirectTo })
        .then(onSupabasePasswordReset)
    : null;
  */
}

document
  .querySelectorAll<HTMLFormElement>('form[data-is="form-enhanced"]')
  .forEach((form) =>
    form.addEventListener("submit", onEnhancedFormSubmit)
  );
