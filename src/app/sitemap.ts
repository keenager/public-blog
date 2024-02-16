import { getFileNames } from "@/lib/api";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const fileNames = getFileNames();
  const routeList = fileNames.map((fileName) => {
    const slug = fileName.replace(".md", "");
    return { url: `https://redtraining.vercel.app/blog/posts/${slug}` };
  });
  return [
    { url: "https://redtraining.vercel.app" },
    { url: "https://redtraining.vercel.app/blog" },
    ...routeList,
  ];
}
