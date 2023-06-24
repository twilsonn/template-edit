import TimeAgo from "timeago-react";

import { CopyIcon } from "@/assets/icons";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useAtomValue, useSetAtom } from "jotai";
import FileUpload, { filesAtom } from "../FileUpload";
import numeral from "numeral";
import toast from "react-hot-toast";

const FilesList = () => {
  const files = useAtomValue(filesAtom);
  const setFiles = useSetAtom(filesAtom);

  const handleOnRemove = (key: string) => {
    delete files[key];
    setFiles({ ...files });
  };

  const handleOnCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Successfully copied!");
  };

  return (
    <div className="flex-col col-span-2 px-6 pt-6 flex">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Uploads</h2>

        <div>
          <ul className="grid grid-cols-2 gap-3">
            <li className="flex flex-col">
              <div className="rounded-lg bg-gray-100 text-center h-24 w-full"></div>
              <div className="mx-2 mt-1 flex flex-row items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold mb-1">Index.js</h4>
                  <p className="text-sm text-gray-600">Uploaded 8m ago</p>
                </div>
                <div>
                  <EllipsisHorizontalIcon className="w-10 h-10" />
                </div>
              </div>
            </li>
            <li className="flex flex-col">
              <div className="rounded-lg bg-gray-100 text-center h-24 w-full"></div>
              <div className="mx-2 mt-1 flex flex-row items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold mb-1">Index.js</h4>
                  <p className="text-sm text-gray-600">Uploaded 8m ago</p>
                </div>
                <div>
                  <EllipsisHorizontalIcon className="w-10 h-10" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upload Files</h2>

        <FileUpload />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Files</h2>

        {Object.keys(files).length > 0 ? (
          <div className="ring-2 ring-gray-100 rounded-lg overflow-hidden">
            <table className="min-w-full bg-gray-100">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Uploaded
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Select</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-100">
                {Object.keys(files).map((id) => {
                  const file = files[id];

                  return (
                    <tr key={id} className="bg-white">
                      <td className="relative py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="font-medium text-gray-900">
                          {file.name}
                        </div>
                      </td>
                      <td className="px-3 py-3.5 text-sm text-gray-500 table-cell">
                        {numeral(file.size).format("0 ib")}
                      </td>
                      <td className="px-3 py-3.5 text-sm text-gray-500 table-cell capitalize">
                        {file.type}
                      </td>
                      <td className="px-3 py-3.5 text-sm text-gray-500 table-cell">
                        <TimeAgo datetime={file.updatedAt} locale="en-US" />
                      </td>
                      <td className="relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex justify-end">
                        <button
                          type="button"
                          className="h-10 w-10 rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 mr-2"
                          onClick={() => handleOnCopy(file.html)}
                        >
                          <CopyIcon className="w-5 h-5 text-gray-500" />
                          <span className="sr-only">copy {file.name}</span>
                        </button>
                        <button
                          type="button"
                          className="h-10 rounded-md bg-red-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                          onClick={() => handleOnRemove(id)}
                        >
                          Remove
                          <span className="sr-only">, {file.name}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm">You haven&apos;t uploaded any files yet!</p>
        )}
      </section>
    </div>
  );
};

export default FilesList;
