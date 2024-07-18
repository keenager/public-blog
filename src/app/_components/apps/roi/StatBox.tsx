import { Invest } from "@/models/roiModels";
import Stat from "./Stat";

export default function StatBox({
  data,
  todayPrice,
}: {
  data: Invest;
  todayPrice: number;
}) {
  const buyPriceTitle = `매수가(${
    data.itemName === "dollar" ? "1 USD" : "100 JPY"
  })`;
  const buyQuantityTitle = `매수${
    data.itemName === "dollar" ? "달러(USD)" : "엔(JPY)"
  }`;
  const buyValue =
    data.itemName === "dollar"
      ? data.buyPrice * data.buyQuantity
      : Math.ceil((data.buyPrice / 100) * data.buyQuantity);
  const todayValue =
    data.itemName === "dollar"
      ? todayPrice * data.buyQuantity
      : Math.ceil((todayPrice / 100) * data.buyQuantity);
  const profit = todayValue - buyValue;
  const profitRate = (profit / buyValue) * 100;

  return (
    <div className="grid gap-3 grid-cols-3 bg-cyan-950 rounded-md p-3 my-3">
      <Stat title={buyPriceTitle} value={data.buyPrice} />
      <Stat title={buyQuantityTitle} value={data.buyQuantity} />
      <Stat title="매수금(KRW)" value={buyValue} />
      <Stat title="수익(KRW)" value={profit} />
      <Stat title="수익률" value={profitRate} />
      <Stat title="평가금(KRW)" value={todayValue} />
    </div>
  );
}
