"use client";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import dayjs from "dayjs";
import { Invest } from "@/models/roiModels";

export default function AddDataForm({
  updateCurData,
  updateList,
}: {
  updateCurData: Dispatch<SetStateAction<Invest>>;
  updateList: Dispatch<SetStateAction<Invest[]>>;
}) {
  const [date, setDate] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setDate(dayjs().format("YYYY-MM-DD"));
  }, []);

  const dateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setDate((date) => newDate);
    updateCurData((prev) => new Invest(newDate, prev.buyPrice));
  };

  const priceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newPrice = +event.target.value;
    setPrice(newPrice);
    updateCurData((prev) => new Invest(prev.buyDate, newPrice));
  };

  const saveHandler = () => {
    const newItem = new Invest(date, price);
    updateList((list) => [...list, newItem]);
    setDate(dayjs().format("YYYY-MM-DD"));
    setPrice(0);
    updateCurData((prev) => new Invest(date, 0));
  };

  return (
    <div className="addForm m-1">
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
