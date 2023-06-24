import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { default as Monaco, OnChange, OnMount } from "@monaco-editor/react";
import debounce from "lodash.debounce";
import { BarLoader } from "react-spinners";

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
  const [loading, setLoading] = useState(true);

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

    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };

  useEffect(() => {
    // @ts-ignore
    if (ref && ref.current) {
      // @ts-ignore
      ref.current.getAction("editor.action.formatDocument")?.run();
    }
  }, [language]);

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
      <div className={`w-full h-full ${loading ? "hidden" : ""}`}>
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

      {loading && (
        <div className="absolute z-50 top-0 left-0 flex w-full h-full items-center justify-center">
          <BarLoader color="#3b82f6" />
        </div>
      )}
    </div>
  );
});

export default Editor;
