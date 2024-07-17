import { BuyItems } from "@/models/roiModels";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function TodaySection({
  todayStr,
  investItem,
  todayPrice,
  setTodayPrice,
}: {
  todayStr: string;
  investItem: (typeof BuyItems)[number];
  todayPrice: number;
  setTodayPrice: Dispatch<SetStateAction<number>>;
}) {
  const todayPriceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newPrice = +event.target.value;
    setTodayPrice(newPrice);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-evenly md:items-center">
      <p className="text-center text-xl">{todayStr}</p>
      <label className="input input-bordered w-full max-w-xs flex items-center gap-2 my-1">
        <p className="basis-6/12">오늘 {investItem.value} 가격</p>
        <div className="basis-5/12">
          <input
            type="number"
            value={todayPrice.toString()}
            min={0}
            // className="grow "
            onChange={todayPriceChangeHandler}
            className="w-full text-right bg-inherit"
          />
        </div>
        <p className="basis-1/12 text-center">원</p>
      </label>
    </div>
  );
}
