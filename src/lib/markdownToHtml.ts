import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkBreak from "remark-breaks";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreak)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
