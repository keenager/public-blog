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
  updateList: Dispatch<SetStateAction<Invest[]>>;
  investItem: (typeof BuyItems)[number];
  updateItem: Dispatch<SetStateAction<(typeof BuyItems)[number]>>;
};

export default function AddDataForm({
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

  const priceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newPrice = +event.target.value;
    setPrice(newPrice);
  };

  const quantityChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = +event.target.value;
    setQuantity(newQuantity);
  };

  const itemChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const newItem = BuyItems.find((item) => item.value === event.target.value)!;
    updateItem(newItem);
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
  };

  const buyPriceTitle = investItem.name === "dollar" ? "1달러" : "100엔";

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
        <p className="basis-4/12">{buyPriceTitle}</p>
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
