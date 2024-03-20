import { useSetAtom } from "jotai";
import CreateTemplate, { createTemplateModalOpen } from "./CreateTemplateModal";
import Templates from "./Templates";

const TemplateList = () => {
  const setOpen = useSetAtom(createTemplateModalOpen);

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
            <Templates />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TemplateList;
