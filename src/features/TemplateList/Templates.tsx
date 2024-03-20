import { PenToSquare } from "@/assets/icons";
import useTemplateStore from "@/store/templateStore";
import { useRouter } from "next/router";
import { useState } from "react";
import TimeAgo from "timeago-react";
import RemoveTemplate, { removeTemplateModalOpen } from "./RemoveTemplateModal";
import { useSetAtom } from "jotai";

const Templates: React.FC = () => {
  const router = useRouter();
  const { templates, openTemplate, removeTemplate } = useTemplateStore();
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [removingTemplate, setRemovingTemplate] = useState(false);
  const setModal = useSetAtom(removeTemplateModalOpen);

  const handleEditClick = (key: string) => {
    setLoadingTemplate(true);
    openTemplate(key);
    router.push(`/editor?id=${key}`);
  };

  const handleRemoveTemplate = (id: string) => {
    setModal({
      open: true,
      id,
    });
  };

  return (
    <table className="min-w-full bg-gray-100">
      <thead>
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
            Name
          </th>
          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
            Type
          </th>
          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
            Created At
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
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
                <div className="font-medium text-gray-900">{template.name}</div>
              </td>
              <td className="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">{template.type}</td>
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
                  onClick={() => handleRemoveTemplate(id)}
                >
                  Remove
                  <span className="sr-only">, {template.name}</span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>

      <RemoveTemplate />
    </table>
  );
};

export default Templates;
