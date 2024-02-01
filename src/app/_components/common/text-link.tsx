import Link from "next/link";

export default function TextLink({
  href,
  style,
  children,
}: {
  href: string;
  style?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`font-medium text-blue-600 hover:underline dark:text-blue-500 ${style}`}
    >
      {children}
    </Link>
  );
}
