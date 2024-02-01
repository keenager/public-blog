import Link from "next/link";
import TextLink from "../common/text-link";
import Card from "../common/card";
import { Post } from "@/types/post";
import Badge from "../common/badge";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      {/* 상단(태그, 날짜) */}
      {/* <div className="mb-5 flex items-center justify-between text-gray-500">
        <span className="text-sm">{post.createDate}</span>
      </div> */}
      {/* 제목 */}
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      {/* 요약 */}
      <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
        {post.description}
      </p>
      {/* 하단(글쓴이, 링크) */}
      <div className="flex items-center justify-between">
        <Badge name={post.tag} />
        <TextLink href={`/blog/${post.slug}`} style="inline-flex items-center">
          Read more &rarr;
        </TextLink>
      </div>
    </Card>
  );
}
