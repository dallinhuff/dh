import type { APIRoute } from "astro";

const name = `
       ██████╗  █████╗ ██╗     ██╗     ██╗███╗   ██╗    ██╗  ██╗██╗   ██╗███████╗███████╗
       ██╔══██╗██╔══██╗██║     ██║     ██║████╗  ██║    ██║  ██║██║   ██║██╔════╝██╔════╝
       ██║  ██║███████║██║     ██║     ██║██╔██╗ ██║    ███████║██║   ██║█████╗  █████╗
       ██║  ██║██╔══██║██║     ██║     ██║██║╚██╗██║    ██╔══██║██║   ██║██╔══╝  ██╔══╝
       ██████╔╝██║  ██║███████╗███████╗██║██║ ╚████║    ██║  ██║╚██████╔╝██║     ██║
       ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝
`;

const lines = name.split("\n");
const colors = ["\x1b[91m", "\x1b[93m", "\x1b[92m", "\x1b[96m", "\x1b[95m"]; // red, yellow, green, cyan, magenta

const banner =
  lines.map((line, i) => `${colors[i % colors.length]}${line}`).join("\n") +
  "\x1b[0m";

const body = `

  ┌─About───────────────────────────────┐ ┌─Socials───┬────────────────────────────────────┐
  │                                     │ │           │                                    │
  │ Howdy, I'm Dallin.                  │ │ Github    │ https://github.com/dallinhuff      │
  │ Connect with my socials or use this │ │ LinkedIn  │ https://linkedin.com/in/dallinhuff │
  │ site to easily find my content!     │ │ Instagram │ https://instagram.com/dallin.huff  │
  │                                     │ │ Discord   │ https://discord.gg/3k9YS8qm        │
  │                                     │ │           │                                    │
  └─────────────────────────────────────┘ └───────────┴────────────────────────────────────┘

    Legend

    $ curl dallinhuff.com/sh     Get this page
`;

const content = banner + "\n" + body;

export const GET: APIRoute = () => {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
