import dayjs from "dayjs";

export type ItemType = { name: string; value: string };
export const BuyItems: ItemType[] = [
  { name: "dollar", value: "달러($)" },
  { name: "yen", value: "엔(¥)" },
];

export class Invest {
  // _itemName: string;
  _buyDate: string;
  _buyPrice: number;
  constructor(buyDate: string, buyPrice: number) {
    // this._itemName = itemName;
    this._buyDate = buyDate;
    this._buyPrice = buyPrice;
  }

  // get itemName() {
  //   return this._itemName;
  // }

  get buyDate() {
    return dayjs(this._buyDate).format("YYYY-MM-DD");
  }

  get buyPrice() {
    return this._buyPrice;
  }

  get today() {
    return dayjs().format("YYYY-MM-DD");
  }
}
