import type { APIRoute } from "astro";
import chalk from "chalk";

const HEADING = chalk.yellowBright.bold;
const LINK = chalk.cyanBright;
const HINT = chalk.magentaBright.italic;

const bannerColors = [
  chalk.redBright,
  chalk.yellowBright,
  chalk.greenBright,
  chalk.cyanBright,
  chalk.magentaBright,
];

const banner = `
         ██████╗  █████╗ ██╗     ██╗     ██╗███╗   ██╗    ██╗  ██╗██╗   ██╗███████╗███████╗
         ██╔══██╗██╔══██╗██║     ██║     ██║████╗  ██║    ██║  ██║██║   ██║██╔════╝██╔════╝
         ██║  ██║███████║██║     ██║     ██║██╔██╗ ██║    ███████║██║   ██║█████╗  █████╗
         ██║  ██║██╔══██║██║     ██║     ██║██║╚██╗██║    ██╔══██║██║   ██║██╔══╝  ██╔══╝
         ██████╔╝██║  ██║███████╗███████╗██║██║ ╚████║    ██║  ██║╚██████╔╝██║     ██║
         ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝
`
  .split("\n")
  .map((line, i) => bannerColors[i % bannerColors.length](line))
  .join("\n");

const body = `
  ┌─ About ───────────────────────────────┐ ┌─ Socials ───┬────────────────────────────────────┐
  │                                       │ │             │                                    │
  │  Howdy, I'm Dallin.                   │ │  Github     │  https://dallinhuff.com/github     │
  │                                       │ │  LinkedIn   │  https://dallinhuff.com/linkedin   │
  │  Connect with my socials or use this  │ │  Instagram  │  https://dallinhuff.com/instagram  │
  │  site to easily find my content!      │ │  Discord    │  https://dallinhuff.com/discord    │
  │                                       │ │             │                                    │
  └───────────────────────────────────────┘ └─────────────┴────────────────────────────────────┘

     Legend

     $ curl -L dallinhuff.com/sh     Get this page
`
  .replaceAll(/─ (\w+) ─/g, (_, boxTitle) => `─ ${HEADING(boxTitle)} ─`)
  .replaceAll(/https\S+/g, (url) => LINK(url))
  .replace("Legend", HEADING("Legend"))
  .replaceAll(/(┌─*)|(─*┬?─*┐)|│|(└─*┴?─*┘)/g, (border) => chalk.dim(border))
  .replaceAll(
    /\$ curl -L (\S+)(\s+)(.+)/g,
    (_, url, spacing, hintTxt) =>
      `${LINK("$ curl")} -L ${url}${spacing}${HINT(hintTxt)}`,
  );

const content = banner + "\n" + body;

export const GET: APIRoute = () => {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
