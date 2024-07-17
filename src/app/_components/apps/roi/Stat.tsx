export default function Stat({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  let textColor = "text-white";
  if (title.includes("수익")) {
    if (value > 0) textColor = "text-red-500";
    else if (value < 0) textColor = "text-blue-500";
  }

  let newValue;
  if (title === "수익률") {
    newValue = value.toFixed(2) + "%";
  } else {
    const aaa = ("" + value).split("").reverse();
    const newArr = [];
    for (let i = 0; i < aaa.length; i++) {
      newArr.push(aaa[i]);
      if (i !== aaa.length - 1 && (i + 1) % 3 === 0) newArr.push(",");
    }
    newValue = newArr.reverse().join("");

    if (title.includes("엔")) {
      newValue = "¥" + newValue;
    } else {
      newValue = "₩" + newValue;
    }
  }

  return (
    <div className="text-center">
      <div className="stat-title text-xs">{title}</div>
      <div className={`stat-desc ${textColor} text-base`}>{newValue}</div>
    </div>
  );
}
