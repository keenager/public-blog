import { Invest } from "@/models/roiModels";
import StatBox from "../../_components/apps/roi/StatBox";
import { Dispatch, SetStateAction } from "react";

export default function ListSection({
  investData,
  todayPrice,
  updateList,
}: {
  investData: Invest[];
  todayPrice: number;
  updateList: Dispatch<SetStateAction<Invest[]>>;
}) {
  return investData.length < 0 ? (
    <p>저장된 데이터가 없습니다!</p>
  ) : (
    investData.map((d) => (
      <StatBox key={d.id} todayPrice={todayPrice} data={d} />
    ))
  );
}
