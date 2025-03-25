import {
  tmpl,
  ComponentString,
  ImageResourceInfo,
  ParsedDate,
} from "../../depsServer.ts";
import { FileInText as FileInText } from "../fileInText/fileInText.html.ts";
import { CalloutsListSingleItem } from "../calloutsListSingleItem/calloutsListSingleItem.html.ts";
import { glossaryListTerms } from "../glossaryList/glossaryListTerms.ts";
import { PromoGDSchool } from "../promoGDSchool/promoGDSchool.html.ts";
import { ItemDiscordInvite } from "../itemDiscordInvite/itemDiscordInvite.html.ts";
import { HeaderSiteSearch } from "../headerSiteSearch/headerSiteSearch.html.ts";
import { ClapsButton } from "../clapsButton/clapsButton.html.ts";
import { ClipboardButton } from "../clipboardButton/clipboardButton.html.ts";
const {
  h2,
  p,
  a,
  span,
  button,
  section,
  form,
  input,
  ul,
  li,
  img,
  div,
  h4,
  dl,
  dt,
  dd,
  ol,
  h3,
  em,
  article,
  nav,
  fieldset,
  legend,
  label,
  h5,
  noscript,
  meta,
  iframe
} = tmpl;

interface VideoEmbedProps {
  url: string;
  makeGifLike?: boolean;
  title?: string;
}

const youtubeUrlRegex =
  /(?:youtube\.com(?:\/watch\?.*v=|\/embed\/)|youtu\.be\/)(?<videoId>[a-zA-Z_\d-]+)\??/;

const vimeoUrlRegex =
  /vimeo\.com\/(video\/)?(?<videoId>\d+)(?:(\?h=|\/)(?<unlistedHash>[0-9a-z]+))?/;


const extractYoutubeVideo = (url: string) => {
  const videoId = url.match(youtubeUrlRegex)?.groups?.videoId ?? ""
  if (videoId != null && videoId !== "") {
    return {
      provider: "youtube",
      src: `https://www.youtube-nocookie.com/embed/${videoId}`
    }
  }
}

const extractVimeoVideo = (url: string, makeGifLike: boolean) => {
  const { videoId, unlistedHash } = url.match(vimeoUrlRegex)?.groups ?? {
    videoId: "",
    unlistedHash: "",
  };
  if (videoId != null && videoId !== "") {
    
    const params = [
      unlistedHash !== undefined ? `h=${unlistedHash}` : "",
      makeGifLike ? "autoplay=1&loop=1&muted=1&controls=0" : "",
      "badge=0",
    ].join("&");
    return {
      provider: "vimeo",
      src: `https://player.vimeo.com/video/${videoId}?${params}`
    }
  }
}

const extractVideo = (url: string, makeGifLike: boolean) => {
  return extractYoutubeVideo(url) ?? extractVimeoVideo(url, makeGifLike)
}

export const VideoEmbed = ({
  url = "",
  makeGifLike = false,
  title,
}: VideoEmbedProps) => {
  if (!url) {
    throw new Error("No `url` property provided for VideoEmbed");
  }

  const result = extractVideo(url, makeGifLike)
  if(result == null){
    throw new Error("Invalid video URL")
  }

  const { provider, src } = result

  return iframe({
    src,
    title: title ?? "Video",
    width:"560", height:"315", 
    referrerPolicy:"strict-origin-when-cross-origin",
    allow:"picture-in-picture; web-share",
    allowFullscreen: true,
    className: ["videoEmbed", `video-${provider}`],
    frameBorder: "0",
  });
};
