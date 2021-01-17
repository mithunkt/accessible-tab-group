import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Tabs from "./Tabs";
import Tab from "./Tab";

describe("Tabs", () => {
  test("Renders tab component", () => {
    const { container } = render(
      <Tabs name="testname">
        <Tab label="testlabel">
          <div>Test tab content</div>
        </Tab>
      </Tabs>
    );
    const tabContainer = container.querySelector(".tab-container");
    expect(tabContainer).toBeDefined();
  });

  test("Renders tab component with correct roles", () => {
    const { container } = render(
      <Tabs name="testname">
        <Tab label="testlabel">
          <div>Test tab content</div>
        </Tab>
      </Tabs>
    );
    const tablist = container.querySelector('.tab-container [role="tablist"]');
    const tab = container.querySelector('.tab-container [role="tab"]');
    const tabpanel = container.querySelector(
      '.tab-container [role="tabpanel"]'
    );
    expect(tablist).toBeDefined();
    expect(tab).toBeDefined();
    expect(tabpanel).toBeDefined();
  });

  test("Renders tab content inside tab panel", () => {
    const { container } = render(
      <Tabs name="testname">
        <Tab label="testlabel">
          <div>Content</div>
        </Tab>
      </Tabs>
    );

    const tabpanel = container.querySelector(
      '.tab-container [role="tabpanel"]'
    );
    expect(tabpanel?.textContent).toEqual("Content");
  });

  test("Should focus the tab item and show respective content on tab click", () => {
    const { container } = render(
      <Tabs name="testname">
        <Tab label="testlabel1">
          <div>Content1</div>
        </Tab>
        <Tab label="testlabel2">
          <div>Content2</div>
        </Tab>
      </Tabs>
    );
    const tabs = container.querySelectorAll("[role=tab]");
    const tabContents = container.querySelectorAll("[role=tabpanel]");

    act(() => {
      tabs[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(tabContents[1].getAttribute("hidden")).toEqual(null);
  });
});

describe("Tabs - Accessiblity - Keyboard", () => {
  const componentMarkup = (
    <Tabs name="testname">
      <Tab label="testlabel1">
        <div>Content1</div>
      </Tab>
      <Tab label="testlabel2">
        <div>Content2</div>
      </Tab>
    </Tabs>
  );
  test("Should focus to previous tab on Left Arrow key", () => {
    const { container } = render(componentMarkup);
    const tabs = container.querySelectorAll("[role=tab]");

    act(() => {
      tabs[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      fireEvent.keyDown(tabs[1], {
        key: "ArrowLeft",
        code: "ArrowLeft",
      });
    });

    expect(tabs[0].getAttribute("aria-selected")).toEqual("true");
    expect(tabs[1].getAttribute("aria-selected")).toEqual("false");
  });

  test("Should focus to previous tab on Righ Arrow key", () => {
    const { container } = render(componentMarkup);
    const tabs = container.querySelectorAll("[role=tab]");

    act(() => {
      tabs[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      fireEvent.keyDown(tabs[0], {
        key: "ArrowRight",
        code: "ArrowRight",
      });
    });

    expect(tabs[1].getAttribute("aria-selected")).toEqual("true");
    expect(tabs[0].getAttribute("aria-selected")).toEqual("false");
  });

  test("Should focus to first tab on Home key", () => {
    const { container } = render(componentMarkup);
    const tabs = container.querySelectorAll("[role=tab]");

    act(() => {
      tabs[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      fireEvent.keyDown(tabs[1], {
        key: "Home",
        code: "Home",
      });
    });

    expect(tabs[0].getAttribute("aria-selected")).toEqual("true");
    expect(tabs[1].getAttribute("aria-selected")).toEqual("false");
  });

  test("Should focus to last tab on End key", () => {
    const { container } = render(componentMarkup);
    const tabs = container.querySelectorAll("[role=tab]");

    act(() => {
      tabs[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      fireEvent.keyDown(tabs[0], {
        key: "End",
        code: "End",
      });
    });

    expect(tabs[1].getAttribute("aria-selected")).toEqual("true");
    expect(tabs[0].getAttribute("aria-selected")).toEqual("false");
  });

  test("Should focus tab content on Tab key press if tab is on focussed state", () => {
    const { container } = render(componentMarkup);
    const tabs = container.querySelectorAll("[role=tab]");
    const tabPanels = container.querySelectorAll("[role=tabpanel]");

    act(() => {
      userEvent.click(tabs[0])
      userEvent.tab();
    });

    expect(tabPanels[0]).toHaveFocus();
  });
});
