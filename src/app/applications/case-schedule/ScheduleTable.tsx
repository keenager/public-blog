"use client";
import React, { useState } from "react";
import { getTimeList, TcUnit } from "./tcModel";

export default function ScheduleTable() {
  const [tcList, setTcList] = useState(
    getTimeList().map((time, i) => new TcUnit(time, 1, i))
  );
  const [firstIdx, setfirstIdx] = useState(0);
  const [secondIdx, setsecondIdx] = useState(0);
  const [cellClickNum, setCellClickNum] = useState(0);

  // 세 덩어리로 쪼개기
  const dividedList = [];
  for (let i = 0; i < tcList.length; i += 12) {
    dividedList.push(tcList.slice(i, i + 12));
  }

  const cellClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("num", cellClickNum);
    // console.log("time", e.currentTarget.id);
    const targetIdx = tcList.findIndex((tc) => tc.time === e.currentTarget.id);
    // console.log("targetIdx", targetIdx);
    const newList = [...tcList];
    // newList[targetIdx].isSelected = !tcList[targetIdx].isSelected;
    // ++newList[targetIdx].span;
    // console.log("span", newList[targetIdx].span);
    // newList[targetIdx + 1].isHidden = true;
    switch (cellClickNum) {
      case 0:
        setCellClickNum((prev) => prev + 1);
        newList[targetIdx].isSelected = true;
        setfirstIdx(targetIdx);
        break;
      case 1:
        if (targetIdx === firstIdx) {
          newList[targetIdx].isSelected = false;
          setfirstIdx(0);
          setCellClickNum(0);
          break;
        }
        const max1 = targetIdx > firstIdx ? targetIdx : firstIdx;
        const min1 = targetIdx < firstIdx ? targetIdx : firstIdx;
        for (let i = min1; i <= max1; i++) {
          newList[i].isSelected = true;
        }
        setsecondIdx(targetIdx);
        setCellClickNum((prev) => prev + 1);
        break;
      case 2:
        const max2 = firstIdx > secondIdx ? firstIdx : secondIdx;
        const min2 = firstIdx < secondIdx ? firstIdx : secondIdx;
        for (let i = min2; i <= max2; i++) {
          newList[i].isSelected = false;
          newList[i].span = 1;
          newList[i].isHidden = false;
        }
        setfirstIdx(0);
        setsecondIdx(0);
        setCellClickNum(0);
        break;
    }
    setTcList(newList);
  };

  const mergeHandler = () => {
    if (cellClickNum !== 2) return;
    setTcList((prev) => {
      const newList = [...prev];
      //TODO: 선택범위가 한 컬럼을 넘어가는 경우에 관한 처리...
      const max = Math.max(firstIdx, secondIdx);
      const min = Math.min(firstIdx, secondIdx);

      newList[min].span = max - min + 1;
      for (let i = min + 1; i <= max; i++) {
        newList[i].isHidden = true;
      }

      return newList;
    });
    console.log("worked!");
  };

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-1 grid-flow-col gap-x-1 gap-y-3">
        {dividedList.map((div, i) => {
          return (
            <TwoHourTable key={i} div={div} clickHandler={cellClickHandler} />
          );
        })}
      </div>
      <button className="btn btn-primary btn-sm" onClick={mergeHandler}>
        Go!
      </button>
    </>
  );
}

function TwoHourTable({
  div,
  clickHandler,
}: {
  div: TcUnit[];
  clickHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  //   const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-2 grid-rows-12 grid-flow-col">
      {div.map((tc, i) => (
        <TimeCell key={i} time={tc.time} />
      ))}
      {div.map((tc, i) => (
        <CaseNumCell key={i} tc={tc} onClick={clickHandler} />
      ))}
    </div>
  );
}

function TimeCell({ time }: { time: string }) {
  return (
    <div className="bg-base-100 border text-center content-center">{time}</div>
  );
}

function CaseNumCell({
  tc,
  onClick,
}: {
  tc: TcUnit;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const startLine = (tc.idx % 12) + 1;
  const endLine = startLine + tc.span;
  const className =
    "bg-base-100 border text-center content-center" +
    (tc.isSelected ? " bg-red-500" : "") +
    // (tc.span > 1 ? ` row-start-${startLine} row-end-${endLine}` : "") +
    (tc.isHidden ? " hidden" : "");
  const style =
    tc.span > 1
      ? {
          gridRowStart: startLine,
          gridRowEnd: endLine,
        }
      : undefined;
  return (
    <div id={tc.time} className={className} style={style} onClick={onClick}>
      {tc.caseNum}
    </div>
  );
}

// function TimeCell({ time }: { time: string }) {
//   return (
//     <div className="bg-base-100 border text-center h-12 content-center">
//       {time}
//     </div>
//   );
// }

// function ContentCell({ time, content }: { time: string; content: string }) {
//   return (
//     <div
//       id={time}
//       className="bg-base-100 border text-center h-12 content-center"
//       data-is-selected={false}
//     >
//       {content}
//     </div>
//   );
// }
