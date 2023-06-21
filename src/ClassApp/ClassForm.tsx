import { Component } from "react";
import { isEmailValid, isStateValid } from "../utils/validations";
import { TextInput } from "../TextInput";
import { ClassTelephoneInput } from "./ClassTelephoneInput";
import { UserInformation } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const stateErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type State = {
  phoneNumberInput: [string, string, string];
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  stateInput: string;
  isSubmitted: boolean;
};

export class ClassForm extends Component<
  { handleUserInformation: (input: UserInformation) => void },
  State
> {
  state: State = {
    phoneNumberInput: ["", "", ""],
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    stateInput: "",
    isSubmitted: false,
  };

  reset = () => {
    this.setState({
      isSubmitted: false,
      firstNameInput: "",
      emailInput: "",
      lastNameInput: "",
      phoneNumberInput: ["", "", ""],
      stateInput: "",
    });
  };
  render() {
    const {
      isSubmitted,
      firstNameInput,
      emailInput,
      lastNameInput,
      phoneNumberInput,
      stateInput,
    } = this.state;

    const isFirstNameInputValid = firstNameInput.length >= 2;
    const isLastNameinputValid = lastNameInput.length >= 2;
    const isEmailInputValid = isEmailValid(emailInput);
    const isStateInputValid = isStateValid(stateInput);
    const isPhoneNumberValid =
      !isSubmitted || phoneNumberInput.join("").length === 10;

    const onSubmit = () => {
      this.setState({ isSubmitted: true });
      if (
        ![
          isFirstNameInputValid,
          isLastNameinputValid,
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
        state: stateInput,
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
        <h3>User Information Form</h3>
        <TextInput
          label="First Name"
          inputProps={{
            placeholder: "Jon",
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
            placeholder: "Higger",
            value: lastNameInput,
            onChange: (e) => {
              this.setState({ lastNameInput: e.target.value });
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
              this.setState({ emailInput: e.target.value });
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
              this.setState({ stateInput: e.target.value });
            },
          }}
          errorMessage={stateErrorMessage}
          shouldShowError={isSubmitted && !isStateInputValid}
          label="State"
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
