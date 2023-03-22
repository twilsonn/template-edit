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
  const [templates, setTemplates] = useAtom(templatesAtom);
  const [map, actions] = useMap(templates);
  const [activeTemplate, setActiveTemplate] = useState(map.get("default"));

  const handleEditorOnChange: (content: string) => void = (content) => {
    if (activeTemplate) {
      actions.set("default", { ...activeTemplate, content });
      setTemplates(Array.from(map.entries()));
    }
  };

  return (
    <Editor
      height={height}
      width={width}
      initialContent={map.get("default")?.content || ""}
      language="twig"
      onChange={handleEditorOnChange}
    />
  );
};

export { TemplateEditor };
