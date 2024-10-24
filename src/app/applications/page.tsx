import MainTitle from "@/app/_components/common/main-title";
import Card from "../_components/common/card";
import { routeListOfApps } from "@/lib/constants";
import Link from "next/link";

export default function AppsPage() {
  return (
    <>
      <MainTitle>내가 만든 앱들</MainTitle>
      <AppList />
    </>
  );
}

function AppList() {
  return routeListOfApps.map((route) =>
    route.name === "개요" ? (
      ""
    ) : (
      <Link key={route.href} href={route.href}>
        <Card>{route.name}</Card>
      </Link>
    )
  );
}
