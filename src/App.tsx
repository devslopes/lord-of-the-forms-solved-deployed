import "./App.css";
import { ClassApp } from "./ClassApp/ClassApp";
import { FunctionalApp } from "./FunctionalApp/FunctionalApp";

function App() {
  return (
    <>
      <div className="left">
        <FunctionalApp />
      </div>
      <div className="right">
        <ClassApp />
      </div>
    </>
  );
}

export default App;
