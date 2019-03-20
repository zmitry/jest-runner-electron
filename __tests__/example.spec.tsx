import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import Stepper from "../testComponent";
import { debug } from "util";

const setup = () => {
  const utils = render(React.createElement(Stepper));
  const next = utils.getByTestId("Next");
  return {
    next,
    ...utils
  };
};

declare const jestUtils: any;
afterEach(cleanup);
// const debug = window.jestUtils.debug;
test("Stepper should have 3 stepps", async () => {
  // set debug after each step
  const { next, getByText } = setup();
  // you can go to the next step by pressing ctrl+enter
  // here is our debug point

  fireEvent.click(next);
  fireEvent.click(next);
  // next stop

  fireEvent.click(next);
  expect(getByText("Reset").textContent).toContain("Reset");
  await jestUtils.debug();
});

test("hello", async () => {
  render(React.createElement("h1", null, "hello"));
});
