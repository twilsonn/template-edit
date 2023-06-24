import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai";
import Editor from "./components/Editor";
import { default as Monaco } from "@monaco-editor/react";
import useTemplateStore from "@/store/templateStore";

interface ITemplateEditor {
  height: number;
  width: number;
}

const TemplateEditor: React.FC<ITemplateEditor> = (props) => {
  const { height, width } = props;

  const { setContent, active, templates } = useTemplateStore();
  const editorRef = useRef<typeof Monaco>(null);

  const templateType = templates[active]?.type;

  const [initialContent] = useState(templates[active]?.content);

  const handleEditorChanges = useCallback(
    (newContent: string) => setContent(active, newContent),
    [active, setContent]
  );

  useEffect(() => {
    if (templates[active]?.content) {
      // @ts-ignore
      //editorRef?.current?.setValue(templates[active]?.content);
    } else {
      // @ts-ignore
      editorRef?.current?.setValue("");
    }
  }, [active, templates]);

  return active ? (
    <Editor
      ref={editorRef}
      height={height}
      width={width}
      initialContent={initialContent}
      language={templateType === "twig" ? "html" : templateType}
      setEditorContent={handleEditorChanges}
    />
  ) : null;
};

export { TemplateEditor };
