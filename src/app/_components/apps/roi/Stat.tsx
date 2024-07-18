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

  let newValue: string;
  if (title === "수익률") {
    newValue = value.toFixed(2) + "%";
  } else {
    const tempArr = value.toString().split("");
    if (tempArr[0] === "-") tempArr.shift();
    tempArr.reverse();

    const newArr = [];
    for (let i = 0; i < tempArr.length; i++) {
      newArr.push(tempArr[i]);
      if (i !== tempArr.length - 1 && (i + 1) % 3 === 0) newArr.push(",");
    }
    newValue = newArr.reverse().join("");
    if (value < 0) newValue = "-" + newValue;

    if (title.includes("엔")) {
      newValue = "¥" + newValue;
    } else if (title.includes("달러")) {
      newValue = "$" + newValue;
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
