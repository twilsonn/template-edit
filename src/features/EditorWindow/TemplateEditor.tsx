import { useEffect, useMemo, useRef } from "react";
import { useAtom } from "jotai";
import Editor from "./components/Editor";
import { templatesAtom } from "./state";
import { ITemplate } from "./state/templateState";
import { default as Monaco } from "@monaco-editor/react";

interface ITemplateEditor {
  height: number;
  width: number;
}

const TemplateEditor: React.FC<ITemplateEditor> = ({ height, width }) => {
  const editorRef = useRef<typeof Monaco>(null);
  const [{ activeTemplate, templates }, setTemplates] = useAtom(templatesAtom);

  const updateTemplate = useMemo(
    () =>
      (
        templates: {
          [key: string]: ITemplate;
        },
        activeTemplate: string
      ) => {
        const currentTemplate = templates[activeTemplate];

        if (currentTemplate) {
          const newVersion = {
            [activeTemplate]: {
              ...currentTemplate,
              lastUpdated: new Date(Date.now()).getTime(),
              content: currentTemplate.content,
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
      },
    [setTemplates]
  );

  useEffect(() => {
    updateTemplate(templates, activeTemplate);
    if (templates[activeTemplate]?.content) {
      // @ts-ignore
      editorRef?.current?.setValue(templates[activeTemplate]?.content);
    } else {
      // @ts-ignore
      editorRef?.current?.setValue("");
    }
  }, [activeTemplate]);

  const handleEditorChanges = useMemo(
    () => (newContent: string) => {
      if (templates[activeTemplate]) {
        updateTemplate(
          {
            ...templates,
            [activeTemplate]: {
              ...templates[activeTemplate],
              content: newContent,
            },
          },
          activeTemplate
        );
      }
    },
    [activeTemplate, templates, updateTemplate]
  );

  return activeTemplate ? (
    <Editor
      ref={editorRef}
      height={height}
      width={width}
      initialContent={templates[activeTemplate]?.content}
      language={
        templates[activeTemplate]?.type === "twig"
          ? "html"
          : templates[activeTemplate]?.type
      }
      setEditorContent={handleEditorChanges}
    />
  ) : null;
};

export { TemplateEditor };
