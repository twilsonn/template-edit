import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useElementSize } from "usehooks-ts";
import { editorSizeAtom, templatesAtom } from "./state";
import SplitPane from "./components/SplitPane";
import { TemplateEditor } from "./TemplateEditor";
import DataEditor from "./DataEditor";
import Renderer from "../Renderer";

const EditorWindow: React.FC<{ id: string }> = ({ id }) => {
  const [contentRef, { width, height }] = useElementSize();
  const [{ editor, window }, setSize] = useAtom(editorSizeAtom);
  const { width: editorWidth, height: editorHeight } = editor;
  const { templates, activeTemplate } = useAtomValue(templatesAtom);
  const setTemplates = useSetAtom(templatesAtom);

  const [templateLoaded, setTemplateLoaded] = useState(false);

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
    setTemplates({
      templates,
      activeTemplate: id,
    });

    setTemplateLoaded(Boolean(templates[id]));
  }, [templates, id, setTemplates, setTemplateLoaded]);

  useEffect(() => {
    setSize({
      editor,
      window: {
        width,
        height,
      },
    });
  }, [width, height]);

  return templateLoaded ? (
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
  ) : (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <h2 className="font-semibold text-2xl mb-4">Error!</h2>
      <p>
        No template found with ID <b>{id}</b>
      </p>
    </div>
  );
};

export default EditorWindow;
