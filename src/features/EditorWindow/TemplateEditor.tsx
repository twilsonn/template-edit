import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import Editor from "./components/Editor";
import Button from "@/components/Button";
import { templatesAtom } from "./state";
import { CleanHand } from "@/assets/icons";

interface ITemplateEditor {
  height: number;
  width: number;
}

const formatContent = (content: string) =>
  fetch("/api/format", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "twig",
      content,
    }),
  })
    .then((req) => req.json())
    .then((data) => {
      return data.content;
    });

const TemplateEditor: React.FC<ITemplateEditor> = ({ height, width }) => {
  const editorRef = useRef(null);
  const [{ activeTemplate, templates }, setTemplates] = useAtom(templatesAtom);

  useEffect(() => {
    formatTemplate();
  }, [activeTemplate]);

  const updateTemplate = (newContent: string) => {
    const currentTemplate = templates[activeTemplate];

    if (currentTemplate) {
      const newVersion = {
        [activeTemplate]: {
          name: currentTemplate.name,
          lastUpdated: new Date(Date.now()).getTime(),
          content: newContent,
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

  const formatTemplate = () => {
    const currentTemplate = templates[activeTemplate];
    formatContent(currentTemplate.content).then((formattedContent) => {
      updateTemplate(formattedContent);
      // @ts-ignore
      editorRef.current?.setValue(formattedContent);
    });
  };

  return (
    <>
      <div className="absolute top-0 right-0 z-10 px-6 py-2">
        <Button.Icon
          type="button"
          Icon={CleanHand}
          onClick={formatTemplate}
          className="bg-transparent"
        />
      </div>

      <Editor
        ref={editorRef}
        height={height}
        width={width}
        initialContent={templates[activeTemplate].content}
        language="html"
        setEditorContent={updateTemplate}
      />
    </>
  );
};

export { TemplateEditor };
