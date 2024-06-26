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
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setDate(dayjs().format("YYYY-MM-DD"));
  }, []);

  const dateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setDate((date) => newDate);
    updateCurData(
      (prev) =>
        new Invest(
          prev.id,
          prev.itemName,
          newDate,
          prev.buyPrice,
          prev.buyQuantity
        )
    );
  };

  const priceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newPrice = +event.target.value;
    setPrice(newPrice);
    updateCurData(
      (prev) =>
        new Invest(
          prev.id,
          prev.itemName,
          prev.buyDate,
          newPrice,
          prev.buyQuantity
        )
    );
  };

  const quantityChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = +event.target.value;
    setQuantity(newQuantity);
    updateCurData(
      (prev) =>
        new Invest(
          prev.id,
          prev.itemName,
          prev.buyDate,
          prev.buyPrice,
          newQuantity
        )
    );
  };

  const itemChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const newItem = BuyItems.find((item) => item.value === event.target.value)!;
    updateItem(newItem);
    updateCurData(
      (prev) =>
        new Invest(
          prev.id,
          newItem.name,
          prev.buyDate,
          prev.buyPrice,
          prev.buyQuantity
        )
    );
    // const loadedInvestList = getFilteredInvestList(newItem.name);
    // updateList(loadedInvestList);
  };

  const saveHandler = () => {
    const prevData: DataType[] = JSON.parse(
      localStorage.getItem("roiData") ?? "[]"
    );
    const id = new Date().getTime().toString();
    localStorage.setItem(
      "roiData",
      JSON.stringify([
        ...prevData,
        {
          id,
          name: investItem.name,
          date,
          price,
          quantity,
        },
      ])
    );
    updateList((list) => [
      ...list,
      new Invest(id, investItem.name, date, price, quantity),
    ]);
    setDate(dayjs().format("YYYY-MM-DD"));
    setPrice(0);
    setQuantity(0);
    updateCurData(
      (prev) => new Invest("initialID", investItem.name, date, 0, 0)
    );
  };

  return (
    <div className="addForm m-1 flex flex-col items-center">
      <label className="input input-bordered w-full max-w-xs flex items-center gap-2 my-1">
        <p className="basis-4/12">종목 선택</p>
        <div className="basis-8/12">
          <select
            className="select select-ghost  w-full"
            onChange={itemChangeHandler}
          >
            {BuyItems.map((item) => (
              <option key={item.name}>{item.value}</option>
            ))}
          </select>
        </div>
      </label>
      <label className="input input-bordered w-full max-w-xs flex items-center gap-2 my-1">
        <p className="basis-4/12">산 날</p>
        <div className="basis-8/12">
          <input
            type="date"
            value={date}
            className="w-full bg-inherit"
            onChange={dateChangeHandler}
          />
        </div>
      </label>
      <label className="input input-bordered w-full max-w-xs flex items-center gap-2 my-1">
        <p className="basis-4/12">살 때 가격</p>
        <div className="basis-5/12">
          <input
            type="number"
            value={price.toString()}
            min={0}
            className="grow w-full text-right bg-inherit"
            onChange={priceChangeHandler}
          />
        </div>
        <p className="basis-3/12 text-center">원</p>
      </label>
      <label className="input input-bordered w-full max-w-xs flex items-center gap-2 my-1">
        <p className="basis-4/12">수량</p>
        <div className="basis-5/12">
          <input
            type="number"
            value={quantity.toString()}
            min={0}
            className="w-full text-right bg-inherit"
            onChange={quantityChangeHandler}
          />
        </div>
        <p className="basis-3/12 text-center">{investItem.value}</p>
      </label>
      <div className="w-full max-w-xs flex justify-end">
        <button className="btn btn-primary my-1" onClick={saveHandler}>
          저 장
        </button>
      </div>
    </div>
  );
}
