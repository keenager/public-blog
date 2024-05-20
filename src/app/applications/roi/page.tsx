"use client";
import { useEffect, useState } from "react";
import { BuyItems, Invest, ItemType } from "@/models/roiModels";
import AddDataForm from "@/app/_components/apps/roi/AddDataForm";
import RoiTable from "@/app/_components/apps/roi/RoiTable";
import MainTitle from "@/app/_components/common/main-title";
import dayjs from "dayjs";

export type DataType = { date: string; price: number };

export default function ROIPage() {
  // const invs = [new Invest("2024-3-1", 1000), new Invest("2024-3-10", 1100)];
  const todayStr = dayjs().format("YYYY-MM-DD");
  const todayPrice = 1400;
  const [investItem, setInvestItem] = useState<ItemType>(BuyItems[0]);
  const [curInvestData, setCurInvest] = useState<Invest>(
    new Invest(todayStr, 0)
  );
  const [investList, setInvestList] = useState<Invest[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem("roiData");
    if (storage) {
      const savedData: DataType[] = JSON.parse(storage);
      console.log("savedData", savedData);
      const loadedInvestList = savedData.map(
        ({ date, price }) => new Invest(date, price)
      );
      setInvestList(loadedInvestList);
    } else {
      setInvestList([]);
    }
  }, []);

  return (
    <>
      <MainTitle>투자수익률</MainTitle>
      <AddDataForm
        updateCurData={setCurInvest}
        updateList={setInvestList}
        updateItem={setInvestItem}
      />
      <p>
        오늘: {todayStr} &emsp; 오늘 {investItem.value} 가격: {todayPrice}원
      </p>
      <RoiTable investData={curInvestData} todayPrice={todayPrice} />
      <p>저장된 데이터</p>
      <RoiTable investData={investList} todayPrice={todayPrice} />
    </>
  );
}
