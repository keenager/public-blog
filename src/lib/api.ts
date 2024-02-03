import { Post } from "@/types/post";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export function getFileNames() {
  console.log("postsDirectory", postsDirectory);
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(".md", "");
  const fullPath = join(postsDirectory, realSlug + ".md");
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);
  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const fileNames = getFileNames();
  const posts = fileNames
    .map((fileName) => getPostBySlug(fileName))
    .sort((p1, p2) => (p1.updateDate > p2.updateDate ? -1 : 1));
  return posts;
}
