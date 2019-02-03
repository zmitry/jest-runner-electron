import React from "react";
import App from "./App";
import { render } from "react-testing-library";

declare const window: any;
test("basic", async () => {
  const ref = render(<App />);
  await window.jestUtils.debug();
  expect(ref.container).toContain("HelloWorld");
  await window.jestUtils.debug();
});
