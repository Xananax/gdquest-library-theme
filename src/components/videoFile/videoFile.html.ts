import { tmpl, ImageResourceInfo } from "../../depsServer.ts";
const {
  video,
  source,
  div,
  a,
  span,
} = tmpl;

const mimeTypes = {
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/mov",
  ogg: "video/ogg",
  ogv: "video/ogv",
};

interface VideoFileProps {
  src: string;
  className?: string;
  useDefaultAspectRatio?: boolean;
  placeholder?: ImageResourceInfo;
  rounded?: boolean;
  priority?: boolean;
}

const classPrefix = 'videoFile';

export function VideoFile({
  src,
  className,
  /** If true, applies a 16/9 aspect ratio (the one we use most commonly) */
  useDefaultAspectRatio = true,
  rounded = true,
}: VideoFileProps) {
  
  const mimeType =
    mimeTypes[
      (src.split(".").pop() ?? "").toLowerCase() as keyof typeof mimeTypes
    ];

  if (mimeType == null) {
    return '';
  }

  return div(
    {
      className: [
        classPrefix,
        className,
        useDefaultAspectRatio && `${classPrefix}UseDefaultAspectRatio`,
        rounded && `${classPrefix}Rounded`,
      ],
    },
    video(
      {
        src,
        className: `${classPrefix}Video`,
        width: 100,
        height: 100,
        autoplay: false,
        muted: true,
        loop: true,
        controls: true,
        playsInline: true,
      },
      source({ "data-src": src, type: mimeType }),
      "Your browser does not support the video tag. ",
      a({ href: src }, "Download the video instead")
    ),
    div(
      { className: `${classPrefix}ButtonsContainer` },
      a(
        {
          className: `${classPrefix}ButtonsContainerButtonNewTab`,
          href: src,
          target: "_blank",
          title: "open in new tab",
        },
        span(null, "open in new tab")
      )
    )
  );
}
