"use client";
import React from "react";
import useSchedule from "@/lib/useSchedule";
import TwoHourColumn from "./TwoHourColumn";

export default function ScheduleTable() {
  const { tcList, cellClickHandler, mergeHandler } = useSchedule();

  // 세 덩어리로 쪼개기
  const dividedList = [];
  for (let i = 0; i < tcList.length; i += 12) {
    dividedList.push(tcList.slice(i, i + 12));
  }

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-1 grid-flow-col gap-x-1 gap-y-3">
        {dividedList.map((div, i) => (
          <TwoHourColumn
            key={i}
            div={div}
            cellClickHandler={cellClickHandler}
          />
        ))}
      </div>
      <button className="btn btn-primary btn-sm" onClick={mergeHandler}>
        Merge!
      </button>
      <button className="btn btn-primary btn-sm ml-3" onClick={() => {}}>
        Break!
      </button>
    </>
  );
}
