import FileUpload, { filesAtom } from "@/features/FileUpload";
import { useAtomValue } from "jotai";
import FileItem from "./FileItem";

const Files = () => {
  const files = useAtomValue(filesAtom);

  return (
    <div className="pt-4 overflow-hidden">
      <div className="h-8 flex items-center px-4 justify-between">
        <h3 className="font-semibold text-xl">Files</h3>
        <FileUpload />
      </div>
      <ul className="sidebar--template-list">
        {Object.entries(files).map(([id, file]) => {
          return <FileItem key={id} id={id} {...file} />;
        })}
      </ul>
    </div>
  );
};

export default Files;
