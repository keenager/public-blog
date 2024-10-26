"use client";

import MainTitle from "@/app/_components/common/main-title";
import ScheduleTable from "../../_components/apps/case-schedule/ScheduleTable";
import CaseScheduleProvider from "./provider";

export default function ScheduleHome() {
  return (
    <CaseScheduleProvider>
      <MainTitle>기일부</MainTitle>
      <ScheduleTable />
    </CaseScheduleProvider>
  );
}
