import SplitPane from "./components/SplitPane";
import { Editor } from "./features/Editor";

function App() {
  return (
    <div className="h-screen w-screen">
      <SplitPane split="vertical" minSize={50}>
        <SplitPane split="horizontal" minSize={50}>
          <Editor initialContent="test" language="text" />
          <div />
        </SplitPane>
        <div />
      </SplitPane>
    </div>
  );
}

export default App;
