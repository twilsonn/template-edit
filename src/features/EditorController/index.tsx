import { HomeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { controllerAtom } from "./controllerState";
import { templatesAtom } from "../EditorWindow/state";

const EditorController = () => {
  const { templates } = useAtomValue(templatesAtom);
  const [controller, setController] = useAtom(controllerAtom);

  const handleDeleteEditor = (key: string) => {
    delete controller[key];
    setController(controller);
  };

  return (
    <>
      <Link href="/">
        <button
          type="button"
          className="h-10 w-10 rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 mr-2"
        >
          <HomeIcon className="w-5 h-5 text-gray-500" />
        </button>
      </Link>

      {Object.keys(controller).map((key) => (
        <Link key={key} href={`/editor?id=${key}`}>
          <div className="h-10 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 mr-2 flex items-center justify-between cursor-pointer select-none">
            <p>{templates[key].name}</p>
            <button
              className="ml-3 p-0.5 rounded-full group-hover:bg-gray-200 hover:bg-gray-300"
              onClick={() => handleDeleteEditor(key)}
            >
              <XMarkIcon className="w-3 h-3" />
            </button>
          </div>
        </Link>
      ))}
    </>
  );
};

export default EditorController;
