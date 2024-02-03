"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MainTitle from "@/app/_components/common/main-title";
import PostCard from "@/app/_components/blog/post-card";
import { getAllPostsAction } from "@/lib/actions";
import { tagRouteList } from "@/lib/constants";
import { Post } from "@/types/post";

export default function BlogPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("tag");
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    (async function () {
      let posts = await getAllPostsAction();
      if (query) {
        posts = posts.filter((post) => {
          const tagRoute = tagRouteList.find((route) =>
            route.href.includes(query)
          );
          return post.tag === tagRoute?.name;
        });
      }
      setPostList(posts);
    })();
  }, [query]);

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
