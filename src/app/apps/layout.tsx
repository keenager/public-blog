import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../_components/common/loading";

export const metadata: Metadata = {
  title: "내가 만든 앱들",
  description: "내가 만든 앱들",
};

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
