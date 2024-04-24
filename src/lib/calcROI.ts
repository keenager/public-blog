import { Invest } from "@/models/roiModels";
import dayjs from "dayjs";

export function getROI(invest: Invest, todayPrice: number) {
  const dayDiff = dayjs().diff(invest.buyDate, "day");

  const priceDiff = todayPrice - invest.buyPrice;

  const returnRate = ((priceDiff / invest.buyPrice) * 100).toFixed(2);

  const annualReturnRate = ((+returnRate / dayDiff) * 365).toFixed(2);

  return { dayDiff, priceDiff, returnRate, annualReturnRate };
}
