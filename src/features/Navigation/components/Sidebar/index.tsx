import React, { useRef } from "react";
import { useAtom } from "jotai";
import { Link, Plus } from "../../../../assets/icons";
import Button from "../../../../components/Button";
import TemplateItem from "./TemplateItem";

import { templatesAtom } from "../../../EditorWindow/state";

import "./index.css";

interface ISidebar {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<ISidebar> = ({ open, setOpen }) => {
  const [templates] = useAtom(templatesAtom);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (
    evt
  ) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(evt.target as Node)
    ) {
      setOpen(false);
    }
  };

  return (
    <div
      className={`sidebar ${open ? "open" : ""}`}
      onClick={handleBackdropClick}
    >
      <div
        ref={sidebarRef}
        className="h-full bg-neutral-900 w-full max-w-lg flex flex-col justify-between"
      >
        <div className="pt-4 overflow-hidden">
          <div className="h-8 flex items-center px-4 justify-between">
            <h3 className="font-semibold text-xl">Templates</h3>
            <Button.Icon Icon={Plus} className="border border-neutral-800">
              New Template
            </Button.Icon>
          </div>
          <ul className="sidebar--template-list">
            {Array.from(templates).map(([id, template]) => {
              const { name, lastUpdated } = template;
              return (
                <TemplateItem key={id} name={name} lastUpdate={lastUpdated} />
              );
            })}
          </ul>
        </div>

        <footer className="select-none">
          <button className="h-16 border-t border-neutral-700 text-neutral-200 w-full flex items-center justify-center space-x-3 hover:text-blue-400 transition-colors">
            <p className="text-lg font-semibold">
              Open{" "}
              <span className="font-brand underline text-xl">TemplateEdit</span>{" "}
              on GitHub
            </p>
            <Link className="w-3 h-3 mb-2" />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Sidebar;
