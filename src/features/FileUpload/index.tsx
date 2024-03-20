import React, { useRef } from "react";
import { encrypt } from "crypto-js/aes";
import { atomWithLocalStorage } from "@/utils/AtomWithLocalStorage";
import { useAtom } from "jotai";
import { encode } from "js-base64";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import Dropzone, { Accept, DropEvent, FileRejection } from "react-dropzone";

export const filesAtom = atomWithLocalStorage<IFiles>("files", {
  "aW5kZXguanM=": {
    name: "index.js",
    content:
      "U2FsdGVkX18LlivuXuzAmXXK0cQkwJxmoXBW8Msc4v5MVL9bT68NM791v1wKdBN5HYLyscQCIo1jFmb/BVQTWACcp09W8SDoZdSuNDQsYmu9aL18Sw2SLuY1bINYuCJM0uZAydoAc9RYvPSqL1L9wC+JAsU2h16lJCrd4PEg34WxEHRuIXCiRY5Dz7NqbOdEdUK6wzRUwCnMi1rZVEZQY3x6MtdRZmB/Jqoxbl6qaRRKpykaaSfOJXgM8QxQbThP5iRmkutceZf0M0j/2AVvNN7O9tocTGppm4frKui0ITIzSIK4b3djNgWi372AmXQ26IpN9Hi0Jtq/0antk0SykoZBlmEY7nKxvxtUglrnHd6l/Lcwbku/Xo+uqI+MH8ij",
    type: "script",
    updatedAt: 1710968452951,
    createdAt: 1687614675741,
    html: '<script src="files/index.js"></script>',
    size: 262,
  },
});

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

type DropHandler = <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void;

const filesAccept: Accept = {
  ".js": [],
  ".jsx": [],
  ".css": [],
};

const FileUpload: React.FC = () => {
  const [files, setFiles] = useAtom(filesAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile: DropHandler = (filesAsList) => {
    const reader = new FileReader();

    if (filesAsList.length > 0) {
      for (const file of filesAsList) {
        if (file.size > 5242880) continue;

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
                updatedAt: new Date(Date.now()).getTime(),
                createdAt: file.lastModified,
                html:
                  type === "script"
                    ? `<script src="files/${file.name}"></script>`
                    : `<link href="files/${file.name}" />`,
                size: file.size,
              },
            });
          }
        };

        reader.readAsText(file);
      }
    }
  };

  return (
    <Dropzone onDrop={uploadFile} accept={filesAccept}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div className="col-span-full" {...getRootProps()}>
          <input {...getInputProps()} />
          <div
            className={`mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-900/25 px-6 py-10  ${
              isDragActive ? "border-blue-500 bg-blue-400/20" : "border-blue-400 bg-blue-400/10"
            }`}
          >
            <div className="text-center">
              <DocumentArrowUpIcon className="mx-auto h-8 w-8 text-blue-500" aria-hidden="true" />
              <div className="mt-4 flex text-lg font-semibold leading-6 text-gray-600">
                <p className="pr-1">Drag and drop files, or</p>
                <div
                  className={`relative cursor-pointer rounded-md text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500`}
                >
                  <span onClick={() => fileInputRef.current?.click()}>Browse</span>
                </div>
              </div>
              <p className="text-xs leading-5 text-gray-600">Up to 5MB</p>
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default FileUpload;
