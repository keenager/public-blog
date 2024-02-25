import PostBody from "@/app/_components/blog/post-body";
import PostHeader from "@/app/_components/blog/post-header";
import GoogleAd from "@/app/_components/common/google-ad";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { Metadata } from "next";

type Params = {
  params: { slug: string };
};

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content || "");
  return (
    <>
      <PostHeader
        title={post.title}
        createDate={post.createDate}
        updateDate={post.updateDate}
        tag={post.tag}
      />
      <PostBody content={content} />
      <GoogleAd />
    </>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  return {
    title: post.title,
    description: post.description,
  };
}
