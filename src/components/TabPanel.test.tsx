import React from "react";
import { render } from "@testing-library/react";

import TabPanel from "./TabPanel";

test("Renders TabPanel component", () => {
  const { container } = render(
    <TabPanel controlName="testtab">
      <div>Test tab content</div>
    </TabPanel>
  );
  const tabPanelElement = container.querySelector("[role=tabpanel]");

  expect(tabPanelElement).toBeDefined();
  expect(tabPanelElement).toHaveAttribute("aria-labelledby");
  expect(tabPanelElement?.getAttribute("aria-labelledby")).toEqual("testtab");
});
