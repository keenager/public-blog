import PostCard from "./post-card";
import { Post } from "@/types/post";

export default function PostList({ postList }: { postList: Post[] }) {
  return (
    <section className="my-7 flex flex-col justify-center gap-8 md:grid md:grid-cols-2">
      {postList.map((post) => (
        <PostCard key={post.title} post={post} />
      ))}
    </section>
  );
}
