import { Invest } from "@/models/roiModels";
import RoiTableRow from "./RoiTableRow";
import { Dispatch, SetStateAction } from "react";

export default function RoiTable({
  investData,
  todayPrice,
  updateList,
}: {
  investData: Invest[] | Invest;
  todayPrice: number;
  updateList: Dispatch<SetStateAction<Invest[]>>;
}) {
  const tableBody = getTableBody(investData, todayPrice, updateList);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="bg-base-300">
            <th></th>
            <th>종목</th>
            <th>산 날짜</th>
            <th>산 가격</th>
            <th>가격 차이</th>
            <th>수량</th>
            <th>예상 손익</th>
            <th>예상 손익률</th>
            {/* <th>날짜 차이</th>
            <th>연환산 수익률</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
}

const getTableBody = (
  investData: Invest[] | Invest,
  todayPrice: number,
  updateList: Dispatch<SetStateAction<Invest[]>>
) => {
  if (Array.isArray(investData)) {
    if (investData.length > 0) {
      return investData.map((inv, idx) => (
        <RoiTableRow
          key={inv.id}
          idx={idx}
          investData={inv}
          todayPrice={todayPrice}
          updateList={updateList}
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
      <RoiTableRow
        idx={0}
        investData={investData}
        todayPrice={todayPrice}
        updateList={updateList}
      />
    );
  }
};
