import PostList from "@/app/_components/blog/post-list";
import MainTitle from "@/app/_components/common/main-title";
import { getPostsByTag } from "@/lib/api";

type Params = {
  params: { tag: string };
};

export default function FilteredListByTag({ params }: Params) {
  const filteredList = getPostsByTag(params.tag);

  return (
    <>
      <MainTitle>블로그</MainTitle>
      <PostList postList={filteredList} />
    </>
  );
}
