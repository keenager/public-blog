type Props = {
  id?: string;
  name: string;
  onClick?: (e: React.MouseEvent) => void;
};

export default function Badge({ id, name, onClick }: Props) {
  return (
    <span
      id={id}
      className="my-1 cursor-pointer rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-200 dark:text-blue-800"
      onClick={onClick}
    >
      {name}
    </span>
  );
}
