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

afterEach(cleanup);
test("Stepper should have 3 stepps", async () => {
  const { next, getByText } = setup();

  fireEvent.click(next);
  fireEvent.click(next);
  fireEvent.click(next);
  debugger;
  expect(getByText("Reset").textContent).toContain("Reset");
});
