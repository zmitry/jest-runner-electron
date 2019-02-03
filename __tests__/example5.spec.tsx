import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import Stepper from "../testComponent";

const setup = () => {
  const utils = render(<Stepper />);
  const next = utils.getByTestId("Next");
  return {
    next,
    ...utils
  };
};

afterEach(cleanup as any);
declare const window: any;
// const debug = window.jestUtils.debug;
test("Stepper45 shofuld have 3 stepps", async () => {
  // set debug after each step
  const { next, getByText } = setup();
  // you can go to the next step by pressing ctrl+enter
  fireEvent.click(next);
  fireEvent.click(next);
  fireEvent.click(next);
  expect(getByText("Reset").textContent).toContain("Reset");
});

test("hell4so", async () => {
  render(<h1>hello</h1>);
});
