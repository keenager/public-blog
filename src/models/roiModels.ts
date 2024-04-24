import dayjs from "dayjs";

export class Invest {
  _buyDate: string;
  _buyPrice: number;
  constructor(buyDate: string, buyPrice: number) {
    this._buyDate = buyDate;
    this._buyPrice = buyPrice;
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
