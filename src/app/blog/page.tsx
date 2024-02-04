import MainTitle from "@/app/_components/common/main-title";
import PostList from "../_components/blog/post-list";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/types/post";

export default function BlogPage() {
  const allList: Post[] = getAllPosts();

  return (
    <>
      <MainTitle>블로그</MainTitle>
      <PostList postList={allList} />
    </>
  );
}
