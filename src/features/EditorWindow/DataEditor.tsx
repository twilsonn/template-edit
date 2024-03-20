import React, { useEffect, useRef, useState } from "react";
import Editor from "./components/Editor";
import { default as Monaco } from "@monaco-editor/react";
import useTemplateStore from "@/store/templateStore";

interface IDataEditor {
  height: number;
  width: number;
}

const DataEditor: React.FC<IDataEditor> = ({ height, width }) => {
  const editorRef = useRef<typeof Monaco>(null);
  const { templates, active, setData } = useTemplateStore();
  const [initialContent] = useState(templates[active]?.data);

  const updateTemplate = (data: any) => setData(active, data);

  useEffect(() => {
    if (!editorRef.current) return;

    if (templates[active]?.data) {
      // @ts-ignore
      editorRef.current.setValue(templates[active]?.data);
    } else {
      // @ts-ignore
      editorRef.current.setValue("");
    }
  }, [active]);

  return active ? (
    <Editor
      ref={editorRef}
      setEditorContent={updateTemplate}
      height={height}
      width={width}
      initialContent={initialContent}
      language="json"
    />
  ) : null;
};

export default DataEditor;
