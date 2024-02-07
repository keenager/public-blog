import "./github-markdown.css";

export default function PostBody({ content }: { content: string }) {
  return (
    <section>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}
