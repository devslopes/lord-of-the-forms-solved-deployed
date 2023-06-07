import { useState, useRef, ChangeEventHandler } from "react";
import { isAllNumbers } from "./validations";
import { ErrorMessage } from "./ErrorMessage";
import { isEmailValid, isStateValid } from "./utils/validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const stateErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = () => {
  const [phoneNumberInput, setPhoneNumberInput] = useState(["", "", ""]);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [hasSubmitBeenAttempted, setHasSubmitBeenAttempted] = useState(false);

  const phoneNumberInput0RefRef = useRef<HTMLInputElement>(null);
  const phoneNumberInput1RefRef = useRef<HTMLInputElement>(null);
  const phoneNumberInput2RefRef = useRef<HTMLInputElement>(null);

  const isFirstNameInputValid = firstNameInput.length >= 2;
  const isLastNameinputValid = lastNameInput.length >= 2;
  const isEmailInputValid = isEmailValid(emailInput);
  const isStateInputValid = isStateValid(stateInput);
  const isPhoneNumberValid = phoneNumberInput.join("").length === 10;

  const shouldShowFirstNameError =
    hasSubmitBeenAttempted && !isFirstNameInputValid;
  const shouldShowLastNameError =
    hasSubmitBeenAttempted && !isLastNameinputValid;
  const shouldShowEmailError = hasSubmitBeenAttempted && !isEmailInputValid;
  const shouldShowStateError = hasSubmitBeenAttempted && !isStateInputValid;
  const shouldShowPhoneNumberError =
    hasSubmitBeenAttempted && !isPhoneNumberValid;

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

  const onSubmit = () => {
    setHasSubmitBeenAttempted(true);
  };

  return (
    <>
      <h2>Functional</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {/* Hook up the state for first name */}
        <div className="input-wrap">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            placeholder="Jon"
            value={firstNameInput}
            onChange={(e) => {
              setFirstNameInput(e.target.value);
            }}
          />
        </div>

        {/* Only show this if invalid first name after submit*/}
        <ErrorMessage
          message={firstNameErrorMessage}
          show={shouldShowFirstNameError}
        />

        {/* Hook up the state for last name */}
        <div className="input-wrap">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name=""
            id=""
            placeholder="Smith"
            onChange={(e) => {
              setLastNameInput(e.target.value);
            }}
            value={lastNameInput}
          />
        </div>

        {/* Only show this if invalid first name after submit*/}
        <ErrorMessage
          message={lastNameErrorMessage}
          show={shouldShowLastNameError}
        />

        {/* Hook up the state for last name */}
        <div className="input-wrap">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name=""
            id=""
            placeholder="jon@jon.com"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
          />
        </div>

        {/* Only show this if invalid email after submit*/}
        <ErrorMessage message={emailErrorMessage} show={shouldShowEmailError} />

        {/* Hook up the state for state (of the united states) */}
        <div className="input-wrap">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            placeholder="FL"
            onChange={(e) => {
              setStateInput(e.target.value);
            }}
            value={stateInput}
          />
        </div>

        {/* Only show this if invalid state after submit*/}
        <ErrorMessage message={stateErrorMessage} show={shouldShowStateError} />
        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input
              type="text"
              id="phone-input-1"
              ref={phoneNumberInput0RefRef}
              onChange={handlePhoneNumberInput(0)}
              value={phoneNumberInput[0]}
              placeholder="555"
            />
            -
            <input
              type="text"
              id="phone-input-2"
              ref={phoneNumberInput1RefRef}
              onChange={handlePhoneNumberInput(1)}
              value={phoneNumberInput[1]}
              placeholder="555"
            />
            -
            <input
              type="text"
              id="phone-input-3"
              ref={phoneNumberInput2RefRef}
              onChange={handlePhoneNumberInput(2)}
              value={phoneNumberInput[2]}
              placeholder="5555"
            />
          </div>
        </div>

        {/* Only show this if invalid phone number after submit*/}
        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={shouldShowPhoneNumberError}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
