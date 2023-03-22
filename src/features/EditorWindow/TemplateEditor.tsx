import { useMap } from "usehooks-ts";
import { templatesAtom } from "./state";
import { useAtom } from "jotai";
import Editor from "./components/Editor";

interface ITemplateEditor {
  height: number;
  width: number;
}

const TemplateEditor: React.FC<ITemplateEditor> = ({ height, width }) => {
  const [templates, setTemplates] = useAtom(templatesAtom);
  const [map, actions] = useMap<string, string>(templates);

  const handleEditorOnChange: (content: string) => void = (content) => {
    actions.set("default", content);
    setTemplates(Array.from(map.entries()));
  };

  return (
    <Editor
      height={height}
      width={width}
      initialContent={map.get("default") || ""}
      language="twig"
      onChange={handleEditorOnChange}
    />
  );
};

export { TemplateEditor };
