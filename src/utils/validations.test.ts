import { describe, expect, it } from "vitest";
import { isEmailValid, isNameValid } from "./validations";

describe("is email valid", () => {
  it("should be true if a valid email", () => {
    expect(isEmailValid("jon@jon.com")).toBe(true);
  });
});

describe("is first name valid", () => {
  it("first name should be at least 2 characters long", () => {
    expect(isNameValid("Bil")).toBe(true);
  });
  it("should contain only letters", () => {
    expect(isNameValid("b1l")).toBe(false);
  });
});
