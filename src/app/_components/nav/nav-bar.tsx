"use client";
import React from "react";
import Link from "next/link";
import { routeList } from "@/lib/constants";
import MainBar from "./main-bar";
import SideBar from "./side-bar";

export const navbarItems = routeList.map(({ href, name }) => (
  <Link
    key={href}
    className="cursor-pointer text-gray-600
      transition-colors duration-300 hover:text-blue-500"
    href={href}
  >
    {name}
  </Link>
));

export default function Navbar() {
  return (
    <div className="drawer drawer-end">
      {/* checked ? show : hide */}
      <MainBar />
      <SideBar />
    </div>
  );
}
