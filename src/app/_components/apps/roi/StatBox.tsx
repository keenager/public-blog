import { Invest } from "@/models/roiModels";
import Stat from "./Stat";

export default function StatBox({
  data,
  todayPrice,
}: {
  data: Invest;
  todayPrice: number;
}) {
  const buyValue = data.buyPrice * data.buyQuantity;
  const todayValue = todayPrice * data.buyQuantity;
  const profit = todayValue - buyValue;
  const profitRate = (profit / buyValue) * 100;

  return (
    <div className="grid gap-3 grid-cols-3 bg-cyan-950 rounded-md p-3 my-3">
      <div className="col-span-3">{data.buyDate}</div>
      <div className="divider col-span-3 my-0"></div>
      <Stat title="매수가(100 JPY)" value={data.buyPrice} />
      <Stat title="매수엔(JPY)" value={data.buyQuantity} />
      <Stat title="매수금(KRW)" value={buyValue} />
      <Stat title="수익(KRW)" value={profit} />
      <Stat title="수익률" value={profitRate} />
      <Stat title="평가금(KRW)" value={todayValue} />
    </div>
  );
}
