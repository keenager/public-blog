import dayjs from "dayjs";

type ItemType = { name: string; value: string };
// export const BuyItems: ItemType[] = [
//   { name: "dollar", value: "달러($)" },
//   { name: "yen", value: "엔(¥)" },
// ] as const;

function createItemsArray<
  T extends readonly ItemType[] & Array<{ name: V; value: V }>,
  V extends string
>(...args: T) {
  return args;
}

export const BuyItems = createItemsArray(
  { name: "dollar", value: "달러($)" },
  { name: "yen", value: "엔(¥)" }
);

export type ItemNameType = (typeof BuyItems)[number]["name"];

export class Invest {
  _itemName: ItemNameType;
  _buyDate: string;
  _buyPrice: number;
  constructor(itemName: ItemNameType, buyDate: string, buyPrice: number) {
    this._itemName = itemName;
    this._buyDate = buyDate;
    this._buyPrice = buyPrice;
  }

  get itemName() {
    return this._itemName;
  }

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
