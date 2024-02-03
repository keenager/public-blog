"use client";
import React from "react";
import MainBar from "./main-bar";
import SideBar from "./side-bar";

export default function Navbar() {
  return (
    <div className="drawer drawer-end">
      {/* checked ? show : hide */}
      <MainBar />
      <SideBar />
    </div>
  );
}
