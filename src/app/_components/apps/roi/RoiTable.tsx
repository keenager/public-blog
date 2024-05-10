import { Invest } from "@/models/roiModels";
import RoiTableRow from "./RoiTableRow";

export default function RoiTable({
  item,
  todayPrice,
}: {
  item: Invest[] | Invest;
  todayPrice: number;
}) {
  return (
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
          {Array.isArray(item) ? (
            item.map((inv, idx) => (
              <RoiTableRow
                key={idx}
                idx={idx}
                invest={inv}
                todayPrice={todayPrice}
              />
            ))
          ) : (
            <RoiTableRow idx={0} invest={item} todayPrice={todayPrice} />
          )}
        </tbody>
      </table>
    </div>
  );
}
