import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { tagRouteList } from "./constants";
import { Post } from "@/types/post";

const postsDirectory = join(process.cwd(), "_posts");

export function getFileNames() {
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

export function getPostsByTag(tag: string): Post[] {
  const fileNames = getFileNames();
  const tagName = tagRouteList.find((route) => route.href.includes(tag))?.name;
  const posts = fileNames
    .map((fileName) => getPostBySlug(fileName))
    .filter((post) => post.tag === tagName)
    .sort((p1, p2) => (p1.updateDate > p2.updateDate ? -1 : 1));
  return posts;
}
