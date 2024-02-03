import Link from "next/link";

type Props = { href: string; name: string };

export default function MenuLink({ href, name }: Props) {
  return (
    <Link
      key={href}
      className="cursor-pointer text-gray-600
    transition-colors duration-300 hover:text-blue-500"
      href={href}
    >
      {name}
    </Link>
  );
}
