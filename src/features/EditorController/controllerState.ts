import { atomWithLocalStorage } from "@/utils/AtomWithLocalStorage";

export interface IController {
  [key: string]: {
    isSaved: boolean;
    isActive: boolean;
  };
}

const controllerAtom = atomWithLocalStorage<IController>(
  "editor.controller",
  {}
);

export { controllerAtom };
