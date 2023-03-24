import { Logo, Menu } from "@/assets/icons";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { atom, useAtom } from "jotai";

export const sidebarControlAtom = atom(false);

const Navigation = () => {
  const [open, setOpen] = useAtom(sidebarControlAtom);

  const handleMenuOnClick = () => {
    setOpen(!open);
  };

  return (
    <nav className="relative h-12 w-full bg-neutral-800">
      <div className="flex items-center h-full space-x-6">
        <button
          className="select-none h-full bg-neutral-700 hover:bg-neutral-600 px-6"
          onClick={handleMenuOnClick}
        >
          <Menu className="w-6 h-6 text-neutral-400" />
        </button>

        <button className="flex items-center space-x-3 select-none h-full">
          <Logo className="w-7 h-7 text-blue-400" />
          <h1 className="text-xl text-neutral-300 font-semibold font-brand">
            TemplateEdit
          </h1>
        </button>
      </div>

      <Sidebar open={open} setOpen={setOpen} />
    </nav>
  );
};

export default Navigation;
