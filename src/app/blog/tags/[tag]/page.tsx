import PostList from "@/app/_components/blog/post-list";
import MainTitle from "@/app/_components/common/main-title";
import { getPostsByTag } from "@/lib/api";
import { routeListByTag } from "@/lib/constants";

type Params = {
  params: { tag: string };
};

export default function FilteredListByTag({ params }: Params) {
  const filteredList = getPostsByTag(params.tag);
  const tagName =
    routeListByTag.find((route) => route.href.includes(params.tag))?.name || "";

  return (
    <>
      <MainTitle>블로그 ({tagName})</MainTitle>
      <PostList postList={filteredList} />
    </>
  );
}
