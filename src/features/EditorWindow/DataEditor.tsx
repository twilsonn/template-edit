import React, { useEffect, useRef } from "react";
import Editor from "./components/Editor";
import { useAtom } from "jotai";
import { templatesAtom } from "./state";
import { default as Monaco } from "@monaco-editor/react";

interface IDataEditor {
  height: number;
  width: number;
}

const DataEditor: React.FC<IDataEditor> = ({ height, width }) => {
  const editorRef = useRef<typeof Monaco>(null);
  const [{ activeTemplate, templates }, setTemplates] = useAtom(templatesAtom);

  const updateTemplate = (newData: any) => {
    const currentTemplate = templates[activeTemplate];

    let data;

    try {
      data = JSON.parse(newData);
    } catch (error) {
      return;
    }

    if (currentTemplate && data) {
      const newVersion = {
        [activeTemplate]: {
          ...currentTemplate,
          updatedAt: new Date(Date.now()).getTime(),
          data,
        },
      };

      setTemplates({
        activeTemplate,
        templates: {
          ...templates,
          ...newVersion,
        },
      });
    }
  };

  useEffect(() => {
    if (templates[activeTemplate]?.data) {
      // @ts-ignore
      editorRef?.current?.setValue(
        JSON.stringify(templates[activeTemplate]?.data)
      );
    } else {
      // @ts-ignore
      editorRef?.current?.setValue("");
    }
  }, [activeTemplate]);

  return activeTemplate ? (
    <Editor
      ref={editorRef}
      setEditorContent={updateTemplate}
      height={height}
      width={width}
      initialContent={JSON.stringify(templates[activeTemplate]?.data)}
      language="json"
    />
  ) : null;
};

export default DataEditor;
