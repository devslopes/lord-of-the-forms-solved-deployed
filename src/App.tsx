import {
  ChangeEvent,
  ChangeEventHandler,
  EventHandler,
  useRef,
  useState,
} from "react";
import "./App.css";
import { isAllNumbers } from "./validations";

function App() {
  const [phoneNumberInput, setPhoneNumberInput] = useState(["", "", ""]);

  const phoneNumberInput0RefRef = useRef<HTMLInputElement>(null);
  const phoneNumberInput1RefRef = useRef<HTMLInputElement>(null);
  const phoneNumberInput2RefRef = useRef<HTMLInputElement>(null);

  const maxLengths = [3, 3, 4];

  const phoneNumberRefs = [
    phoneNumberInput0RefRef,
    phoneNumberInput1RefRef,
    phoneNumberInput2RefRef,
  ];

  const handlePhoneNumberInput =
    (phoneNumberIndex: 0 | 1 | 2): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const newValue = e.target.value;
      const prevValue = phoneNumberInput[phoneNumberIndex];
      const nextRef = phoneNumberRefs[phoneNumberIndex + 1];
      const prevRef = phoneNumberRefs[phoneNumberIndex - 1];

      const maxLength = maxLengths[phoneNumberIndex];
      const shouldGotoNextFocus =
        phoneNumberIndex < 2 && newValue.length === maxLength;
      const shouldGotoPrevFocus = phoneNumberIndex > 0 && newValue.length === 0;

      if (!isAllNumbers(newValue)) return;

      if (newValue.length > maxLength) {
        return;
      }

      setPhoneNumberInput(
        phoneNumberInput.map((n, index) =>
          phoneNumberIndex === index ? newValue : n
        )
      );

      if (shouldGotoNextFocus) {
        nextRef.current?.focus();
      }
      if (shouldGotoPrevFocus) {
        prevRef.current?.focus();
      }
    };

  return (
    <>
      <h1>Form App 1</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="input-wrap">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" name="" id="" />
        </div>
        <div className="input-wrap">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" name="" id="" />
        </div>
        <div className="input-wrap">
          <label htmlFor="email">Email:</label>
          <input type="text" name="" id="" />
        </div>
        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input
              type="text"
              id="phone-input-1"
              ref={phoneNumberInput0RefRef}
              onChange={handlePhoneNumberInput(0)}
              value={phoneNumberInput[0]}
            />
            -
            <input
              type="text"
              id="phone-input-2"
              ref={phoneNumberInput1RefRef}
              onChange={handlePhoneNumberInput(1)}
              value={phoneNumberInput[1]}
            />
            -
            <input
              type="text"
              id="phone-input-3"
              ref={phoneNumberInput2RefRef}
              onChange={handlePhoneNumberInput(2)}
              value={phoneNumberInput[2]}
            />
          </div>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default App;
