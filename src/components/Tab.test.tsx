import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Tab from "./Tab";

test("Renders tab component", () => {
  const { container } = render(
    <Tab label="testlabel">
      <div>Test tab content</div>
    </Tab>
  );
  const tabWrapper = container.querySelector("[role=presentation]");
  const tabElement = container.querySelector("[role=tab]");

  expect(tabWrapper).toBeDefined();
  expect(tabElement).toBeDefined();
});
