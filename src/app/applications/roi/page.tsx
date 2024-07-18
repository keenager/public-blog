"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import AddDataForm from "@/app/_components/apps/roi/AddDataForm";
import { BuyItems, Invest, ItemNameType } from "@/models/roiModels";
import { getFilteredInvestList } from "@/lib/calcROI";
import TodaySection from "./TodaySection";
import ListSection from "./ListSection";

export type DataType = {
  id: string;
  name: ItemNameType;
  date: string;
  price: number;
  quantity: number;
};

export default function ROIPage() {
  const todayStr = dayjs().format("YYYY-MM-DD");
  const [todayPrice, setTodayPrice] = useState(0);
  const [investItem, setInvestItem] = useState<(typeof BuyItems)[number]>(
    BuyItems[0]
  );
  const [investList, setInvestList] = useState<Invest[]>([]);

  useEffect(() => {
    const loadedInvestList = getFilteredInvestList(investItem.name);
    setInvestList(loadedInvestList);
  }, [investItem.name]);

  return (
    <>
      {/* <MainTitle>투자수익률</MainTitle> */}
      {/* TODO: AddDataForm 부분을 Modal로 처리하기 */}
      <AddDataForm
        updateList={setInvestList}
        investItem={investItem}
        updateItem={setInvestItem}
      />
      <div className="divider">오늘</div>
      <TodaySection
        todayStr={todayStr}
        investItem={investItem}
        todayPrice={todayPrice}
        setTodayPrice={setTodayPrice}
      />
      <div className="divider mt-7">저장된 데이터</div>
      <ListSection
        investData={investList}
        todayPrice={todayPrice}
        updateList={setInvestList}
      />
    </>
  );
}
