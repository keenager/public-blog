"use client";
import { useState } from "react";
import { Invest } from "@/models/roiModels";
import AddDataForm from "@/app/_components/apps/roi/AddDataForm";
import RoiTable from "@/app/_components/apps/roi/RoiTable";
import MainTitle from "@/app/_components/common/main-title";
import dayjs from "dayjs";

export default function ROIPage() {
  // const invs = [new Invest("2024-3-1", 1000), new Invest("2024-3-10", 1100)];
  const todayStr = dayjs().format("YYYY-MM-DD");
  const todayPrice = 1400;
  const [curInvest, setCurInvest] = useState<Invest>(new Invest(todayStr, 0));
  const [investList, setInvestList] = useState<Invest[]>([]);

  return (
    <>
      <MainTitle>투자수익률</MainTitle>
      <AddDataForm updateCurData={setCurInvest} updateList={setInvestList} />
      <p>
        오늘: {todayStr} &emsp; 오늘 가격: {todayPrice}원
      </p>
      <RoiTable item={curInvest} todayPrice={todayPrice} />
      <p>저장된 데이터</p>
      <RoiTable item={investList} todayPrice={todayPrice} />
    </>
  );
}
