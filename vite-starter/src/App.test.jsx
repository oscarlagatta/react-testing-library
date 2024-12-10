import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { describe, expect } from "vitest";
import { kebabCaseToTitleCase } from "./helpers";
// import { logRoles } from "@testing-library/dom";

// test("button starts witht he correct color", () => {
//   render(<App />);
//   // const { container } = render(<App />);
//   // logRoles(container);
//   const buttonElement = screen.getByRole('button', {name: /blue/i});
//   expect(buttonElement).toHaveClass("red");
// });

test("button click flow", () => {
  render(<App />);
  // find the button
  const buttonElement = screen.getByRole('button', { name: /blue/i })

  // check initial color
  expect(buttonElement).toHaveClass('medium-violet-red');

  // click the button
  fireEvent.click(buttonElement);

  // check button text
  expect(buttonElement).toHaveTextContent(/red/i);

  //  check button color
  expect(buttonElement).toHaveClass('midnight-blue');
  // it's always more straight forward to test classes that test styles.

  // if you rather want to catch any problems or inconsistencies with visual style then 
  // we need to do visual regression testing.
  // expect(buttonElement).toHaveStyle({ "background-color": "rgb(0,0,255)" });
});

test("Checkbox flow", () => {
  render(<App />);
  // find the button
  const buttonElement = screen.getByRole('button', { name: /blue/i });
  // find the checkbox
  const checkboxElement = screen.getByRole('checkbox', { name: /disable button/i });

  // check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  // click the checkbox to disable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass('gray');

  // click the checkbox to enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass('medium-violet-red');

});

test("checkbox flow after button click", () => {
  render(<App />);
  // find the button
  const buttonElement = screen.getByRole('button', { name: /blue/i });
  // find the checkbox
  const checkboxElement = screen.getByRole('checkbox', { name: /disable button/i });

  // click button to change to blue
  fireEvent.click(buttonElement);

  // click checkbox to disable button
  // expect(buttonElement).toHaveClass('blue');
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass('gray');

  // click checkbox again to re-enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass('midnight-blue');

});

test("button starts witht he correct label and color after click", () => {

});

test("button starts witht he correct color after click", () => {

});

test("button starts with correct text after click", () => {

});


// test("Test thrwos error explicitly", () => {  
//   render(<App />);
//   const headingElement = screen.getByRole("heading", {name: /learn react/i});
//   expect(headingElement).toBeInTheDocument(); //Vitest
// });

// assertions 
// expect(linkElement).toBeInTheDocument(); 
// expect is global 
// the argument is what the assertion is asserting against.
// we use a matcher toBeInTheDocument comes from jest DOM. and there are sometimes arguments.

// examples
// expect(element.textContent).toBe('hello');
// expect(elementsArray).toHaveLength(7);

// Jest-DOM
// Imported before each test (by test setup), makes matchers available.
// DOM-based matchers we can use
//  examples. toBeVisible() or toBeChecked() // jest dom matchers
// more to come.

// how jest and vitest works
// React testing lbirary creates a simulated dom we can use for interactions and assertions
// but we cannot use it without a test runner, find, run, makes assertions
// we chose vitest because
// faster than jest 3x-5x faster
// just isn't easy to get working with Vite.
// Jest is much easier with, say NEXTJS

// .. how does jest vitest work
// global test method has two arguments
//  string description
// function to run
// test fails if error is thrwon when running function
// assertions throw erroes when expectation fails
// NO error the test pass
// emtpy test passes  

// TDD makes the different of how it feels to write tests
// part of the coding process, not a chore to do at the end
// more efficient
// re- run test for free after changes, free regression testing.

// react testing library philosophy, 
// what does react testing library do
// wehy we use it
// creates a viertual dom for testing
// prvides utility to interact with the dom, eg. find elements on the dom, or interact like clicking
// allowing testing without a browser.

// Types of tests
// unit tests
// test one unit of code (function or react component) in isolation, not interactions with other code
// Integtration test,
// how multiple units work together, between components, or micros services
// functional tests
// test a particular function of software. (behavior and not a particular code function)
// eg. entering data in form and submit, wnd the sofware does something with the dat
// testing to see ikf enter invalid data an entry becomes red, but still functional test, that we are no
// testing the code we test the behavior. 

// RTL encourages testing how the user use the application.
// encourages functional tests,

// Acceptance/e2e tests
// rerquire browser and the server where the app is connectod tool, Cypress / Playwright tools

// Functional Testing
// Diff mindset

// unit testing
// test isolated as possible, we mock the dependencies, and other dependencies function that the components
// relies on we use mocked versions. Makes isolated the test, we test internal so sometimes we can test the state
// of the component, because we don't have th other componnents to see what i does to the app

// very easy to pinpoint failures
// further from how user interacts with the application
// more likely to break with refactoring

// Functional testing is a diff mindset
// all relevant units for a particular behavior or user flow
// benefit is close how users inteact with the applicaiton
// tests are robust, if refactor as long as the behavior stays the same the test still pass

// Downside is that is more difficult to debug failing tests, because is not obvious what part 
// of the code is failing the test


// BDD: testign library encourages behaviour over implementation, 
// shouldn'we call this bdd instad of TDD
//  ACTUALLY NO
// bdd IS DEFINED
//  incvolves colaboration between lots of roles
// developers , qa, business partners 
// dfines process for different groups to interact

// we are doing TDD

describe("kebabCaseToTitleCase", () => {
  test("works for no hyphens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red");
  });
  test("works for one hyphens", () => {
    expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("works for multiple hyphens", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
});