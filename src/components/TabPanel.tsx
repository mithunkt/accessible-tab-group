import React from "react";

interface ITabPanel {
  controlName: string;
  children: JSX.Element | JSX.Element[];
  hidden?: boolean;
}

const TabPanel = ({ controlName, hidden, children }: ITabPanel) => (
  <div
    id={`${controlName}-tab`}
    tabIndex={0}
    role="tabpanel"
    aria-labelledby={controlName}
    hidden={hidden}
  >
    {children}
  </div>
);

export default TabPanel;
