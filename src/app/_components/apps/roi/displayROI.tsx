import { getROI } from "@/lib/calcROI";
import { Invest } from "@/models/roiModels";

export default function DisplayROI({
  idx,
  invest,
  todayPrice,
}: {
  idx: number;
  invest: Invest;
  todayPrice: number;
}) {
  const { dayDiff, priceDiff, returnRate, annualReturnRate } = getROI(
    invest,
    todayPrice
  );
  return (
    <tr className="hover">
      <th>{idx + 1}</th>
      <td>{invest.buyDate}</td>
      <td>{invest.buyPrice}</td>
      <td>{dayDiff}</td>
      <td>{priceDiff}</td>
      <td>{returnRate}%</td>
      <td>{annualReturnRate}%</td>
    </tr>
  );
}
