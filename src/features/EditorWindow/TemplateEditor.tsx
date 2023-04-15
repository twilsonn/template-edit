import { useEffect, useRef } from "react";
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

  const updateTemplate = async (
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
  };

  useEffect(() => {
    updateTemplate(templates, activeTemplate);
  }, [activeTemplate]);

  const handleEditorChanges = (newContent: string) => {
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
  };

  return (
    <Editor
      ref={editorRef}
      height={height}
      width={width}
      initialContent={templates[activeTemplate].content}
      language="html"
      setEditorContent={handleEditorChanges}
    />
  );
};

export { TemplateEditor };
