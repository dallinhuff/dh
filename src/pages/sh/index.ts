import type { APIRoute } from "astro";

const RED = "\x1b[91m";
const YELLOW = "\x1b[93m";
const GREEN = "\x1b[92m";
const CYAN = "\x1b[96m";
const MAGENTA = "\x1b[95m";
const RESET_COLOR = "\x1b[39m";

const BOLD = "\x1b[1m";
const BOLD_OFF = "\x1b[22m";
const ITALIC = "\x1b[3m";
const ITALIC_OFF = "\x1b[23m";

const OSC = "\x1b]";
const ST = "\x1b\\";

const colors = [RED, YELLOW, GREEN, CYAN, MAGENTA];

const banner =
  `
          ██████╗  █████╗ ██╗     ██╗     ██╗███╗   ██╗    ██╗  ██╗██╗   ██╗███████╗███████╗
          ██╔══██╗██╔══██╗██║     ██║     ██║████╗  ██║    ██║  ██║██║   ██║██╔════╝██╔════╝
          ██║  ██║███████║██║     ██║     ██║██╔██╗ ██║    ███████║██║   ██║█████╗  █████╗
          ██║  ██║██╔══██║██║     ██║     ██║██║╚██╗██║    ██╔══██║██║   ██║██╔══╝  ██╔══╝
          ██████╔╝██║  ██║███████╗███████╗██║██║ ╚████║    ██║  ██║╚██████╔╝██║     ██║
          ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝
`
    .split("\n")
    .map((line, i) => `${colors[i % colors.length]}${line}`)
    .join("\n") + RESET_COLOR;

const body = `
  ┌─ About ───────────────────────────────┐ ┌─ Socials ───┬──────────────────────────────────────┐
  │                                       │ │             │                                      │
  │  Howdy, I'm Dallin.                   │ │  Github     │  https://github.com/dallinhuff       │
  │  Connect with my socials or use this  │ │  LinkedIn   │  https://linkedin.com/in/dallinhuff  │
  │  site to easily find my content!      │ │  Instagram  │  https://instagram.com/dallin.huff   │
  │                                       │ │  Discord    │  https://discord.gg/3k9YS8qm         │
  │                                       │ │             │                                      │
  └───────────────────────────────────────┘ └─────────────┴──────────────────────────────────────┘

     Legend

     $ curl -L dallinhuff.com/sh     Get this page
`
  .replaceAll(/─ (\w+) ─/g, `─${YELLOW}${BOLD} $1 ${RESET_COLOR}${BOLD_OFF}─`)
  .replaceAll(
    /(https\S+)/g,
    `${OSC}8;;$1${ST}${CYAN}$1${RESET_COLOR}${OSC}8;;${ST}`,
  )
  .replace("Legend", `${YELLOW}${BOLD}Legend${RESET_COLOR}${BOLD_OFF}`)
  .replaceAll(
    /\$ curl -L (\S+)(\s+)(.+)/g,
    `${CYAN}$ curl${RESET_COLOR} -L $1$2${MAGENTA}${ITALIC}$3${RESET_COLOR}${ITALIC_OFF}`,
  );

const content = banner + "\n" + body;

export const GET: APIRoute = () => {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
