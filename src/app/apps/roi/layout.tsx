import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../../_components/common/loading";

export const metadata: Metadata = {
  title: "수익률 계산기",
  description: "투자 수익률(Return On Investment)을 계산하는 앱입니다.",
};

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
