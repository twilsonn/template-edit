import React, { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useElementSize } from "usehooks-ts";
import { editorSizeAtom, templatesAtom } from "./state";
import SplitPane from "./components/SplitPane";
import { TemplateEditor } from "./TemplateEditor";
import DataEditor from "./DataEditor";
import Renderer from "../Renderer";

const EditorWindow: React.FC = () => {
  const [contentRef, { width, height }] = useElementSize();
  const [{ editor, window }, setSize] = useAtom(editorSizeAtom);
  const { width: editorWidth, height: editorHeight } = editor;
  const { templates, activeTemplate } = useAtomValue(templatesAtom);

  const sizes = {
    minSize: 200,
    maxWidth: width - 200,
    maxHeight: height - 200,
    defaultWidth: width / 2,
    defaultHeight: height - height / 3,
  };

  const handleEditorHeightOnChange: (newSize: number) => void = (newSize) => {
    return setSize({
      window,
      editor: {
        width: editorWidth,
        height: newSize,
      },
    });
  };

  const handleEditorWidthOnChange: (newSize: number) => void = (newSize) => {
    return setSize({
      window,
      editor: {
        width: newSize,
        height: editorHeight,
      },
    });
  };

  useEffect(() => {
    setSize({
      editor,
      window: {
        width,
        height,
      },
    });
  }, [width, height]);

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
        <Renderer
          type={templates[activeTemplate]?.type}
          content={templates[activeTemplate]?.content}
          data={templates[activeTemplate]?.data}
        />
      </SplitPane>
    </div>
  );
};

export default EditorWindow;
