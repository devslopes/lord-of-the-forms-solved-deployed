import { ChangeEventHandler, Component, createRef } from "react";
import { isAllNumbers } from "./validations";
import { ErrorMessage } from "./ErrorMessage";

export class ClassForm extends Component {
  state = {
    phoneNumberInputs: ["", "", ""],
  };

  phoneNumberInput0Ref = createRef<HTMLInputElement>();
  phoneNumberInput1Ref = createRef<HTMLInputElement>();
  phoneNumberInput2Ref = createRef<HTMLInputElement>();

  render() {
    const maxLengths = [3, 3, 4];

    const phoneNumberRefs = [
      this.phoneNumberInput0Ref,
      this.phoneNumberInput1Ref,
      this.phoneNumberInput2Ref,
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
        const shouldGotoPrevFocus =
          phoneNumberIndex > 0 && newValue.length === 0;

        if (!isAllNumbers(newValue)) return;

        if (newValue.length > maxLength) {
          return;
        }

        this.setState({
          phoneNumberInputs: this.state.phoneNumberInputs.map((n, index) =>
            phoneNumberIndex === index ? newValue : n
          ),
        });

        if (shouldGotoNextFocus) {
          nextRef.current?.focus();
        }
        if (shouldGotoPrevFocus) {
          prevRef.current?.focus();
        }
      };

    return (
      <>
        <h2>Class</h2>
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
          <ErrorMessage message="email is not a valid email" show={true} />

          <div className="input-wrap">
            <label htmlFor="state">State:</label>
            <input type="text" name="" id="" placeholder="CO | TX | Etc..." />
          </div>
          <ErrorMessage message="state is not a valid state" show={true} />
          <div className="input-wrap">
            <label htmlFor="phone">Phone:</label>
            <div id="phone-input-wrap">
              <input
                type="text"
                id="phone-input-1"
                ref={this.phoneNumberInput0Ref}
                onChange={handlePhoneNumberInput(0)}
                value={this.state.phoneNumberInputs[0]}
              />
              -
              <input
                type="text"
                id="phone-input-2"
                ref={this.phoneNumberInput1Ref}
                onChange={handlePhoneNumberInput(1)}
                value={this.state.phoneNumberInputs[1]}
              />
              -
              <input
                type="text"
                id="phone-input-3"
                ref={this.phoneNumberInput2Ref}
                onChange={handlePhoneNumberInput(2)}
                value={this.state.phoneNumberInputs[2]}
              />
            </div>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}
