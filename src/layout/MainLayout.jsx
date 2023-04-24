import Header from "../components/Header";
import Footer from "../components/Footer";
import clsx from "clsx";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className={clsx("flex flex-col h-full")}>
      <Header />
      <div className={clsx("flex flex-col h-full")}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
