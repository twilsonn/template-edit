import { atomWithLocalStorage } from "@/utils/AtomWithLocalStorage";

interface IEditorSize {
  editor: {
    width: number;
    height: number;
  };
  window: {
    width: number;
    height: number;
  };
}

const editorSizeAtom = atomWithLocalStorage<IEditorSize>("editor.size", {
  editor: {
    width: 0,
    height: 0,
  },
  window: {
    width: 0,
    height: 0,
  },
});

export { editorSizeAtom };
