import { MailingListCollector } from "./../mailingListCollector/mailingListCollector.html.ts";
import { ComponentString, tmpl } from "../../depsServer.ts";
import { ClipboardButton } from "./../clipboardButton/clipboardButton.html.ts";
import { SectionTitle } from "../sectionTitle/sectionTitle.html.ts";
const { section, h1, span, form, div, ul, li, a, p, aside, img, h4 } = tmpl;

const classPrefix = "emailCampaign";

type EmailCampaignProps = {
  signupFormIframe: string;
};

export const EmailCampaign: ComponentString<EmailCampaignProps> = ({
  signupFormIframe,
}) =>
  section(
    { className: classPrefix },
    div(
      { className: `${classPrefix}Form` },
      img({
        src: "{{ staticRoot }}all-together.png",
        className: `${classPrefix}Image`,
        alt: "",
      }),
      h4(
        { className: `${classPrefix}Title` },
        span(null, "Free library"),
        " new releases straight to your inbox!"
      ),
      MailingListCollector({
        signupFormIframe,
        inputid: "campaign",
        callback: "https://www.gdquest.com",
      }),
      p(
        { className: `${classPrefix}Disclaimer` },
        "By subscribing, you agree to receive the latest announcements, releases, and sales from GDQuest. Read our",
        a({ href: "#" }, "privacy policy")
      )
    )
  );
