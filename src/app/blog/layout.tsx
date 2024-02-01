import { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그",
  description: "남기고 싶은 글들을 기록하는 페이지",
};

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
