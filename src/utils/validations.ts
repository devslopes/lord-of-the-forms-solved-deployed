import { stateAcronyms } from "./state-acronyms";

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export const isStateValid = (state: string) => {
  return stateAcronyms.includes(state.toUpperCase());
};

export function isNameValid(inputValue: string) {
  return (
    inputValue
      .split("")
      .every((char) => char.toLowerCase() !== char.toUpperCase()) &&
    inputValue.length >= 2
  );
}
