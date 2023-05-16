import React, { useEffect, useMemo, useRef } from "react";
import { decrypt, encrypt } from "crypto-js/aes";

import { atomWithLocalStorage } from "@/utils/AtomWithLocalStorage";
import { useAtom } from "jotai";
import { encode } from "js-base64";
import Button from "@/components/Button";
import { Upload } from "@/assets/icons";

export const filesAtom = atomWithLocalStorage<IFiles>("files", {});

const getTypeFromExtention = (name: string) => {
  const extension = name.split(".")[1];
  const script = ["js", "ts"];
  const style = ["css", "scss"];

  if (script.includes(extension)) {
    return "script";
  }

  if (style.includes(extension)) {
    return "style";
  }

  return "unknown";
};

const FileUpload: React.FC = () => {
  const [files, setFiles] = useAtom(filesAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useMemo(
      () => (e) => {
        if (e.target.files) {
          const file = e.target.files[0];

          if (file.size > 5242880) return;

          const reader = new FileReader();

          reader.onload = () => {
            if (reader.result && typeof reader.result === "string") {
              const encrypted = encrypt(reader.result, "test");
              const type = getTypeFromExtention(file.name);
              setFiles({
                ...files,
                [encode(file.name)]: {
                  name: file.name,
                  content: encrypted.toString(),
                  type,
                  lastModified: file.lastModified,
                  html:
                    type === "script"
                      ? `<script src="files/${file.name}"></script>`
                      : `<link href="files/${file.name}" />`,
                },
              });
            }
          };

          if (file) {
            reader.readAsText(file);
          }
        }
      },
      [files, setFiles]
    );

  return (
    <div className="">
      <Button.Icon
        Icon={Upload}
        className="border border-neutral-800"
        iconClassName="w-5 h-5"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload File
      </Button.Icon>

      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        name="file-upload"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default FileUpload;
