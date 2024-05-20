"use client";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import dayjs from "dayjs";
import { DataType } from "@/app/applications/roi/page";
import { BuyItems, Invest } from "@/models/roiModels";

type PropsType = {
  updateCurData: Dispatch<SetStateAction<Invest>>;
  updateList: Dispatch<SetStateAction<Invest[]>>;
  investItem: (typeof BuyItems)[number];
  updateItem: Dispatch<SetStateAction<(typeof BuyItems)[number]>>;
};

export default function AddDataForm({
  updateCurData,
  updateList,
  investItem,
  updateItem,
}: PropsType) {
  const [date, setDate] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setDate(dayjs().format("YYYY-MM-DD"));
  }, []);

  const dateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setDate((date) => newDate);
    updateCurData((prev) => new Invest(prev.itemName, newDate, prev.buyPrice));
  };

  const priceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newPrice = +event.target.value;
    setPrice(newPrice);
    updateCurData((prev) => new Invest(prev.itemName, prev.buyDate, newPrice));
  };

  const itemChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const newItem = BuyItems.find((item) => item.value === event.target.value)!;
    updateItem(newItem);
    updateCurData(
      (prev) => new Invest(newItem.name, prev.buyDate, prev.buyPrice)
    );
    // const loadedInvestList = getFilteredInvestList(newItem.name);
    // updateList(loadedInvestList);
  };

  const saveHandler = () => {
    const prevData: DataType[] = JSON.parse(
      localStorage.getItem("roiData") ?? "[]"
    );
    localStorage.setItem(
      "roiData",
      JSON.stringify([...prevData, { name: investItem.name, date, price }])
    );
    updateList((list) => [...list, new Invest(investItem.name, date, price)]);
    setDate(dayjs().format("YYYY-MM-DD"));
    setPrice(0);
    updateCurData((prev) => new Invest(investItem.name, date, 0));
  };

  return (
    <div className="addForm m-1">
      <label className="input input-bordered w-full max-w-xs flex items-center gap-2 my-1">
        <p className="basis-4/12">종목 선택</p>
        <select
          className="select select-ghost w-full"
          onChange={itemChangeHandler}
        >
          {BuyItems.map((item) => (
            <option key={item.name}>{item.value}</option>
          ))}
        </select>
      </label>
      <label className="input input-bordered w-full max-w-xs flex items-center gap-2 my-1">
        <p className="basis-3/12">산 날</p>
        <input
          type="date"
          value={date}
          className="grow basis-9/12"
          onChange={dateChangeHandler}
        />
      </label>
      <label className="input input-bordered w-full max-w-xs flex items-center gap-2 my-1">
        <p className="basis-3/12">살 때 가격</p>
        <input
          type="number"
          value={price.toString()}
          min={0}
          className="grow basis-8/12"
          onChange={priceChangeHandler}
        />
        <p className="basis-1/12 text-center">원</p>
      </label>
      <button className="btn btn-primary my-1" onClick={saveHandler}>
        저 장
      </button>
    </div>
  );
}
