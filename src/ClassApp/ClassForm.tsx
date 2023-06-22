import { Component } from "react";
import { isEmailValid } from "../utils/validations";
import { TextInput } from "../TextInput";
import { ClassTelephoneInput, PhoneNumberState } from "./ClassTelephoneInput";
import { UserInformation } from "../types";
import { isCityValid } from "../utils/all-cities";
import { isValidPhoneNumber } from "../validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const stateErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type State = {
  phoneNumberInput: PhoneNumberState;
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  cityInput: string;
  isSubmitted: boolean;
};

export class ClassForm extends Component<
  { handleUserInformation: (input: UserInformation) => void },
  State
> {
  state: State = {
    phoneNumberInput: ["", "", "", ""],
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    isSubmitted: false,
  };

  reset = () => {
    this.setState({
      isSubmitted: false,
      firstNameInput: "",
      emailInput: "",
      lastNameInput: "",
      phoneNumberInput: ["", "", "", ""],
      cityInput: "",
    });
  };
  render() {
    const {
      isSubmitted,
      firstNameInput,
      emailInput,
      lastNameInput,
      phoneNumberInput,
      cityInput,
    } = this.state;

    const isFirstNameInputValid = firstNameInput.length >= 2;
    const isLastNameInputValid = lastNameInput.length >= 2;
    const isEmailInputValid = isEmailValid(emailInput);
    const isStateInputValid = isCityValid(cityInput);
    const isPhoneNumberValid = isValidPhoneNumber(phoneNumberInput.join(""));

    const onSubmit = () => {
      this.setState({ isSubmitted: true });
      if (
        ![
          isFirstNameInputValid,
          isLastNameInputValid,
          isEmailInputValid,
          isStateInputValid,
          isPhoneNumberValid,
        ].every((validation) => validation)
      ) {
        alert("bad input");
        return;
      }
      this.props.handleUserInformation({
        email: emailInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        phone: phoneNumberInput.join(""),
        state: cityInput,
      });
      this.reset();
    };

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <u>
          <h3>User Information Form</h3>
        </u>
        <TextInput
          label="First Name"
          inputProps={{
            placeholder: "Bilbo",
            value: firstNameInput,
            onChange: (e) => {
              this.setState({ firstNameInput: e.target.value });
            },
          }}
          shouldShowError={isSubmitted && !isFirstNameInputValid}
          errorMessage={firstNameErrorMessage}
        />

        <TextInput
          label="Last Name"
          inputProps={{
            placeholder: "Baggins",
            value: lastNameInput,
            onChange: (e) => {
              this.setState({ lastNameInput: e.target.value });
            },
          }}
          shouldShowError={isSubmitted && !isLastNameInputValid}
          errorMessage={lastNameErrorMessage}
        />

        <TextInput
          label="Email"
          inputProps={{
            placeholder: "bilbo@hobbiton-adventures.com",
            value: emailInput,
            onChange: (e) => {
              this.setState({ emailInput: e.target.value });
            },
          }}
          shouldShowError={isSubmitted && !isEmailInputValid}
          errorMessage={emailErrorMessage}
        />

        <TextInput
          inputProps={{
            placeholder: "Hobbiton",
            value: cityInput,
            onChange: (e) => {
              this.setState({ cityInput: e.target.value });
            },
            list: "cities",
          }}
          errorMessage={stateErrorMessage}
          shouldShowError={isSubmitted && !isStateInputValid}
          label="City"
        />
        <ClassTelephoneInput
          errorMessage={phoneNumberErrorMessage}
          shouldShowError={isSubmitted && !isPhoneNumberValid}
          phoneNumberInput={phoneNumberInput}
          setPhoneNumberInput={(phoneNumberInput) => {
            this.setState({ phoneNumberInput });
          }}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
