import { useState } from "react";
import { getTimeList, TcUnit } from "../models/tcModel";

type ReturnType = {
  tcList: TcUnit[];
  cellClickHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  mergeHandler: () => void;
  breakHandler: () => void;
};

export default function useSchedule(): ReturnType {
  const [tcList, setTcList] = useState(
    getTimeList().map((time, i) => new TcUnit(time, 1, i))
  );
  const [firstIdx, setfirstIdx] = useState(0);
  const [secondIdx, setsecondIdx] = useState(0);
  const [cellClickNum, setCellClickNum] = useState(0);

  function minmax(num1: number, num2: number) {
    const max = Math.max(num1, num2);
    const min = Math.min(num1, num2);
    return [min, max];
  }

  function undo(start: number, end: number, list: TcUnit[]) {
    for (let i = start; i <= end; i++) {
      list[i].isSelected = false;
    }
    setfirstIdx(0);
    setsecondIdx(0);
    setCellClickNum(0);
    setTcList(list);
  }

  const cellClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetIdx = tcList.findIndex((tc) => tc.time === e.currentTarget.id);
    const newList = [...tcList];

    switch (cellClickNum) {
      case 0:
        newList[targetIdx].isSelected = true;
        setfirstIdx(targetIdx);
        setCellClickNum((prev) => prev + 1);
        break;
      case 1:
        if (targetIdx === firstIdx) {
          undo(firstIdx, targetIdx, newList);
          return;
        }
        const [min, max] = minmax(firstIdx, targetIdx);
        for (let i = min; i <= max; i++) {
          newList[i].isSelected = true;
        }
        setsecondIdx(targetIdx);
        setCellClickNum((prev) => prev + 1);
        break;
      case 2:
        const [min2, max2] = minmax(firstIdx, secondIdx);
        undo(min2, max2, newList);
        return;
    }
    setTcList(newList);
  };

  const mergeHandler = () => {
    const [min, max] = minmax(firstIdx, secondIdx);

    // 셀 하나만 선택한 경우 중단
    // 점심시간 전후에 걸쳐 병합할 일은 없으므로 중단
    if (cellClickNum !== 2 || (min <= 11 && 12 <= max)) {
      undo(min, max, tcList);
      return;
    }

    function merge(start: number, end: number) {
      newList[start].span = end - start + 1;
      for (let i = start + 1; i <= end; i++) {
        newList[i].isHidden = true;
      }
    }
    const newList = [...tcList];
    if (min <= 23 && 24 <= max) {
      // 선택범위가 한 컬럼을 넘어가는 경우에 관한 처리
      merge(min, 23);
      merge(24, max);
    } else {
      // 일반적인 경우에 관한 처리
      merge(min, max);
      newList[min].span = newList[min].span + newList[max].span - 1; // 이미 병합된 셀과 함께 병합 가능.
    }
    setTcList(newList);
    undo(min, max, newList);
  };

  function breakMerge(list: TcUnit[]) {
    const [min, max] = minmax(firstIdx, secondIdx);
    if (list[min].span > 1) {
      for (let i = min + 1; i < min + list[min].span; i++) {
        list[i].isSelected = false;
        list[i].isHidden = false;
      }
    }
    for (let i = min; i <= max; i++) {
      list[i].isSelected = false;
      list[i].span = 1;
      list[i].isHidden = false;
    }
    setfirstIdx(0);
    setsecondIdx(0);
    setCellClickNum(0);
    setTcList(list);
  }

  function breakHandler() {
    // setTcList();
  }

  return { tcList, cellClickHandler, mergeHandler, breakHandler };
}
