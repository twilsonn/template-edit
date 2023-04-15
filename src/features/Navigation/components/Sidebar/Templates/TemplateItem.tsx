import React from "react";
import { PenToSquare } from "../../../../../assets/icons";
import Button from "../../../../../components/Button";
import { TrashCan } from "../../../../../assets/icons/TrashCan";
import { templatesAtom } from "@/features/EditorWindow/state";
import { useAtom } from "jotai";
import { createTemplateModalOpen } from "./CreateTemplate";
import { sidebarControlAtom } from "../../..";

interface ITemplateItem {
  id: string;
  name: string;
  lastUpdate: number;
}

const TemplateItem: React.FC<ITemplateItem> = ({ name, lastUpdate, id }) => {
  const [templatesData, setTemplatesData] = useAtom(templatesAtom);
  const [open, setOpen] = useAtom(sidebarControlAtom);

  const handleEditOnClick = () => {
    // activeTemplate
    setTemplatesData({
      ...templatesData,
      activeTemplate: id,
    });

    setOpen(false);
  };

  return (
    <li className="w-full bg-neutral-700 px-4 py-4 flex justify-between">
      <div>
        <p>{name}</p>
        <p className="text-sm text-neutral-300">
          last Updated: {new Date(lastUpdate).toDateString()}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button.Icon
          Icon={PenToSquare}
          iconClassName="w-5 h-5"
          onClick={handleEditOnClick}
        />
        <Button.Icon
          Icon={TrashCan}
          className="group"
          iconClassName="group-hover:text-red-600 w-5 h-5"
        />
      </div>
    </li>
  );
};

export default TemplateItem;
