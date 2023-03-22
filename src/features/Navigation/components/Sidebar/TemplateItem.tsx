import React from "react";
import { PenToSquare } from "../../../../assets/icons";
import Button from "../../../../components/Button";
import { TrashCan } from "../../../../assets/icons/TrashCan";

interface ITemplateItem {
  name: string;
  lastUpdate: number;
}

const TemplateItem: React.FC<ITemplateItem> = ({ name, lastUpdate }) => {
  return (
    <li className="w-full bg-neutral-700 px-4 py-4 flex justify-between">
      <div>
        <p>{name}</p>
        <p className="text-sm text-neutral-300">
          last Updated: {new Date(lastUpdate).toDateString()}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button.Icon Icon={PenToSquare} />
        <Button.Icon
          Icon={TrashCan}
          className="group"
          iconClassName="group-hover:text-red-600"
        />
      </div>
    </li>
  );
};

export default TemplateItem;
