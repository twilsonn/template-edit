import { useWindowSize } from "usehooks-ts";
import SplitPane from "./components/SplitPane";
import { Editor } from "./features/Editor";

function App() {
  const { width, height } = useWindowSize();

  const sizes = {
    minSize: 200,
    maxWidth: width - 200,
    maxHeight: height - 200,
    defaultWidth: width / 2,
    defaultHeight: height - height / 3,
  };

  return (
    <div className="h-screen w-screen">
      <SplitPane
        className="bg-neutral-100"
        split="vertical"
        size={sizes.defaultWidth}
        minSize={sizes.minSize}
        maxSize={sizes.maxWidth}
      >
        <SplitPane
          className="bg-neutral-900"
          split="horizontal"
          size={sizes.defaultHeight}
          minSize={sizes.minSize}
          maxSize={sizes.maxHeight}
        >
          <Editor initialContent="test" language="twig" />
          <Editor initialContent="test" language="json" />
        </SplitPane>
        <div />
      </SplitPane>
    </div>
  );
}

export default App;
