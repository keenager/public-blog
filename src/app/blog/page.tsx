import MainTitle from "@/app/_components/common/main-title";
import PostCard from "@/app/_components/blog/post-card";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/types/post";

export default async function BlogPage() {
  const postList: Post[] = getAllPosts();
  return (
    <>
      <MainTitle>블로그</MainTitle>
      <section className="my-7 flex flex-col justify-center gap-8 md:grid md:grid-cols-2">
        {postList.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </section>
    </>
  );
}
