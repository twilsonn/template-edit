import React from "react";
import Editor from "./components/Editor";

interface IDataEditor {
  height: number;
  width: number;
}

const DataEditor: React.FC<IDataEditor> = ({ height, width }) => {
  return (
    <Editor
      height={height}
      width={width}
      initialContent="test"
      language="json"
    />
  );
};

export default DataEditor;
