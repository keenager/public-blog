import { TcUnit } from "@/models/tcModel";

export function TimeCell({ time }: { time: string }) {
  return (
    <div className="bg-base-100 border text-center content-center">{time}</div>
  );
}

export function CaseNumCell({
  tc,
  cellClickHandler,
}: {
  tc: TcUnit;
  cellClickHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
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
    <div
      id={tc.time}
      className={className}
      style={style}
      onClick={cellClickHandler}
    >
      {tc.caseNum}
    </div>
  );
}
