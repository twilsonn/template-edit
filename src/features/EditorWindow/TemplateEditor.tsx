import { useMap } from "usehooks-ts";
import { templatesAtom } from "./state";
import { useAtom } from "jotai";
import Editor from "./components/Editor";
import { useState } from "react";

interface ITemplateEditor {
  height: number;
  width: number;
}

const TemplateEditor: React.FC<ITemplateEditor> = ({ height, width }) => {
  const [{ activeTemplate, templates }, setTemplates] = useAtom(templatesAtom);
  const [map, actions] = useMap(templates);

  const handleEditorOnChange: (content: string) => void = (content) => {
    const currentTemplate = map.get(activeTemplate);
    if (currentTemplate) {
      actions.set(activeTemplate, { ...currentTemplate, content });
      setTemplates({
        activeTemplate,
        templates: Array.from(map.entries()),
      });
    }
  };

  return (
    <Editor
      height={height}
      width={width}
      initialContent={map.get(activeTemplate)?.content || ""}
      language="twig"
      onChange={handleEditorOnChange}
    />
  );
};

export { TemplateEditor };
