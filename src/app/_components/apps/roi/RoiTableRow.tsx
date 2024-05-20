import { getROI } from "@/lib/calcROI";
import { BuyItems, Invest } from "@/models/roiModels";

export default function RoiTableRow({
  idx,
  investData,
  todayPrice,
}: {
  idx: number;
  investData: Invest;
  todayPrice: number;
}) {
  const { dayDiff, priceDiff, returnRate, annualReturnRate } = getROI(
    investData,
    todayPrice
  );
  const itemNameValue = BuyItems.find(
    (item) => item.name === investData.itemName
  )!.value;
  return (
    <tr className="hover">
      <th>{idx + 1}</th>
      <td>{itemNameValue}</td>
      <td>{investData.buyDate}</td>
      <td>{investData.buyPrice}</td>
      <td>{priceDiff}</td>
      <td>{returnRate}%</td>
      <td>{dayDiff}</td>
      <td>{annualReturnRate}%</td>
    </tr>
  );
}
