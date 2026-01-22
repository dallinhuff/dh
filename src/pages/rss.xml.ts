import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const notes = (await getCollection("notes")).sort(
    (a, b) =>
      (b.data.pubDate?.valueOf() ?? 0) - (a.data.pubDate?.valueOf() ?? 0),
  );

  return rss({
    title: "Dallin Huff (Notes)",
    description: "",
    site: context.site!,
    items: notes.map((note) => ({ ...note.data, link: `/notes/${note.id}` })),
    customData: `<language>en-us</language>`,
  });
}
