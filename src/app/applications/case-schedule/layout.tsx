import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../../_components/common/loading";

export const metadata: Metadata = {
  title: "기일부",
  description: "재판 기일 지정할 때 사용할 일정(캘린더) 관리 앱입니다.",
};

export default async function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
