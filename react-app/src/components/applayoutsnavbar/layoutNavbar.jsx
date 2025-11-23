import React from "react";
import Navbar from "../../../layouts/header/navbar";
import { Outlet } from "react-router-dom";

function LayoutNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default LayoutNavbar;
