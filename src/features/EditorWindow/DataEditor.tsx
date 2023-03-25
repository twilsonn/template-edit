import React from "react";
import Editor from "./components/Editor";
import { useAtom } from "jotai";
import { templatesAtom } from "./state";

interface IDataEditor {
  height: number;
  width: number;
}

const DataEditor: React.FC<IDataEditor> = ({ height, width }) => {
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
          lastUpdated: new Date(Date.now()).getTime(),
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

  return (
    <Editor
      setEditorContent={updateTemplate}
      height={height}
      width={width}
      initialContent={JSON.stringify(templates[activeTemplate].data)}
      language="json"
    />
  );
};

export default DataEditor;
