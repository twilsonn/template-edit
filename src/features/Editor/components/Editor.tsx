import { default as Monaco, OnChange, OnMount } from "@monaco-editor/react";
import { useState } from "react";

interface IEditorProps {
  onChange?: (content: string) => void;
  initialContent: string;
  language: string;
}

const Editor: React.FC<IEditorProps> = (props) => {
  const { initialContent, language, onChange } = props;
  const [editorContent, setEditorContent] = useState(initialContent);

  const handleOnMount: OnMount = (editor) => {
    editor.getAction("editor.action.formatDocument").run();
  };

  const handleOnChange: OnChange = (content) => {
    if (!content) return;
    setEditorContent(content);
    return onChange && onChange(content);
  };

  return (
    <div className="w-full h-full bg-[#1e1e1e] border-b border-neutral-700">
      <Monaco
        theme="vs-dark"
        options={{
          minimap: {
            enabled: false,
          },
        }}
        defaultLanguage={language}
        defaultValue={editorContent}
        onMount={handleOnMount}
        onChange={handleOnChange}
        className="pt-1"
      />
    </div>
  );
};

export default Editor;
