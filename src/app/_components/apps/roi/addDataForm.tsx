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
  updateList,
}: {
  updateList: Dispatch<SetStateAction<Invest[]>>;
}) {
  const [date, setDate] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setDate(dayjs().format("YYYY-MM-DD"));
  }, []);

  const dateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDate((date) => event.target.value);
  };

  const priceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(+event.target.value);
    setPrice(+event.target.value);
  };

  const saveHandler = () => {
    const newItem = new Invest(date, price);
    updateList((list) => [...list, newItem]);
  };

  return (
    <>
      <label className="input input-bordered w-full max-w-xs flex items-center gap-2">
        <p className="basis-3/12">산 날</p>
        <input
          type="date"
          value={date}
          className="grow basis-9/12"
          onChange={dateChangeHandler}
        />
      </label>
      <label className="input input-bordered w-full max-w-xs flex items-center gap-2">
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
      <button className="btn btn-primary" onClick={saveHandler}>
        저 장
      </button>
    </>
  );
}
