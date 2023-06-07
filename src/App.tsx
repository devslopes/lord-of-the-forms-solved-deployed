import "./App.css";
import { FunctionalForm } from "./FunctionalForm";
import { ClassForm } from "./ClassForm";

function App() {
  return (
    <>
      <div className="left">
        <FunctionalForm />
      </div>
      <div className="right">
        <ClassForm />
      </div>
    </>
  );
}

export default App;
