"use client";
import AddDataForm from "@/app/_components/apps/roi/addDataForm";
import DisplayROI from "@/app/_components/apps/roi/displayROI";
import MainTitle from "@/app/_components/common/main-title";
import { Invest } from "@/models/roiModels";
import dayjs from "dayjs";
import { useState } from "react";

export default function ROIPage() {
  const [investList, setInvestList] = useState<Invest[]>([]);
  // const invs = [new Invest("2024-3-1", 1000), new Invest("2024-3-10", 1100)];
  const todayPrice = 1400;

  return (
    <>
      <MainTitle>투자수익률</MainTitle>
      <AddDataForm updateList={setInvestList} />
      <p>
        오늘: {dayjs().format("YYYY-MM-DD")} &emsp; 오늘 가격: {todayPrice}원
      </p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-base-300">
              <th></th>
              <th>산 날짜</th>
              <th>살때 가격</th>
              <th>날짜 차이</th>
              <th>가격 차이</th>
              <th>수익률</th>
              <th>연환산 수익률</th>
            </tr>
          </thead>
          <tbody>
            {investList.map((inv, idx) => (
              <DisplayROI
                key={idx}
                idx={idx}
                invest={inv}
                todayPrice={todayPrice}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
