import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");

  const sortedPosts = posts.sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());

  return rss({
    title: "RSS-Feeds aus der Manufaktur",
    description: "mit Siegel der Unnachahmlichkeit & der Schöpfung von [ˈʁɛflɛksi̯oːn]",
    site: context.site,
    stylesheet: "/rss.xsl",
    items: sortedPosts.map((post) => {
      const category = post.data.category || "42";
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        link: `/${category}/${post.slug}/`,
      };
    }),
  });
}
