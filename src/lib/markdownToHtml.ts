import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkBreak from "remark-breaks";
import html from "remark-html";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkBreak)
    .use(html)
    .process(markdown);
  return result.toString();
}
