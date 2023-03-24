import React, { useRef } from "react";
import { Footer } from "./Footer";

import { Templates } from "./Templates";
import { createTemplateModalOpen } from "./CreateTemplate";
import { useAtom } from "jotai";

interface ISidebar {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<ISidebar> = ({ open, setOpen }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useAtom(createTemplateModalOpen);

  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (
    evt
  ) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(evt.target as Node)
    ) {
      !modalOpen && setOpen(false);
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
        <Templates />
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
