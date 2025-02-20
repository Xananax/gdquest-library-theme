/** @type {Record<string, string>} */
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) =>
    searchParams.has(prop) ? searchParams.get(prop) : "",
});

const { email, redirect_to } = params;

if (email !== "") {
  document
    .querySelectorAll('input[type="email"][name="email"]')
    .forEach((input) => {
      if (input.value === "") {
        input.value = email;
      }
    });
}

if (redirect_to !== "") {
  document
    .querySelectorAll('input[type="hidden"][name="redirectTo"]')
    .forEach((input) => {
      if (input.value === "") {
        input.value = redirect_to;
      }
    });
}

function onSupabaseLoginFinished({ user, session, error }) {}

function onSupabasePasswordReset({ data, error }) {}

async function signUp({ email, password, confirmPassword }) {
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
function onEnhancedFormSubmit(event) {
  event.preventDefault();
  const form = /** @type {HTMLFormElement} */ (event.currentTarget);
  const formData = new FormData(form);
  const { email, password, passwordConfirm, redirectTo, action } =
    /** @type {Record<string, string | undefined>}*/ (
      Object.fromEntries(formData)
    );
  action === "otp"
    ? supabase.auth
        .signIn({ email }, { redirectTo })
        .then(onSupabaseLoginFinished)
    : action === "login"
    ? supabase.auth
        .signIn({ email, password }, { redirectTo })
        .then(onSupabaseLoginFinished)
    : action === "register"
    ? signUp({ email, password, confirmPassword })
    : action === "resetpass"
    ? supabase.auth.api
        .resetPasswordForEmail(email, { redirectTo })
        .then(onSupabasePasswordReset)
    : null;
}

document
  .querySelectorAll('form[data-is="form-enhanced"]')
  .forEach((/** @type {HTMLFormElement} */ form) =>
    form.addEventListener("submit", onEnhancedFormSubmit)
  );
