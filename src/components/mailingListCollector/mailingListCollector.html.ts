import { tmpl, type ComponentString } from "../../depsServer.ts";

const { form, label, input, span, button, iframe } = tmpl;

type MailingListCollectorProps = {
  signupFormIframe: string;
  inputid: string;
  callback: string;
}

export const MailingListCollector:ComponentString<MailingListCollectorProps> = ({ signupFormIframe, inputid, callback="" }) => signupFormIframe === 'gdschool' ? form(
  { action: "https://school.gdquest.com/newsletter/signup", method: "POST", "dataIsAutofetch": "true" },
  label({ htmlFor: `mailinglist-${inputid}` }, "Enter your email"),
  input({ type: "email", placeholder: "Enter your email", name: "email", value: "", id: `mailinglist-${inputid}` }),
  input({ type: "hidden", name: "callback", value: callback }),
  label(
    { ariaHidden: "true", className: "super-important-woah" },
    span({}, "Your Name"),
    input({ ariaHidden: "true", tabIndex: -1, type: "text", name: "name", autocomplete: "off" })
  ),
  button({}, span({}, "Subscribe"))
): iframe({ src: signupFormIframe, loading: `lazy` });