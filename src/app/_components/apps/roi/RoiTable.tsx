import { Invest } from "@/models/roiModels";
import RoiTableRow from "./RoiTableRow";

export default function RoiTable({
  investData,
  todayPrice,
}: {
  investData: Invest[] | Invest;
  todayPrice: number;
}) {
  const tableBody = getTableBody(investData, todayPrice);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="bg-base-300">
            <th></th>
            <th>산 날짜</th>
            <th>살때 가격</th>
            <th>가격 차이</th>
            <th>수익률</th>
            <th>날짜 차이</th>
            <th>연환산 수익률</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
}

const getTableBody = (investData: Invest[] | Invest, todayPrice: number) => {
  if (Array.isArray(investData)) {
    if (investData.length > 0) {
      return investData.map((inv, idx) => (
        <RoiTableRow
          key={idx}
          idx={idx}
          investData={inv}
          todayPrice={todayPrice}
        />
      ));
    } else {
      return (
        <tr>
          <td colSpan={7} className="text-center">
            저장된 데이터가 없습니다!
          </td>
        </tr>
      );
    }
  } else {
    return (
      <RoiTableRow idx={0} investData={investData} todayPrice={todayPrice} />
    );
  }
};
