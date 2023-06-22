import "./App.css";
import { ClassApp } from "./ClassApp/ClassApp";
import { FunctionalApp } from "./FunctionalApp/FunctionalApp";
import { allCities } from "./utils/all-cities";

function App() {
  return (
    <>
      <div className="all-container">
        <h1>Lord of the Forms</h1>
        <h4>Your Journey to good form UI Starts Here</h4>
        <div className="forms-container">
          <div className="left">
            <FunctionalApp />
          </div>
          <div className="right">
            <ClassApp />
          </div>
        </div>
      </div>
      <datalist id="cities">
        {allCities.map((city) => (
          <option>{city}</option>
        ))}
      </datalist>
    </>
  );
}

export default App;
