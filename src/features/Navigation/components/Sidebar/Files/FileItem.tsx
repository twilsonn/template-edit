import React, { useMemo } from "react";
import Button from "@/components/Button";
import { TrashCan } from "@/assets/icons/TrashCan";
import { useAtom } from "jotai";
import { filesAtom } from "@/features/FileUpload";
import { CopyIcon } from "@/assets/icons";
import { sidebarControlAtom } from "@/features/Navigation";

const FileItem: React.FC<IFile & { id: string }> = ({
  id: fileId,
  name,
  type,
  lastModified,
  html,
}) => {
  const [files, setFiles] = useAtom(filesAtom);
  const [open, setOpen] = useAtom(sidebarControlAtom);

  const handleDeleteOnClick = useMemo(
    () => () => {
      setFiles(
        Object.entries(files)
          .filter(([id]) => id !== fileId)
          .reduce((a, v) => ({ ...a, [v[0]]: v[1] }), {})
      );
    },
    [fileId, files, setFiles]
  );

  const handleCopyOnClick = useMemo(
    () => () => {
      navigator.clipboard.writeText(html);
      setOpen(false);
    },
    [fileId, files, setFiles]
  );

  return (
    <li className="w-full bg-neutral-700 px-4 py-4 flex justify-between">
      <div>
        <p>files/{name}</p>
        <p className="text-sm text-neutral-300">
          last Updated: {new Date(lastModified).toDateString()}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button.Icon
          Icon={CopyIcon}
          className="group"
          iconClassName="w-5 h-5"
          onClick={handleCopyOnClick}
        />
        <Button.Icon
          Icon={TrashCan}
          className="group"
          iconClassName="group-hover:text-red-600 w-5 h-5"
          onClick={handleDeleteOnClick}
        />
      </div>
    </li>
  );
};

export default FileItem;
