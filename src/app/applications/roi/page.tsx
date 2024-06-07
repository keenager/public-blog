"use client";
import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import AddDataForm from "@/app/_components/apps/roi/AddDataForm";
import RoiTable from "@/app/_components/apps/roi/RoiTable";
import MainTitle from "@/app/_components/common/main-title";
import { BuyItems, Invest, ItemNameType } from "@/models/roiModels";
import { getFilteredInvestList } from "@/lib/calcROI";

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
  const [curInvestData, setCurInvest] = useState<Invest>(
    new Invest("initialID", investItem.name, todayStr, 0, 0)
  );
  const [investList, setInvestList] = useState<Invest[]>([]);

  const todayPriceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newPrice = +event.target.value;
    setTodayPrice(newPrice);
  };

  useEffect(() => {
    const loadedInvestList = getFilteredInvestList(investItem.name);
    setInvestList(loadedInvestList);
  }, [investItem.name]);

  return (
    <>
      <MainTitle>투자수익률</MainTitle>
      <AddDataForm
        updateCurData={setCurInvest}
        updateList={setInvestList}
        investItem={investItem}
        updateItem={setInvestItem}
      />
      <div className="flex flex-col md:flex-row md:justify-evenly md:items-center my-1">
        <p>
          오늘: {todayStr}
          {/* &emsp;  */}
        </p>
        <label className="input input-bordered w-full max-w-xs flex items-center gap-2 my-1">
          <p className="basis-3/12">오늘 {investItem.value} 가격</p>
          <input
            type="number"
            value={todayPrice.toString()}
            min={0}
            className="grow basis-8/12"
            onChange={todayPriceChangeHandler}
          />
          <p className="basis-1/12 text-center">원</p>
        </label>
      </div>
      <RoiTable
        investData={curInvestData}
        todayPrice={todayPrice}
        updateList={setInvestList}
      />
      <p>저장된 데이터</p>
      <RoiTable
        investData={investList}
        todayPrice={todayPrice}
        updateList={setInvestList}
      />
    </>
  );
}
