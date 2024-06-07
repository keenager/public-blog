import { DataType } from "@/app/applications/roi/page";
import { Invest } from "@/models/roiModels";
import dayjs from "dayjs";

export function getROI(invest: Invest, todayPrice: number) {
  const dayDiff = dayjs().diff(invest.buyDate, "day");

  const priceDiff = todayPrice - invest.buyPrice;

  const returnRate = ((priceDiff / invest.buyPrice) * 100).toFixed(2);

  const annualReturnRate = ((+returnRate / dayDiff) * 365).toFixed(2);

  return { dayDiff, priceDiff, returnRate, annualReturnRate };
}

export function getFilteredInvestList(name: string) {
  const storage = localStorage.getItem("roiData");
  if (!storage) return [];

  const savedData: DataType[] = JSON.parse(storage);
  console.log("savedData", savedData);
  console.log("name", name);
  const filteredData = savedData.filter((data) => data.name === name);
  const loadedInvestList = filteredData.map(
    ({ id, name, date, price, quantity }) =>
      new Invest(id, name, date, price, quantity)
  );
  return loadedInvestList;
}
