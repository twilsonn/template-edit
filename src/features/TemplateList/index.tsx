import { PenToSquare } from "@/assets/icons";
import TimeAgo from "timeago-react";
import { useRouter } from "next/router";
import { useState } from "react";
import useTemplateStore from "@/store/templateStore";
import { atom, useAtom } from "jotai";
import { CreateTemplate, createTemplateModalOpen } from "./CreateTemplate";

const files = [
  {
    id: 1,
    name: "index.js",
    size: "2MB",
    type: "JavaScript",
    createdAt: new Date(Date.now()).toDateString(),
  },
  {
    id: 2,
    name: "bg.svg",
    size: "10KB",
    type: "Image",
    createdAt: new Date(Date.now()).toDateString(),
  },
];

const TemplateList = () => {
  const router = useRouter();
  const { templates, openTemplate } = useTemplateStore();
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [open, setOpen] = useAtom(createTemplateModalOpen);

  const handleEditClick: (key: string) => void = (key) => {
    setLoadingTemplate(true);
    openTemplate(key);
    router.push(`/editor?id=${key}`);
  };

  return (
    <div className="flex-col col-span-3 px-6 pt-6 flex bg-gray-50">
      <section className="mb-8 ">
        <div className="mb-4 flex justify-between items-center ">
          <h2 className="text-2xl font-semibold">Templates</h2>
          <button
            type="button"
            className="h-10 rounded-md bg-blue-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mr-2"
            onClick={() => setOpen(true)}
          >
            Create Template
          </button>

          <CreateTemplate />
        </div>

        <div>
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
                    Type
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Updated At
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Select</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y-2 divide-gray-100">
                {Object.keys(templates).map((id) => {
                  const template = templates[id];

                  return (
                    <tr key={id} className="bg-white">
                      <td className="relative py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="font-medium text-gray-900">
                          {template.name}
                        </div>
                      </td>
                      <td className="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                        {template.type}
                      </td>
                      <td className="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                        <TimeAgo datetime={template.createdAt} locale="en-US" />
                      </td>
                      <td className="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                        <TimeAgo datetime={template.updatedAt} locale="en-US" />
                      </td>
                      <td className="relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex justify-end">
                        <button
                          type="button"
                          className="h-10 w-10 rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 mr-2"
                          onClick={() => handleEditClick(id)}
                          disabled={loadingTemplate}
                        >
                          <PenToSquare className="w-5 h-5 text-gray-500" />
                          <span className="sr-only">open {template.name}</span>
                        </button>
                        <button
                          type="button"
                          className="h-10 rounded-md bg-red-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                          disabled={loadingTemplate}
                        >
                          Remove
                          <span className="sr-only">, {template.name}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* <div className="grid grid-cols-4 gap-6">
        <div className="col-span-2">
          <label htmlFor="name" className="block text-sm font-medium mb-2 ">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="py-3 px-4 block w-full border focus:outline-none border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
            autoComplete="false"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="hs-select-label"
            className="block text-sm font-medium mb-2"
          >
            Type
          </label>
          <select
            id="hs-select-label"
            className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
          >
            <option selected>Select type...</option>
            <option>Handlebars</option>
            <option>Twig</option>
            <option>Svelte</option>
            <option>Thymeleaf</option>
          </select>
        </div>
      </div> */}
    </div>
  );
};

export default TemplateList;
