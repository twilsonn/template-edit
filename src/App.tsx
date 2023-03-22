import EditorWindow from "./features/EditorWindow";
import Navigation from "./features/Navigation";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navigation />
      <EditorWindow />
    </div>
  );
}

export default App;
