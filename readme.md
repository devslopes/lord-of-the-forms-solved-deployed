# User Information Form

In this assignment you will be buildling a form with a BEAUTIFUL UI. It's often extremely important that we build forms that have all the fancy bells and whistles that you see on nice websites. For example a good UI may address the following concerns.

- How do we make it as easy as possible to fill out the correct data?
- How do we make things pretty?
- How do we render errors to the user?

We are going to build out a form that's purpose is to gather and set the `userInformation` of the parent component.

## Learning Objectives

In order to complete this assignment, a student should be able to...

- create an advanced controlled form
- use onChange events to track the state of an input
- use onSubmit events to trigger the submit of a form
- use `e.preventDefault` to stop the default event of an `onSubmit`
- be able to prevent typing certain characters by controlling the onChange event
- use a ref in react in order to switch focus between elements on change (Telephone Input)
- render client-side validation errors in react underneath the inputs
- cleanly abstract validations
- create a useful user-friendly UI for form submission
- use onSubmit to cleanly trigger a change in state of a parent component

## Setup

To get this project setup, you should:

- Run `npm i` to install all dependencies
- Run `npm run dev` to run the project

## In order to pass this assignment you should

### Standard Requirements

- [ ] Setup eslint
- [ ] Pass all linting checks

- To check if linting passes, run `npm run lint`

- [ ] Format code with prettier
- [ ] State should not be duplicated
- [ ] Variables should be named logicially
- [ ] No unneccessary console logs
- [ ] No commented out blocks of code (Code comments are fine)
- [ ] Setup a github repository with your submission as the `main` branch, you will submit a link to this for grading (NOT A ZIP FILE)

### Typescript Specific Requirements

- [ ] pass **ALL** typechecks
  - Check by running `npm run typecheck`
- [ ] DON'T USE `any`.... OR ELSE
- [ ] Keep your types clean and in a logical location
- [ ] Prop Types for components should be colocated with their components
- [ ] Shared types should live in a file that says `types` somewhere in it's name
  - [ ] example: `types.ts` should work fine
- [ ] Unshared types should live in the component they are used in

### Assignment Specific Requirements

- [ ] Get your code to function EXACTLY like [This Site](https://react-form-example-1.web.app/)
- [ ] Whether or not an input is valid should change as the input value changes
- [ ] Under input errors should not show UNLESS the user has already tried submitting once
- [ ] If a user tries to submit a form with bad inputs, an alert message will say "Bad Inputs" then the exact errors will pop up under the incorrect inputs
- [ ] When a user successfully submits the form, it should update the userInformation and show the user information in the ProfileInformation Component
- [ ] Create a `FunctionalTextInput` component to clean up code
- [ ] Create a `FunctionalPhoneInput` component to clean up code
- [ ] Create a `ClassTextInput` component to clean up code
- [ ] Create a `ClassPhoneInput` component to clean up code
- [ ] Page must NOT reload after submitting
- [ ] ClassApp Code and FunctionalApp Code should be treated as seperate apps as far as state goes
