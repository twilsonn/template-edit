import React from "react";
import { useAtom } from "jotai";
import { useElementSize } from "usehooks-ts";

import SplitPane from "./components/SplitPane";
import { editorPaneSizeAtom } from "./state";
import { TemplateEditor } from "./TemplateEditor";
import DataEditor from "./DataEditor";

const EditorWindow: React.FC = () => {
  const [contentRef, { width, height }] = useElementSize();

  const [ediorSize, setEditorSize] = useAtom(editorPaneSizeAtom);
  const { width: editorWidth, height: editorHeight } = ediorSize;

  const sizes = {
    minSize: 200,
    maxWidth: width - 200,
    maxHeight: height - 200,
    defaultWidth: width / 2,
    defaultHeight: height - height / 3,
  };

  const handleEditorHeightOnChange: (newSize: number) => void = (newSize) => {
    return setEditorSize({
      width: editorWidth,
      height: newSize,
    });
  };

  const handleEditorWidthOnChange: (newSize: number) => void = (newSize) => {
    return setEditorSize({
      width: newSize,
      height: editorHeight,
    });
  };

  return (
    <div ref={contentRef} className="flex-grow relative">
      <SplitPane
        className="bg-neutral-100"
        split="vertical"
        size={editorWidth || sizes.defaultWidth}
        minSize={sizes.minSize}
        maxSize={sizes.maxWidth}
        onChange={handleEditorWidthOnChange}
      >
        <SplitPane
          className="bg-neutral-900"
          split="horizontal"
          size={editorHeight || sizes.defaultHeight}
          minSize={sizes.minSize}
          maxSize={sizes.maxHeight}
          onChange={handleEditorHeightOnChange}
        >
          {/* template editor */}
          <TemplateEditor
            width={editorWidth || sizes.defaultWidth}
            height={editorHeight || sizes.defaultHeight}
          />

          {/* data editor */}
          <DataEditor
            height={height - (editorHeight || sizes.defaultHeight)}
            width={editorWidth || sizes.defaultWidth}
          />
        </SplitPane>

        {/* render preview */}
        <div />
      </SplitPane>
    </div>
  );
};

export default EditorWindow;
