import { useState } from "react";
import { isEmailValid, isStateValid } from "../utils/validations";
import { TextInput } from "../TextInput";
import {
  PhoneNumberState,
  FunctionalTelephoneInput,
} from "./FunctionalTelephoneInput";
import { UserInformation } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const stateErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  handleUserInformation,
}: {
  handleUserInformation: (newUserData: UserInformation) => void;
}) => {
  const [phoneNumberInput, setPhoneNumberInput] = useState<PhoneNumberState>([
    "",
    "",
    "",
  ]);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reset = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setStateInput("");
    setPhoneNumberInput(["", "", ""]);
    setIsSubmitted(false);
  };

  const isFirstNameInputValid = firstNameInput.length >= 2;
  const isLastNameinputValid = lastNameInput.length >= 2;
  const isEmailInputValid = isEmailValid(emailInput);
  const isStateInputValid = isStateValid(stateInput);

  const isPhoneNumberValid = phoneNumberInput.join("").length === 10;

  const onSubmit = () => {
    setIsSubmitted(true);
    if (
      [
        isFirstNameInputValid,
        isLastNameinputValid,
        isEmailInputValid,
        isStateInputValid,
        isPhoneNumberValid,
      ].some((validation) => !validation)
    ) {
      alert("bad data input");
      return;
    }

    handleUserInformation({
      email: emailInput,
      firstName: firstNameInput,
      lastName: lastNameInput,
      phone: phoneNumberInput.join(""),
      state: stateInput,
    });
    reset();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h3>User Information Form</h3>
      <TextInput
        label="First Name"
        inputProps={{
          placeholder: "Jon",
          value: firstNameInput,
          onChange: (e) => {
            setFirstNameInput(e.target.value);
          },
        }}
        shouldShowError={isSubmitted && !isFirstNameInputValid}
        errorMessage={firstNameErrorMessage}
      />

      <TextInput
        label="Last Name"
        inputProps={{
          placeholder: "Higger",
          value: lastNameInput,
          onChange: (e) => {
            setLastNameInput(e.target.value);
          },
        }}
        shouldShowError={isSubmitted && !isLastNameinputValid}
        errorMessage={lastNameErrorMessage}
      />

      <TextInput
        label="Email"
        inputProps={{
          placeholder: "jon@jon.com",
          value: emailInput,
          onChange: (e) => {
            setEmailInput(e.target.value);
          },
        }}
        shouldShowError={isSubmitted && !isEmailInputValid}
        errorMessage={emailErrorMessage}
      />

      <TextInput
        inputProps={{
          placeholder: "State",
          value: stateInput,
          onChange: (e) => {
            setStateInput(e.target.value);
          },
        }}
        errorMessage={stateErrorMessage}
        shouldShowError={isSubmitted && !isStateInputValid}
        label="State"
      />
      <FunctionalTelephoneInput
        errorMessage={phoneNumberErrorMessage}
        shouldShowError={isSubmitted && !isPhoneNumberValid}
        phoneNumberInput={phoneNumberInput}
        setPhoneNumberInput={setPhoneNumberInput}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
