"use client";
import React from "react";
import MainBar from "./navBarMain";
import SideBar from "./navBarSide";

export default function Navbar() {
  return (
    <div className="drawer drawer-end">
      {/* checked ? show : hide */}
      <MainBar />
      <SideBar />
    </div>
  );
}
