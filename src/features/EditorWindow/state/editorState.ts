import { atomWithLocalStorage } from "../../../utils/AtomWithLocalStorage";

interface IEditorPaneSize {
  width?: number;
  height?: number;
}

const editorPaneSizeAtom = atomWithLocalStorage<IEditorPaneSize>(
  "editor.pane.size",
  {
    width: undefined,
    height: undefined,
  }
);

export { editorPaneSizeAtom };
