import "./github-markdown.css";
import "./footnote.css";

export default function PostBody({ content }: { content: string }) {
  return (
    <section
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
