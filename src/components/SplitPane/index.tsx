import { PropsWithChildren, useRef, useState } from "react";
import {
  default as ReactSplitPane,
  PaneProps,
  SplitPaneProps,
} from "react-split-pane";

interface ISplitPane extends SplitPaneProps {}

const SplitPane: React.FC<PropsWithChildren<ISplitPane>> = (props) => {
  const [isResizing, setIsResising] = useState(false);

  const { onDragStarted, onDragFinished } = props;

  const handleDragStarted = () => {
    if (onDragStarted) {
      onDragStarted();
    }
    setIsResising(true);
  };

  const handleDragFinished: (newSize: number) => void = (newSize) => {
    if (onDragFinished) {
      onDragFinished(newSize);
    }
    setIsResising(false);
  };

  return (
    <ReactSplitPane
      {...props}
      resizerClassName={isResizing ? "resizer active" : "resizer"}
      onDragStarted={handleDragStarted}
      onDragFinished={handleDragFinished}
    />
  );
};

export default SplitPane;
