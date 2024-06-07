import { DataType } from "@/app/applications/roi/page";
import { getROI } from "@/lib/calcROI";
import { BuyItems, Invest } from "@/models/roiModels";
import { Dispatch, SetStateAction } from "react";

export default function RoiTableRow({
  idx,
  investData,
  todayPrice,
  updateList,
}: {
  idx: number;
  investData: Invest;
  todayPrice: number;
  updateList: Dispatch<SetStateAction<Invest[]>>;
}) {
  const { dayDiff, priceDiff, returnRate, annualReturnRate } = getROI(
    investData,
    todayPrice
  );
  const itemNameValue = BuyItems.find(
    (item) => item.name === investData.itemName
  )!.value;

  const deleteHandler = (
    // event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    console.log("id: " + id);
    const prevData: DataType[] = JSON.parse(
      localStorage.getItem("roiData") ?? "[]"
    );
    const newData = prevData.filter((data) => data.id !== id);
    localStorage.setItem("roiData", JSON.stringify(newData));
    updateList(
      newData.map((d) => new Invest(d.id, d.name, d.date, d.price, d.quantity))
    );
  };

  return (
    <tr className="hover">
      <th>{idx + 1}</th>
      <td>{itemNameValue}</td>
      <td>{investData.buyDate}</td>
      <td>{investData.buyPrice}</td>
      <td>{priceDiff}</td>
      <td>{investData.buyQuantity}</td>
      <td>{priceDiff * investData.buyQuantity}</td>
      <td>{returnRate}%</td>
      {/* <td>{dayDiff}</td>
      <td>{annualReturnRate}%</td> */}
      <td>
        <button
          className="btn btn-sm"
          onClick={() => deleteHandler(investData.id)}
        >
          삭제
        </button>
      </td>
    </tr>
  );
}
