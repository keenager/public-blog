import Badge from "../common/badge";
import MainTitle from "../common/main-title";

type Props = {
  title: string;
  createDate: string;
  updateDate: string;
  tag: string;
};

export default function PostHeader({
  title,
  createDate,
  updateDate,
  tag,
}: Props) {
  return (
    <section className="mb-5">
      <MainTitle>{title}</MainTitle>
      <div className="flex flex-col items-end">
        <p className="text-sm">처음 쓴 날: {createDate}</p>
        <p className="text-sm">고친 날: {updateDate}</p>
      </div>
      <Badge name={tag} />
    </section>
  );
}
