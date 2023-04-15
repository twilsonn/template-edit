import React, { forwardRef, useEffect, useMemo } from "react";
import { default as Monaco, OnChange, OnMount } from "@monaco-editor/react";
import debounce from "lodash.debounce";

interface IEditorProps {
  setEditorContent: (content: string) => void;
  initialContent: string;
  language: string;
  height?: number;
  width?: number;
}

const options = {
  minimap: {
    enabled: false,
  },
  fontSize: 18,
  mouseWheelZoom: true,
};

const Editor = forwardRef<typeof Monaco, IEditorProps>(function Editor(
  props,
  ref
) {
  const { initialContent, language, setEditorContent, height, width } = props;

  const handleOnMount: OnMount = (editor, m) => {
    if (ref) {
      // @ts-ignore
      ref.current = editor;
    }

    if (language === "json") {
      setTimeout(function () {
        editor.getAction("editor.action.formatDocument")?.run();
      }, 50);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOnChange: OnChange = (content) => {
    setEditorContent(content || "");
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(handleOnChange, 500),
    [handleOnChange]
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  return (
    <div className="w-full h-full bg-[#1e1e1e] border-b border-neutral-700 overflow-hidden">
      <Monaco
        theme="vs-dark"
        options={options}
        defaultLanguage={language}
        defaultValue={initialContent}
        onChange={debouncedChangeHandler}
        onMount={handleOnMount}
        height={height}
        width={width}
      />
    </div>
  );
});

export default Editor;
