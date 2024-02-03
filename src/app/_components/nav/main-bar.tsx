import { routeList } from "@/lib/constants";
import Link from "next/link";
import MenuLink from "./link";

export default function MainBar() {
  return (
    <>
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="flex justify-between bg-white/80 px-8 py-4 shadow-md backdrop-blur-md dark:bg-gray-900 md:px-16">
          <Link href="/" className="md:basis-1/6">
            RedTraining
          </Link>
          {/* Links */}
          <div className="hidden items-center space-x-16 md:flex md:justify-center md:basis-4/6">
            {routeList.map(({ href, name }) => (
              <MenuLink key={href} href={href} name={name} />
            ))}
          </div>
          <div className="md:basis-1/6" />
          <label htmlFor="nav-drawer" className="md:hidden">
            <MenuSVG />
          </label>
        </div>
      </div>
    </>
  );
}

function MenuSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="inline-block h-6 w-6 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  );
}
