import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkBreak from "remark-breaks";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import { h } from "hastscript";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreak)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      properties: { class: "anchor", "aria-hidden": "true", tabindex: "-1" },
      content(node) {
        return h("span.octicon-link");
      },
    })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
