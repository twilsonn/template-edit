import { default as Monaco, OnChange, OnMount } from "@monaco-editor/react";
import debounce from "lodash.debounce";
import React, { forwardRef, useCallback, useEffect, useMemo } from "react";

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

  const handleOnMount: OnMount = (editor, monaco) => {
    if (ref) {
      // @ts-ignore
      ref.current = editor;
    }

    if (language === "json") {
      setTimeout(function () {
        editor.getAction("editor.action.formatDocument").run();
      }, 50);
    }

    monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: [">"],
      provideCompletionItems: (model: any, position: any) => {
        const codePre: string = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const tag = codePre.match(/.*<(\w+)>$/)?.[1];

        if (!tag) {
          return;
        }

        const word = model.getWordUntilPosition(position);

        return {
          suggestions: [
            {
              label: `</${tag}>`,
              kind: monaco.languages.CompletionItemKind.EnumMember,
              insertText: `$1</${tag}>`,
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
              },
            },
          ],
        };
      },
    });
  };

  const handleOnChange: OnChange = (content) => {
    setEditorContent(content || "");
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(handleOnChange, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

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
