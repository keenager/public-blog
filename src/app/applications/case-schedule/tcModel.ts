export class TcUnit {
  time: string;
  caseNum: number;
  idx: number;
  isSelected: boolean;
  span: number;
  isHidden: boolean;

  constructor(
    time: string,
    caseNum: number,
    idx: number = 0,
    span: number = 1,
    isHidden: boolean = false
  ) {
    this.time = time;
    this.caseNum = caseNum;
    this.idx = idx;
    this.isSelected = false;
    this.span = span;
    this.isHidden = isHidden;
  }
}

export function getTimeList() {
  let result: string[] = [];
  for (let h = 10; h <= 17; h++) {
    if (h === 12 || h === 13) continue;
    for (let m = 0; m < 60; m += 10) {
      result.push(h + ":" + (m === 0 ? "00" : m));
    }
  }
  return result;
}
