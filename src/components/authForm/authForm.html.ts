import { tmpl, type ComponentString } from "../../depsServer.ts";
const {
  div,
  ul,
  li,
  a,
  noscript,
  section,
  h2,
  p,
  label,
  input,
  footer,
  img,
  button,
  form,
} = tmpl;
import { CollapsibleList } from "../collapsibleList/collapsibleList.html.ts";
import { CollapsibleItem } from "../collapsibleItem/collapsibleItem.html.ts";

const classPrefix = "authForm";

const EmailInput = (id: string) =>
  [
    label({ htmlFor: `email${id}` }, "Email"),
    input({
      type: "email",
      id: `email${id}`,
      name: "email",
      placeholder: "me@example.com",
      required: true,
    }),
  ].join("");

const PasswordInput = (id: string, confirm: boolean) =>
  [
    label(
      { htmlFor: `password${confirm ? "Confirm" : ""}${id}` },
      confirm ? "Confirm Password" : "Password"
    ),
    input({
      type: "password",
      placeholder: "*****",
      id: `password${confirm ? "Confirm" : ""}${id}`,
      name: confirm ? "password" : "passwordConfirm",
      required: true,
    }),
  ].join("");

const hiddenFields = [
  input({ type: "hidden", name: "redirectTo", value: "" }),
  input({ type: "hidden", name: "action", value: "otp" }),
].join("");

const SubmitButton = (label: string) => button({ type: "submit" }, label);

const Form = (...children: string[]) =>
  form({ action: "", method: "POST", dataIs: "form-enhanced" }, ...children);

const tabs = [
  {
    id: "otp",
    label: "Login with a one-time link",
    title: "Send yourself a one-time link",
    children: [
      p(
        null,
        "Enter your email address and we'll send you a link to log in to your account."
      ),
      Form(EmailInput("OTP"), hiddenFields, SubmitButton("Send link")),
      CollapsibleList(
        {},
        CollapsibleItem(
          { title: "How to use one-time links?", open: false },

          p(
            null,
            "One-time links allow you to log in and register without a password."
          ),
          p(
            null,
            "We will send you a one-time link in your mail box. Click the link to log in here. If you don't have an account, we will create one automatically."
          ),
          p(
            null,
            "Each link works only once and you need to open it in the same web browser."
          )
        )
      ),
      footer(
        null,
        p(
          null,
          "Do you prefer using a password?",
          a({ href: "#register" }, "register"),
          " or ",
          a({ href: "#login" }, "login")
        )
      ),
    ],
  },
  {
    id: "login",
    label: "Login with a password",
    title: "Log in",
    children: [
      Form(
        EmailInput("Password"),
        PasswordInput("Password", false),
        hiddenFields,
        SubmitButton("Login")
      ),
      CollapsibleList(
        {},
        CollapsibleItem(
          {
            title: "Forgot your password or your password is not working?",
            open: false,
          },
          a({ href: "#resetpass" }, "Reset your password")
        )
      ),
      footer(
        null,
        p(null, "New to GDQuest? ", a({ href: "#register" }, "register"))
      ),
    ],
  },
  {
    id: "register",
    label: "Register",
    title: "Register",
    children: [
      Form(
        EmailInput("Register"),
        PasswordInput("Register", false),
        hiddenFields,
        PasswordInput("Register", true),
        CollapsibleList(
          {},
          CollapsibleItem(
            { title: "Password recommendations", open: false },
            p(
              null,
              "Have at least 12 characters. There's a good explanation on",
              a(
                {
                  href: "https://www.explainxkcd.com/wiki/index.php/936:_Password_Strength",
                  target: "_blank",
                },
                "XKCD"
              ),
              ", and here's a table, courtesy of",
              a(
                { href: "https://www.hivesystems.io/password" },
                "hivesystems.io"
              ),
              ":"
            ),
            a(
              {
                href: "{{ staticRoot }}hive_systems_password_table.png",
                target: "_blank",
              },
              img({ src: "{{ staticRoot }}hive_systems_password_table.png" })
            )
          )
        ),
        SubmitButton("Register")
      ),
    ],
  },
  {
    id: "resetpass",
    label: "Reset password",
    title: "Reset Password",
    children: [
      p(
        null,
        "Enter your email address and we'll send you a link to reset your password."
      ),
      Form(
        EmailInput("ResetPassword"),
        hiddenFields,
        SubmitButton("Send Reset Link")
      ),
    ],
  },
];

export const AuthForm: ComponentString = () =>
  div(
    { className: classPrefix },
    div(
      { className: `${classPrefix}Content` },
      ul(
        {
          role: "tablist",
          "aria-label": "Login or Register forms",
          dataIs: "tab-list",
          className: `${classPrefix}Tabs`,
        },
        ...tabs.map(({ id, label }, index) =>
          li(
            { role: "presentation" },
            a(
              {
                role: "tab",
                "aria-selected": index === 0,
                "aria-controls": id,
                href: `#${id}`,
                id: `authLoginForm${id}Tab`,
                tabIndex: 0,
              },
              label
            )
          )
        )
      ),
      div(
        { dataIs: "tab-panel-list", className: `${classPrefix}TabsPanels` },
        ...tabs.map(({ id, label, title, children}) =>
          section(
            {
              className: `${classPrefix}Form${label}`,
              id,
              role: "tabpanel",
              tabIndex: -1,
              ariaLabelledby: `authLoginForm${id}Tab`,
            },
            h2(null, title),
            ...children
          )
        )
      ),
      noscript(
        null,
        "Login and registration require Javascript. Please enable Javascript to enable this functionality!"
      )
    )
  );
