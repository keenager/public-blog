"use server";

import { getAllPosts } from "./api";

export async function getAllPostsAction() {
  return getAllPosts();
}
