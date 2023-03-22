import React from "react";
import { Logo } from "../../assets/icons/Logo";
import { Menu } from "../../assets/icons/Menu";

const Navigation = () => {
  return (
    <nav className="h-12 w-full bg-neutral-800 flex items-center space-x-6">
      <button className="select-none h-full bg-neutral-700 hover:bg-neutral-600 px-6">
        <Menu className="w-6 h-6 text-neutral-400" />
      </button>

      <button className="flex items-center space-x-3 select-none h-full">
        <Logo className="w-8 h-8 text-blue-400" />
        <h1 className="text-xl text-neutral-50 tracking-wider font-semibold">
          TemplateEdit
        </h1>
      </button>
    </nav>
  );
};

export default Navigation;
