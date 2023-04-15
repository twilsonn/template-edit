import React, { useMemo } from "react";
import Button from "@/components/Button";
import { TrashCan } from "@/assets/icons/TrashCan";
import { useAtom } from "jotai";
import { filesAtom } from "@/features/FileUpload";

const FileItem: React.FC<IFile & { id: string }> = ({
  id: fileId,
  name,
  type,
  lastModified,
}) => {
  const [files, setFiles] = useAtom(filesAtom);
  // const [open, setOpen] = useAtom(sidebarControlAtom);

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

  return (
    <li className="w-full bg-neutral-700 px-4 py-4 flex justify-between">
      <div>
        <p>{name}</p>
        <p className="text-sm text-neutral-300">
          last Updated: {new Date(lastModified).toDateString()}
        </p>
      </div>
      <div className="flex items-center space-x-2">
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
